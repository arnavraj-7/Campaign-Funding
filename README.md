# 🚀 Crowd-Spark - Decentralized Crowdfunding Platform
![""](https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif)
A modern Web3 crowdfunding dApp built with **Next.js**, **Ethers.js**, and **Solidity**, enabling users to create fundraising campaigns and contribute to causes they believe in — all powered by **blockchain technology**.

![""](https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif)

---

## ⚠️ IMPORTANT NOTICE

🚨 **This is a TESTNET application. DO NOT send real ETH!** Use **testnet ETH** only. All transactions are on a test blockchain and hold **no real monetary value**.


## ✨ Features

- 🔗 **MetaMask Integration** — Seamless wallet connection & transaction management
- 📝 **Campaign Creation** — Create detailed fundraising campaigns with targets & deadlines
- 💰 **Secure Donations** — Contribute directly through smart contracts
- 📈 **Live Campaign Progress** — Real-time tracking of donations
- 🔐 **Blockchain Security** — All data & funds are protected by smart contracts
- 📱 **Responsive UI** — Fully optimized for desktop and mobile

![Features Demo](https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif)

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

![""](https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif)

---

## 🧭 How to Use Crowd-Spark

### 🚀 Recommended: Use Deployed Website

🔗 Visit: [crowd-spark-ten.vercel.app](https://crowd-spark-ten.vercel.app)

![Getting Started](https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif)

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

![Faucet Process](https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif)

#### 📣 Create a Campaign
1. Connect your wallet
2. Go to **Create Campaign**
3. Add title, description, image, tag, target & deadline
4. Confirm transaction in MetaMask

![Create Campaign](https://user-images.githubusercontent.com/74038190/213760671-4b015894-4ba8-434b-834b-93e95d9074c4.gif)

#### 💸 Donate to Campaigns
1. Browse live campaigns
2. Enter donation amount
3. Confirm in MetaMask

![Donation Process](https://user-images.githubusercontent.com/74038190/212284094-e50d1b31-5c85-4ca4-a1ee-8a8dc5d0a9aa.gif)

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

![Development Setup](https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif)

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

![Environment Setup](https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b09-b72a-8ae1c4f4f72e.gif)

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

![Smart Contracts](https://user-images.githubusercontent.com/74038190/213760697-45ae6491-2060-45c0-8310-8f4cfeb24c17.gif)

---

## 🧱 Project Structure
```
Crowd-Spark/
├── artifacts/               # Compiled contract outputs
│   └── build-info/
├── contracts/               # Solidity smart contracts
├── ignition/                # Hardhat Ignition module
├── node_modules/            # Dependencies
├── original_contract/       # Backup or prior version of contracts
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── campaigns/
│   │   │   ├── [campaign]/  # Individual campaign page
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx     # All campaigns listing
│   │   ├── create-campaign/
│   │   │   └── page.tsx     # Create campaign form
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/          # UI components (cards, navbar, etc.)
│   ├── lib/
│   │   ├── abi.ts           # Smart contract ABI
│   │   └── utils.ts         # Helper functions
│   ├── pages/               # (If used alongside app/)
│   ├── stores/
│   │   └── contractsStore.ts# Zustand store for contract interaction
│   ├── types/               # TypeScript types
│   └── utils/               # Shared utility functions
├── .env.local               # Environment variables (not committed)
├── hardhat.config.ts        # Hardhat config
├── package.json             # Project metadata
├── README.md                # Project documentation
└── tsconfig.json            # TypeScript config

```
![""](https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif)

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

![Challenges Overcome](https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit and push
4. Open a Pull Request on GitHub

![Contributing](https://user-images.githubusercontent.com/74038190/213760703-be3c06c5-20b9-4fa2-8a0d-64de4b9b66bc.gif)

---

## 📄 License
MIT License

---

## 💌 Contact
✉️ **Email**: arnavrajcodes@gmail.com

![Contact](https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif)

---

## ⚡ Happy Crowdfunding!

Together we're building a decentralized future 🚀

![Thank You Animation](https://user-images.githubusercontent.com/74038190/213844263-a8897a51-32f4-4b3b-b5c2-e1528b89f6f3.gif)
![""](https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif)
