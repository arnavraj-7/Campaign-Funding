import dotenv from "dotenv"
export const runtime = "nodejs";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable"; 
import axios from "axios";
import FormData from "form-data";
import path from "path";
import fs  from "fs";
dotenv.config();
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET =process.env.PINATA_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};
const uploadDir = path.join(process.cwd(), "/public/uploads");
fs.mkdirSync(uploadDir, { recursive: true });
export const uploadImageToPinata = async (
  file: formidable.File,
  metadata: { name: string; description: string; tag: string }
) => {
  console.log(PINATA_API_KEY, PINATA_SECRET);
  console.log("file", file);
  const stream = fs.createReadStream(file.filepath);
  console.log("stream", stream);
  const formData = new FormData();

  formData.append("file", stream,file.originalFilename || "no-name");

  formData.append(
    "pinataMetadata",
    JSON.stringify({
      name: metadata.name,
      keyvalues: {
        description: metadata.description,
      },
    })
  );

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders?.(), // for Node, may not exist on browser FormData
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET,
      },
    }
  );

  const cid = res.data.IpfsHash;
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
};

export const uploadJSONToPinata = async (metadata: object) => {
  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    metadata,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET,
      },
    }
  );
  const cid = res.data.IpfsHash;
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
};


export default async function POST(req: NextApiRequest, res: NextApiResponse){
        const form = formidable({
            multiples:false,//multiple files
            keepExtensions: true,//extension
        })


const parseForm = async () =>
  await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.parse(req as any, (err:any, fields:any, files:any) => {
    //   console.log("RAW REQUEST:",req);
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

try {
  const { fields, files } = await parseForm();
  const image = Array.isArray(files.file) ? files.file[0] : files.file;

 
  let data = await JSON.parse(Array.isArray(fields.data)?fields.data[0]:fields.data || "data:no data");
  if(data.data === "no data") throw new Error("No data found in form");
//   console.log("data from form from frontend:",data);
        if(!image) throw new Error("No image file uploaded");
      const imageurl = await uploadImageToPinata(image, data);
    //   console.log("imageurl from pinata",imageurl);
            data = { ...data, imageUrl: imageurl };
            console.log("data:",data);
            const metadata = await uploadJSONToPinata(data);
        // console.log("metadata from pinata",metadata);
       res.status(200).json(({
           success: true,data:metadata
         })
       );
  }
 catch (err) {
  console.error("Upload error:", err);
    res.status(500).json(JSON.stringify({ success: false }));
}

}