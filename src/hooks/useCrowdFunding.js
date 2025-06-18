"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";

export const useContract = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);

      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        // Check if we're on the right network
        const network = await provider.getNetwork();
        console.log("Connected to network:", network.name, "Chain ID:", network.chainId);

        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        // Test contract connection
        try {
          const code = await provider.getCode(CONTRACT_ADDRESS);
          if (code === "0x") {
            throw new Error("No contract deployed at this address");
          }
          console.log("Contract found at address:", CONTRACT_ADDRESS);
        } catch (err) {
          console.error("Contract verification failed:", err);
          alert("Contract not found at the specified address. Please check your CONTRACT_ADDRESS.");
          return;
        }

        setContract(contractInstance);
        setAccount(accounts[0]);
        setIsConnected(true);

        console.log("Connected:", accounts[0]);
      } else {
        alert("Install MetaMask!");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to connect wallet: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createCampaign = async (title, target, deadline) => {
    try {
      setIsLoading(true);
      const targetInWei = ethers.parseEther(target.toString());
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

      const tx = await contract.createCampaign(
        account,
        title,
        targetInWei,
        deadlineTimestamp
      );

      await tx.wait();
      console.log("Campaign created!");
      return tx;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const donateToCampaign = async (campaignId, amount) => {
    try {
      setIsLoading(true);
      const amountInWei = ethers.parseEther(amount.toString());

      const tx = await contract.donate(campaignId, {
        value: amountInWei,
      });

      await tx.wait();
      console.log("Donation successful!");
      return tx;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCampaignCount = async () => {
    try {
      if (!contract) {
        throw new Error("Contract not initialized");
      }
      
      const count = await contract.numberOfCampaigns();
      console.log("Campaign count:", count.toString());
      return Number(count);
    } catch (error) {
      console.error("Error fetching numberOfCampaigns:", error);
      throw error;
    }
  };

  const getCampaign = async (campaignId) => {
    try {
      if (!contract) {
        throw new Error("Contract not initialized");
      }

      // First check if campaign exists by getting count
      const totalCampaigns = await getCampaignCount();
      if (campaignId >= totalCampaigns) {
        throw new Error(`Campaign ${campaignId} does not exist. Total campaigns: ${totalCampaigns}`);
      }

      const campaignData = await contract.getCampaign(campaignId);
      
      return {
        owner: campaignData[0],
        title: campaignData[1],
        target: ethers.formatEther(campaignData[2]),
        deadline: new Date(Number(campaignData[3]) * 1000).toLocaleString(),
        amountCollected: ethers.formatEther(campaignData[4]),
        campaignId: campaignId
      };
    } catch (error) {
      console.error("Error fetching campaign:", error);
      throw error;
    }
  };

  const getAllCampaigns = async () => {
    try {
      if (!contract) {
        throw new Error("Contract not initialized");
      }

      const totalCampaigns = await getCampaignCount();
      const campaigns = [];

      for (let i = 0; i < totalCampaigns; i++) {
        try {
          const campaign = await getCampaign(i);
          campaigns.push(campaign);
        } catch (error) {
          console.error(`Error fetching campaign ${i}:`, error);
        }
      }

      return campaigns;
    } catch (error) {
      console.error("Error fetching all campaigns:", error);
      throw error;
    }
  };

  return {
    account,
    contract,
    isConnected,
    isLoading,
    connectWallet,
    createCampaign,
    donateToCampaign,
    getCampaign,
    getCampaignCount,
    getAllCampaigns,
  };
};