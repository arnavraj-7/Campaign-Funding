# 🚀 Web3 DApp: Next.js + Ethers.js + Solidity Smart Contracts

## 📘 Overview

This project shows how to build a Web3 dApp using React, Ethers.js, and Solidity (via Hardhat). It allows users to:
- Connect MetaMask wallet
- Read and write data to smart contracts
- Listen to Solidity `emit` events

---

## ✅ Prerequisites

- Node.js ≥ 14  
- MetaMask browser extension  
- Basic knowledge of React & Solidity

---

## 🛠️ Installation

```bash
git clone <your-repo-url>
cd your-repo
npm install
# or
yarn install
```

---

## 🔌 Connect Wallet & Contract

```js
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xYourContractAddress";
const CONTRACT_ABI = [...]; // Your ABI

const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Install MetaMask!");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

  return { account: accounts[0], contract };
};
```

---

## 🔍 Read from Contract (View Functions)

```js
const count = await contract.numberOfCampaigns();
console.log("Total campaigns:", count.toString());
```

- No gas used  
- Reads state from the blockchain

---

## ✍️ Write to Contract (Transactions)

```js
const tx = await contract.createCampaign("Save Trees", ethers.parseEther("1.0"));
await tx.wait(); // Waits for confirmation
console.log("Campaign created!");
```

- Uses gas  
- Must wait for transaction to confirm

---

## 📢 Emit & Listen to Events

### Solidity

```solidity
event CampaignCreated(address indexed owner, uint256 campaignId, string title);

function createCampaign(...) public {
    ...
    emit CampaignCreated(msg.sender, id, title);
}
```

### React (Ethers.js)

```js
useEffect(() => {
  if (!contract) return;

  const handler = (owner, id, title) => {
    console.log("📢 New Campaign:", title, "by", owner);
  };

  contract.on("CampaignCreated", handler);
  return () => contract.off("CampaignCreated", handler); // cleanup
}, [contract]);
```

---

## 🧩 Hook Example: `useContract`

```js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/abi";

export const useContract = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    setContract(contractInstance);
    setAccount(accounts[0]);
  };

  const createCampaign = async (title, target, deadline) => {
    const targetInWei = ethers.parseEther(target.toString());
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
    const tx = await contract.createCampaign(account, title, targetInWei, deadlineTimestamp);
    await tx.wait();
  };

  return { connectWallet, createCampaign, contract, account };
};
```

---

## 💻 In a Component

```js
const { connectWallet, createCampaign } = useContract();

<button onClick={() => connectWallet()}>Connect Wallet</button>
<button onClick={() => createCampaign("Test", "0.5", "2025-07-01")}>
  Create Campaign
</button>
```

---

## 🛠️ Tips & Troubleshooting

- Make sure MetaMask is on the same network as your contract.
- Always use `ethers.parseEther()` and `ethers.formatEther()` for amounts.
- Use `.wait()` after `await contract.function()` to wait for confirmation.
- Remove event listeners in `useEffect` cleanup to avoid duplicates.

---

## 🧪 Resources

- [Ethers.js Docs](https://docs.ethers.org)
- [Solidity Docs](https://docs.soliditylang.org)
- [Hardhat Docs](https://hardhat.org)
- [Ethereum StackExchange](https://ethereum.stackexchange.com)

---

## 📎 License

MIT – Free to use and modify.

