# 🚀 Crowd-Spark - Decentralized Crowdfunding Platform

A modern Web3 crowdfunding dApp built with **Next.js**, **Ethers.js**, and **Solidity**, enabling users to create fundraising campaigns and contribute to causes they believe in — all powered by **blockchain technology**.

![Crowdfunding Animation](https://media.giphy.com/media/SsTcO55LJDBcMEucfp/giphy.gif)

---

## ⚠️ IMPORTANT NOTICE

🚨 **This is a TESTNET application. DO NOT send real ETH!** Use **testnet ETH** only. All transactions are on a test blockchain and hold **no real monetary value**.

---

## ✨ Features

- 🔗 **MetaMask Integration** — Seamless wallet connection & transaction management
- 📝 **Campaign Creation** — Create detailed fundraising campaigns with targets & deadlines
- 💰 **Secure Donations** — Contribute directly through smart contracts
- 📈 **Live Campaign Progress** — Real-time tracking of donations
- 🔐 **Blockchain Security** — All data & funds are protected by smart contracts
- 📱 **Responsive UI** — Fully optimized for desktop and mobile

---

## 🛠️ Tech Stack

### 🧑‍💻 Frontend
- ⚛️ **Next.js** – React-based framework
- 🧠 **Zustand** – Lightweight state management
- 🧪 **Ethers.js** – Ethereum interaction
- 🎨 **Tailwind CSS** – Styling and layout
- 🧾 **TypeScript/JavaScript** – Core logic

### 🔗 Blockchain & Backend
- 💻 **Solidity** – Smart contract language
- 🛠️ **Hardhat** – Smart contract development tool
- 📦 **Pinata + IPFS** – Decentralized file hosting
- 🧪 **Ethereum Testnet** – Blockchain deployment
- 🌐 **Ankr RPC Provider** – [Ankr RPC](https://www.ankr.com/rpc/projects/?projectId=5ae64678cd8723fa659a9b1e96628188e66d4c5c2eb28b97bde6e1befb42012d)

### 🚀 Deployment
- ▲ **Vercel** – Hosting platform
- 🦊 **MetaMask** – Wallet integration

---

## 🌐 Live Demo

🖥️ **Frontend**: [crowd-spark-ten.vercel.app](https://crowd-spark-ten.vercel.app)

![Demo Animation](https://media.giphy.com/media/KzJkzjggfGN5Py6nkT/giphy.gif)

---

## 🧭 How to Use Crowd-Spark

### 🚀 Recommended: Use Deployed Website

🔗 Visit: [crowd-spark-ten.vercel.app](https://crowd-spark-ten.vercel.app)

#### 🦊 MetaMask Setup
1. Install [MetaMask](https://metamask.io/) and create a wallet
2. Add a testnet (e.g., Sepolia) when prompted

#### 💵 Get Test ETH
Use any of the faucets below:
- 🌐 [Google Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/holesky)
- 🌐 [Sepolia Faucet](https://sepoliafaucet.com/)
- 🌐 [Alchemy Faucet](https://sepoliafaucet.io/)
- 🌐 [Chainlink Faucet](https://faucets.chain.link/)
- 🌐 [QuickNode Faucet](https://faucet.quicknode.com/)

#### 📣 Create a Campaign
1. Connect your wallet
2. Go to **Create Campaign**
3. Add title, description, image, tag, target & deadline
4. Confirm transaction in MetaMask

#### 💸 Donate to Campaigns
1. Browse live campaigns
2. Enter donation amount
3. Confirm in MetaMask

#### 🧾 Manage Campaigns
- Track your campaigns
- View donations
- (Coming Soon) Edit or update campaign

---

## 💻 Local Development Setup

### 📦 Prerequisites
- Node.js v16+
- MetaMask
- Git

### 📁 Setup Steps
```bash
git clone https://github.com/arnavraj-7/Crowd-Spark.git
cd Crowd-Spark
npm install
```

### 🔐 Configure Environment
Create a `.env.local` file:
```env
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET=your_pinata_secret_key
PRIVATE_KEY=your_wallet_private_key
NEXT_PUBLIC_RPC=your_testnet_rpc_url
NEXT_PUBLIC_CHAINID=your_testnet_chain_id
```

### 🚀 Run Locally
```bash
npm run dev
```

### 🔧 Build for Production
```bash
npm run build && npm start
```

---

## 🔧 Smart Contract Functions

### 📖 Read Functions
```js
await contract.numberOfCampaigns();
await contract.getCampaign(id);
await contract.getAllCampaigns();
```

### ✍️ Write Functions
```js
await contract.createCampaign(...);
await contract.donate(campaignId, { value });
```

---

## 🧱 Project Structure
```
Crowd-Spark/
├── pages/
│   ├── index.js
│   ├── create-campaign.js
│   └── campaign/[id].js
├── components/
│   ├── Header.js
│   ├── CampaignCard.js
│   └── DonationForm.js
├── utils/
│   ├── web3.js
│   └── pinata.js
├── contracts/
│   └── CrowdFunding.sol
├── public/
├── styles/
├── scripts/
│   └── deploy.js
└── README.md
```

---

## 🧠 Development Challenges

### 🌊 Faucet Limitations
- ✅ Solved by listing multiple faucet sources

### ⚔️ Web3 Compatibility in Next.js
- ✅ Resolved SSR issues by isolating Ethers.js usage

### 🔐 Contract Deployment
- ✅ Tested locally using Hardhat before deploying

### 🧵 MetaMask Handling
- ✅ Built solid wallet connection with automatic testnet switching

### 🪢 Async Transaction Handling
- ✅ Added proper error handling + loading states

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit and push
4. Open a Pull Request on GitHub

---

## 📄 License
MIT License

---

## 💌 Contact
✉️ **Email**: arnavrajcodes@gmail.com

---

## ⚡ Happy Crowdfunding!

Together we’re building a decentralized future 🚀

![Thank You Animation](https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif)
