# 🚀 Crowd-Spark - Decentralized Crowdfunding Platform

A modern Web3 crowdfunding dApp built with Next.js, Ethers.js, and Solidity that enables users to create fundraising campaigns and contribute to causes they believe in - all powered by blockchain technology.

## ⚠️ **IMPORTANT NOTICE**
**🚨 This is a TESTNET application. DO NOT send real ETH! Only use testnet ETH for testing purposes. All transactions are on a test blockchain and have no real monetary value.**

## ✨ Features

- **🔗 MetaMask Integration**: Seamless wallet connection and transaction management
- **📊 Campaign Creation**: Create detailed fundraising campaigns with targets and deadlines
- **💰 Secure Donations**: Make contributions directly through smart contracts (TESTNET ONLY)
- **📈 Real-time Updates**: Live campaign progress tracking
- **🔒 Blockchain Security**: All transactions secured by Ethereum testnet
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React-based full-stack framework
- **Zustand** - State Management
- **Ethers.js** - Web3 library for blockchain interactions
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript/TypeScript** - Core programming language

### Backend/Blockchain
- **Solidity** - Smart contract development
- **Next.js Server** - Proxy for uploading to Pinata
- **Hardhat** - Development environment and testing framework
- **Ethereum Testnet** - Blockchain network for deployment
- **Pinata** - IPFS storage for decentralized file hosting

### Deployment
- **Vercel** - Frontend hosting platform
- **MetaMask** - Web3 wallet integration

## 🚀 Live Demo

