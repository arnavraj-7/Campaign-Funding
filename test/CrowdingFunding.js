const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding Contract", function () {
  let CrowdFunding, contract, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    contract = await CrowdFunding.deploy();
    await contract.waitForDeployment();
  });

  it("should deploy the contract properly", async () => {
    expect(await contract.numberOfCampaigns()).to.equal(0);
  });

  it("should create a campaign and store it", async () => {
    const title = "Test Campaign";
    const target = ethers.parseEther("10"); // 10 ETH target
    const futureDate = Math.floor(Date.now() / 1000) + 86400; // 1 day later

    const tx = await contract.createCampaign(owner.address, title, target, futureDate);
    await tx.wait();

    const num = await contract.numberOfCampaigns();
    expect(num).to.equal(1);

    // Generate campaignId like in your contract
    const campaignId = ethers.keccak256(
      ethers.solidityPacked(
        ['address', 'uint256', 'string'],
        [owner.address, await getBlockTimestamp(), title]
      )
    );

    const storedCampaign = await contract.getCampaign(campaignId);
    expect(storedCampaign[0]).to.equal(owner.address); // owner
    expect(storedCampaign[1]).to.equal(title); // title
    expect(storedCampaign[2]).to.equal(target); // target
  });

  // helper function to get timestamp of latest block
  async function getBlockTimestamp() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }
});
