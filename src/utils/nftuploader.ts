// utils/nftUploader.ts
import { NFTStorage, File } from 'nft.storage'

const client = new NFTStorage({ token: 'YOUR_API_KEY' });

export async function uploadToIPFS(imageFile: File, name: string, description: string) {
  const metadata = await client.store({
    name,
    description,
    image: new File([imageFile], imageFile.name, { type: imageFile.type }),
  });

  return {
    metadataUrl: metadata.url, // ipfs://baf... (metadata JSON)
    gatewayUrl: `https://ipfs.io/ipfs/${metadata.ipnft}`, // public access
  };
}