**Frontend URL**: [vercel-crowd-spark.com](https://crowd-spark-ten.vercel.app)


## 🌐 How to Use Crowd-Spark


### **🚀 Direct Access Using the Live Website  (Recommended)**
Simply visit our deployed website and start using Crowd-Spark immediately:

**Live Website**: [vercel-crowd-spark.com](https://crowd-spark-ten.vercel.app)

**No installation required!** Just follow the usage instructions below.


#### Step 1: Access the Platform
1. **Visit**: [Your Vercel Deployment URL]
2. **Compatible Browsers**: Chrome, Firefox, Edge, Safari

#### Step 2: Install MetaMask (If Not Already Installed)
1. **Download MetaMask**: 
   - Visit [metamask.io](https://metamask.io/)
   - Click "Download" and select your browser
   - Install the browser extension
2. **Create New Wallet**:
   - Open MetaMask extension
   - Click "Create a new wallet"
   - Follow the setup wizard
   - **IMPORTANT**: Save your seed phrase securely!
3. **Complete Setup**: Set a strong password and you're ready!

#### Step 3: Add Testnet Network to MetaMask
1. **On the Crowd-Spark website**, look for the **"Add Testnet to MetaMask"** button
2. **Click the button** - this will automatically configure your MetaMask
3. **Approve in MetaMask**: A popup will appear asking to add the network
4. **Click "Approve"** to add the testnet
5. **Switch Network**: MetaMask will ask if you want to switch to the new network
6. **Click "Switch Network"** to activate the testnet

#### Step 4: Connect Your Wallet
1. **Click "Connect Wallet"** button on the Crowd-Spark homepage
2. **MetaMask Popup**: A MetaMask window will open
3. **Select Account**: Choose the account you want to connect
4. **Click "Connect"** to authorize the connection
5. **Success**: Your wallet address will appear in the top-right corner

#### Step 5: Get Test ETH (Required for Transactions)
**⚠️ REMINDER: This is TESTNET ETH - it has NO real value!**

Get free testnet ETH from these reliable sources:

#### 🚰 **Testnet Faucets (Free Test ETH)**
- **Google Web3** :[cloud.google.com](https://cloud.google.com/application/web3/faucet/ethereum/holesky)
- **Sepolia Faucet**: [sepoliafaucet.com](https://sepoliafaucet.com/)
- **Alchemy Faucet**: [sepoliafaucet.io](https://sepoliafaucet.io/)
- **Chainlink Faucet**: [faucets.chain.link](https://faucets.chain.link/)
- **QuickNode Faucet**: [faucet.quicknode.com](https://faucet.quicknode.com/)
- **Infura Faucet**: [infura.io/faucet](https://infura.io/faucet)

**How to get test ETH:**
1. **Copy Your Address**: Click on your MetaMask to copy your wallet address
2. **Visit Faucet**: Choose any faucet from the list above
3. **Paste Address**: Enter your wallet address on the faucet website
4. **Request ETH**: Click "Send" or "Request" button
5. **Wait**: Usually takes 1-2 minutes to receive test ETH
6. **Check Balance**: Refresh MetaMask to see your test ETH balance

#### Step 6: Create a Campaign
1. **Navigate to "Create Campaign"** or click the "+" button
2. **Fill Campaign Details**:
   - **Title**: Give your campaign a catchy name
   - **Description**: Explain your cause (supports markdown)
   - **Tag**: Assign a suitable tag from the others given
   - **Target Amount**: Set fundraising goal (in testnet ETH)
   - **Deadline**: Choose end date for your campaign
   - **Image**: Upload a banner image (stored on IPFS)
3. **Review Details**: Double-check all information
4. **Click "Create Campaign"** 
5. **Confirm in MetaMask**: Approve the transaction
6. **Wait for Confirmation**: Transaction will be processed (30-60 seconds)
7. **Success**: Your campaign is now live!

#### Step 7: Donate to Campaigns (TESTNET ONLY)
**⚠️ IMPORTANT: Only use TESTNET ETH - Never send real ETH!**

1. **Browse Campaigns**: Scroll through available campaigns on homepage
2. **Click Campaign**: View detailed information about any campaign
3. **Enter Amount**: Type donation amount in the input field
4. **Click "Donate"**: Initiate the donation process
5. **Confirm Transaction**: Approve in MetaMask popup
6. **Transaction Success**: Your donation is recorded on blockchain
7. **View Update**: Campaign progress updates automatically

#### Step 8: Manage Your Campaigns
1. **My Campaigns**: View campaigns you've created
2. **Withdraw Funds**: Campaign creators can withdraw raised funds
3. **Track Progress**: Monitor donations and engagement
4. **Update Campaign**: Edit details if needed (future feature)

---

## 📋 Prerequisites for Development

If you want to run the project locally, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MetaMask** browser extension
- **Git** for version control

## ⚙️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/arnavraj-7/Crowd-Spark.git
cd Crowd-Spark
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET=your_pinata_secret_key
PRIVATE_KEY=your_wallet_private_key
NEXT_PUBLIC_RPC=your_testnet_rpc_url
NEXT_PUBLIC_CHAINID=your_testnet_chain_id
```

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 5. Build for Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🔧 Smart Contract Functions

### Read Functions (No Gas Required)
```javascript
// Get total number of campaigns
const totalCampaigns = await contract.numberOfCampaigns();

// Get campaign details
const campaign = await contract.getCampaign(campaignId);

// Get donations for a campaign
const donations = await contract.getAllCampaigns();
```

### Write Functions (Gas Required)
```javascript
// Create a new campaign
await contract.createCampaign(title, description, target, deadline);

// Donate to a campaign
await contract.donateToCampaign(campaignId, { value: donationAmount });

```

## 🚨 Troubleshooting

### Common Issues & Solutions

#### MetaMask Connection Issues
- **Problem**: Wallet won't connect
- **Solution**: Refresh the page and try connecting again
- **Alternative**: Restart MetaMask extension

#### Transaction Failures
- **Problem**: Transaction fails or gets stuck
- **Solution**: Increase gas fee in MetaMask settings
- **Check**: Ensure you have sufficient test ETH

#### Network Issues
- **Problem**: Wrong network selected
- **Solution**: Switch to the correct testnet in MetaMask
- **Verify**: Check that contract is deployed on the same network

#### Faucet Issues
- **Problem**: Faucet not working
- **Solution**: Try a different faucet from the list above
- **Wait**: Some faucets have cooldown periods

## 🏗️ Development Challenges Overcome

### 1. **Testnet Faucet Reliability**
- **Challenge**: Many faucets were offline or had long wait times
- **Solution**: Compiled a list of multiple reliable faucet sources
- **Learning**: Always have backup faucet options for users

### 2. **Web3 Library Conflicts**
- **Challenge**: Version conflicts between ethers.js, web3.js, and other dependencies in Next.js environment
- **Solution**: Standardized on ethers.js v6, resolved SSR issues, and managed client-side only imports
- **Learning**: Next.js requires careful handling of Web3 libraries due to server-side rendering

### 3. **Smart Contract Deployment**
- **Challenge**: First-time deployment on testnet with proper configuration
- **Solution**: Used Hardhat for local testing before testnet deployment
- **Learning**: Always test locally before deploying to public networks

### 4. **Contract Interaction Complexity**
- **Challenge**: Understanding async/await patterns and transaction handling
- **Solution**: Implemented proper error handling and loading states
- **Learning**: Web3 development requires careful state management

### 5. **MetaMask Integration**
- **Challenge**: Handling different MetaMask states and network switching
- **Solution**: Built robust connection logic with fallbacks
- **Learning**: User experience is crucial for Web3 adoption

## 📁 Project Structure

```
Crowd-Spark/
├── pages/
│   ├── _app.js
│   ├── index.js
│   ├── create-campaign.js
│   └── campaign/
│       └── [id].js
├── components/
│   ├── Header.js
│   ├── CampaignCard.js
│   ├── CreateCampaign.js
│   ├── DonationForm.js
│   └── Layout.js
├── utils/
│   ├── web3.js
│   ├── pinata.js
│   └── constants.js
├── contracts/
│   └── CrowdFunding.sol
├── scripts/
│   └── deploy.js
├── styles/
│   └── globals.css
├── public/
├── hardhat.config.js
├── next.config.js
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenZeppelin** for secure smart contract patterns
- **Hardhat** team for excellent development tools
- **MetaMask** for seamless Web3 integration
- **Vercel** for reliable hosting platform
- **Ethereum Foundation** for the robust blockchain infrastructure

## 📞 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Open an issue** on GitHub
3. **Contact**: arnavrajcodes@gmail.com

---

**⚡ Happy Crowdfunding! Let's build the future of decentralized fundraising together!**