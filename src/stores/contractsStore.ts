import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/abi";
import { campaign, ProcessedCampaign } from "@/types";
import axios from "axios";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { Address } from "viem";
import { create } from "zustand";

type contractStore = {
  contract: ethers.Contract | null;
  isLoading: boolean;
  isConnected: boolean;
  correctChain : boolean;
  numberOfCampaigns: number;
  account: Address | null;
  isfetching: boolean;
  allCampaigns: ProcessedCampaign[] | null;
  sortedCampaigns: { [key: string]: ProcessedCampaign[] };
  setIsLoading: (isLoading: boolean) => void;
  setIsConnected: (isConnected: boolean) => void;
  setAccount: (account: Address) => void;
  setContract: (contract: ethers.Contract) => void;
  connectWallet: () => Promise<void>;
  addTestNet:()=>Promise<void>;
  createCampaign: (
    owner: string,
    title: string,
    metadata: string,
    target: string,
    deadline: string
  ) => Promise<void>;
  donate: (campaignId: number, amount: string) => Promise<void>;
  getCampaign: (id: string | number) => Promise<ProcessedCampaign>;
  getAllCampaigns: () => Promise<void>;
  sortCampaigns: (allCampaigns: ProcessedCampaign[]) => void;
};

export const useContractStore = create<contractStore>((set, get) => ({
  contract: null,
  isLoading: false,
  numberOfCampaigns:0,
  isConnected: false,
  correctChain:false,
  account: null,
  allCampaigns: null,
  isfetching: true,
  sortedCampaigns: {},
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading: isLoading });
  },
  setContract: (contract: ethers.Contract) => {
    console.log("Setting contract:", contract);
    set({ contract: contract });
  },
  setIsConnected: (isConnected: boolean) => {
    set({ isConnected: isConnected });
  },
  setAccount: (account: Address) => {
    set({ account: account });
  },
  connectWallet: async () => {
    const {setIsLoading}=get()
    try {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethereum = (window as any).ethereum;
      if (typeof ethereum !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        // Check if we're on the right network
        const network = await provider.getNetwork();
        console.log(
          "Connected to network:",
          network.name,
          "Chain ID:",
          parseInt(String(network.chainId)),"Expected Chain ID:",Number(process.env.NEXT_PUBLIC_CHAINID)
        );
        set({correctChain:parseInt(String(network.chainId))==Number(process.env.NEXT_PUBLIC_CHAINID)});
        const contractInstance: ethers.Contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        
        // Test contract connection
        try {
        if(!(parseInt(String(network.chainId))==Number(process.env.NEXT_PUBLIC_CHAINID))){
          toast.error(
            "Please switch to Holešky network."
          );
          return;
        }
          const code = await provider.getCode(CONTRACT_ADDRESS);
          if (code === "0x") {
            throw new Error("No contract deployed at this address");
          }
          console.log("Contract found at address:", CONTRACT_ADDRESS);
          console.log("Contract code length:", code.length);
        } catch (err) {
          console.error("Contract verification failed:", err);
          toast.error(
            "Contract not found at the specified address. Please check your network details."
          );
          return;
        }

        get().setContract(contractInstance);
        // Test basic contract call
        try {
          console.log("Testing numberOfCampaigns call...");
          const numCampaigns = await contractInstance.numberOfCampaigns();
          console.log("Number of campaigns:", numCampaigns.toString());
          set({numberOfCampaigns:numCampaigns.toString()});
        } catch (testError) {
          console.error("Failed to call numberOfCampaigns:", testError);
        }

        get().setAccount(accounts[0]);
        get().setIsConnected(true);

        console.log("Connected:", accounts[0]);
      } else {
        toast.error("Install MetaMask!🦊");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  },
  addTestNet: async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethereum = (window as any).ethereum;
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: process.env.NEXT_PUBLIC_CHAINID,
          chainName: "LocalHost Hardhat",
          rpcUrls: [`${process.env.NEXT_PUBLIC_RPC}`],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: [""],
        },
      ],
    });
  } catch (error) {
    console.error("Error adding Polygon Amoy:", error);
  }
  },
  createCampaign: async (
    owner: string,
    title: string,
    metadata: string,
    target: string,
    deadline: string
  ) => {
    const { contract, setIsLoading } = get();
    try {
      setIsLoading(true);

      if (!contract) {
        throw new Error("Contract not connected");
      }

      const targetAmount = ethers.parseEther(String(target));
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

      console.log("Creating campaign with params:", {
        owner,
        title,
        metadata,
        targetAmount: targetAmount.toString(),
        deadlineTimestamp,
      });

      // Validate deadline is in the future
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (deadlineTimestamp <= currentTimestamp) {
        throw new Error("Deadline must be in the future");
      }

      const tx = await contract.createCampaign(
        owner,
        title,
        metadata,
        targetAmount,
        deadlineTimestamp
      );

      console.log("Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction mined:", receipt);

      return receipt;
    } catch (err) {
      console.error("Create campaign error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  },
  donate: async (id: number, amount: string) => {
    const { contract, setIsLoading } = get();
    try {
      setIsLoading(true);

      if (!contract) {
        throw new Error("Contract not connected");
      }

      const donationAmount = ethers.parseEther(String(amount));
      console.log(
        "Donating to campaign:",
        id,
        "amount:",
        donationAmount.toString()
      );

      const tx = await contract.donate(id, {
        value: donationAmount,
      });

      console.log("Donation transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Donation transaction mined:", receipt);

      return receipt;
    } catch (err) {
      console.error("Donation error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  },
  getCampaign: async (id: string | number) => {
    const { contract } = get();
    try {
      set({ isfetching: true });

      if (!contract) {
        throw new Error("Contract not connected");
      }

      console.log("Getting campaign:", id);
      const campaignId = Number(id);

      // First check if campaign exists
      const exists = await contract.campaignExists(campaignId);
      if (!exists) {
        throw new Error(`Campaign ${campaignId} does not exist`);
      }

      const campaign: campaign = await contract.getCampaign(campaignId);
      console.log("Campaign data received");
      const deadline = campaign.deadline.toString();
      const metadata = campaign.metadata;
      const target = campaign.target.toString(); // Convert BigInt to string
      const amountCollected = campaign.amountCollected.toString();
      const res = await axios.get(metadata);
      const imageUrl = res.data.imageUrl;
      const tag = res.data.tag;
      const description = res.data.description;
      return {
        id: campaign.id,
        owner: campaign.owner,
        title: campaign.title,
        target: ethers.formatEther(target),
        deadlineDate: new Date(Number(deadline) * 1000),
        amountCollected: ethers.formatEther(amountCollected),
        description: description,
        tag: tag,
        imageUrl: imageUrl,
        metadata: metadata,
        donators: campaign.donators,
      };
    } catch (error) {
      console.error("Get campaign error:", error);
      throw error;
    } finally {
      set({ isfetching: false });
    }
  },
  getAllCampaigns: async () => {
    console.log("Called getAllCampaigns");
    const { contract, isConnected } = get();
    console.log(isConnected);

    try {
      if(isConnected === false){return};
      set({ isfetching: true });

      if (!contract) {
        throw new Error("Contract not connected");
      }

      console.log("Contract instance:", contract);

      // First get the number of campaigns
      const numCampaigns = await contract.numberOfCampaigns();
      console.log("Number of campaigns:", numCampaigns.toString());

      if (numCampaigns.toString() === "0") {
        console.log("No campaigns found");
        return;
      }

      const allCampaigns = await contract.getAllCampaigns();
      console.log("All campaigns raw data received",allCampaigns);

      // Process the campaigns data and convert BigInt to string
      let processedCampaigns = allCampaigns.map(
        async (campaign: campaign,) => {
          const deadline = campaign.deadline.toString();
          const metadata = campaign.metadata;
          const target = campaign.target.toString(); // Convert BigInt to string
          const amountCollected = campaign.amountCollected.toString();
          const res = await axios.get(metadata);
          const imageUrl = res.data.imageUrl;
          const tag = res.data.tag;
          const description = res.data.description;
          return {
            id: Number(campaign.id.toString()),
            owner: campaign.owner,
            title: campaign.title,
            imageUrl: imageUrl,
            metadata: metadata,
            tag: tag,
            description: description,
            target: ethers.formatEther(target),
            amountCollected: ethers.formatEther(amountCollected),
            deadlineDate: new Date(Number(deadline) * 1000),
            donators: campaign.donators,
          };
        }
      );

      processedCampaigns = await Promise.all(processedCampaigns);
      set({ allCampaigns: processedCampaigns });
      get().sortCampaigns(processedCampaigns);
      console.log("Processed campaigns successfully", processedCampaigns);
    } catch (err) {
      console.error("Get all campaigns error:", err);
      throw err;
    } finally {
      set({ isfetching: false });
    }
  },
  sortCampaigns: (allCampaigns) => {
    const sorted = allCampaigns.reduce(
      (
        acc: Record<string, ProcessedCampaign[]>,
        campaign: ProcessedCampaign
      ) => {
        const tag = campaign.tag;
        if (!acc[tag]) {
          acc[tag] = [];
        }
        acc[tag].push(campaign);
        return acc;
      },
      {}
    );
    set({ sortedCampaigns: sorted });
    // console.log("Sorted campaigns successfully", sorted);
  },
}));
