// utils/nftUploader.ts
import { NFTStorage, File } from 'nft.storage'

const client = new NFTStorage({ token: "b0e68c06.cd8cdeea138347cab86ca56f0f6529c7"});

export async function uploadToIPFS(imageFile: File, name: string, description: string) {
  const metadata = await client.store({
    name,
    description,
    image: new File([imageFile], imageFile.name, { type: imageFile.type }),
  });
  console.log(metadata);

  return {
    metadataUrl: metadata.url, // ipfs://baf... (metadata JSON)
    gatewayUrl: `https://ipfs.io/ipfs/${metadata.ipnft}`, // public access
  };
}
