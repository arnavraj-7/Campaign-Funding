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
      return ;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const donate = async(amount)=>{
    try{
      setIsLoading(true);
      if(contract){
        const tx = await contract.donate(ethers.parseEther(String(amount)));
        await tx.wait();

      }else{
        throw new Error("Contract not connected");
      }
    }catch(err){
      console.log(err.message);

    }finally{
      setIsLoading(false);
    }
  }

  const getCampaign = async (id) => {
    try {
      setIsLoading(true);
      const campaign = await contract.campaigns(id);
      return campaign;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const getAllCampaigns = async ()=>{
    try{
      setIsLoading(true);
      const allCampaigns = await contract.getAllCampaigns();
      return allCampaigns;
    }catch(err){
      console.error("Error:", err);
      throw err;
    }finally{
      setIsLoading(false);
    }
  }
  return {
    account,
    contract,
    isConnected,
    isLoading,
    connectWallet,
    createCampaign,
    donate,
    getCampaign,
    getAllCampaigns
  };
};