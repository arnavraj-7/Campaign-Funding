import axios from "axios";
import FormData from "form-data";
const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET =process.env.NEXT_PUBLIC_PINATA_SECRET;

export const uploadImageToPinata = async (
  file: File,
  metadata: { name: string; description: string; tag: string }
) => {
  console.log(PINATA_API_KEY, PINATA_SECRET);
  const formData = new FormData();
  formData.append("file", file);

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
