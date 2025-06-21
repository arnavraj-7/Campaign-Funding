// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CrowdFunding {

    // CAMPAIGNS
    struct Campaign {
        uint256 id;
        address owner;
        string title;
        string metadata;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        bool exists;
        address[] donators;
    }

    uint256 public numberOfCampaigns = 0;
    mapping(uint256 => Campaign) public campaigns;

    // USERS - Fixed struct (removed nested mapping)
    struct User {
        address id;
        uint256[] campaignIds;
        uint256 totalAmountDonated;
    }

    mapping(address => User) public users;
    uint256 public numberOfUsers = 0;

    // Events
    event CampaignCreated(uint256 indexed id, address owner, string title);
    event DonationMade(uint256 indexed campaignId, string title, address donor, uint256 amount);

    // Constructor to seed initial data
    constructor() {
        _seedInitialData();
        _addDonationsToSeededCampaigns();
    }

    // Private function to seed initial campaigns
    function _seedInitialData() private {
        // Campaign 0: CodeBridge Camp
        _createInitialCampaign(
            0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,
            "CodeBridge Camp",
            "https://gateway.pinata.cloud/ipfs/QmdEbP792nGdwuA9y7XGbZZq7jaqvgsLC4RmjEC9uAAtU5",
            120000000000000000000, // 120 ETH
            1765305000
        );

        // Campaign 1: Green Earth Initiative
        _createInitialCampaign(
            0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,
            "Green Earth Initiative",
            "https://gateway.pinata.cloud/ipfs/QmQBweihT76N7K58Mux82x9odbY3RyM9XRJoH1pPSW3UJt",
            90000000000000000000, // 90 ETH
            1759257060
        );

        // Campaign 2: Books for Tomorrow
        _createInitialCampaign(
            0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,
            "Books for Tomorrow",
            "https://gateway.pinata.cloud/ipfs/QmbdhoBeRVj9epaPALguGfuYXSUb2Fd3p2e5wqDAyJAAxa",
            80000000000000000000, // 80 ETH
            1767205800
        );

        // Campaign 3: Healing Hearts Medical Mission
        _createInitialCampaign(
            0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,
            "Healing Hearts Medical Mission",
            "https://gateway.pinata.cloud/ipfs/QmQ9Qc5UpXtT5B8eJDmmpr53HDkzu1gFJjZoieJbLwnTxw",
            220000000000000000000, // 220 ETH
            1756665000
        );

        // Campaign 4: Canvas Dreams Art Therapy
        _createInitialCampaign(
            0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199,
            "Canvas Dreams Art Therapy",
            "https://gateway.pinata.cloud/ipfs/QmY64Zp3s17XCAACCg5iGtshFErNRdgSAvw1cxRnP4ykRS",
            70000000000000000000, // 70 ETH
            1751308200
        );

        // Campaign 5: Innovation Hub Startup Incubator
        _createInitialCampaign(
            0x71bE63f3384f5fb98995898A86B02Fb2426c5788,
            "Innovation Hub Startup Incubator",
            "https://gateway.pinata.cloud/ipfs/QmbMyehL5N7ojJLsG3618xk9kbxzbhch2v3RFRsAYYQFaL",
            240000000000000000000, // 240 ETH
            1753990200
        );

        // Campaign 6: Robotics Explorer Camp for Kids
        _createInitialCampaign(
            0x71bE63f3384f5fb98995898A86B02Fb2426c5788,
            "Robotics Explorer Camp for Kids",
            "https://gateway.pinata.cloud/ipfs/Qma4hiWBSMTw8NBYyoUZBQiMyHkHt2EqVy5ys7EnfPDQ8K",
            350000000000000000000, // 350 ETH
            1767205800
        );

        // Campaign 7: Rise Up Women's Empowerment
        _createInitialCampaign(
            0x71bE63f3384f5fb98995898A86B02Fb2426c5788,
            "Rise Up Women's Empowerment",
            "https://gateway.pinata.cloud/ipfs/QmNk9vFwWMBickHgP8dFDwEDMy9w5RoRdtcadTqFWPvTDa",
            60000000000000000000, // 60 ETH
            1757442600
        );

        // Campaign 8: Lab to Life: Research for Rare Diseases
        _createInitialCampaign(
            0x71bE63f3384f5fb98995898A86B02Fb2426c5788,
            "Lab to Life: Research for Rare Diseases",
            "https://gateway.pinata.cloud/ipfs/QmYARRXzPKMoY3zmYA6C92ZDweWGXCj7uVcSa2V1MMguCv",
            300000000000000000000, // 300 ETH
            1760214660
        );
    }

    // Add random donations to campaigns
    function _addDonationsToSeededCampaigns() private {
        // Mock donor addresses
        address[] memory donors = new address[](6);
        donors[0] = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // Hardhat account #0
        donors[1] = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; // Hardhat account #1
        donors[2] = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; // Hardhat account #2
        donors[3] = 0x90F79bf6EB2c4f870365E785982E1f101E93b906; // Hardhat account #3
        donors[4] = 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65; // Hardhat account #4
        donors[5] = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc; // Hardhat account #5

        // Campaign 0: CodeBridge Camp - 25% funded
        _addDonation(0, donors[0], 15000000000000000000); // 15 ETH
        _addDonation(0, donors[1], 8000000000000000000);  // 8 ETH
        _addDonation(0, donors[2], 7000000000000000000);  // 7 ETH

        // Campaign 1: Green Earth Initiative - 40% funded
        _addDonation(1, donors[1], 20000000000000000000); // 20 ETH
        _addDonation(1, donors[3], 12000000000000000000); // 12 ETH
        _addDonation(1, donors[4], 4000000000000000000);  // 4 ETH

        // Campaign 2: Books for Tomorrow - 60% funded
        _addDonation(2, donors[0], 25000000000000000000); // 25 ETH
        _addDonation(2, donors[2], 15000000000000000000); // 15 ETH
        _addDonation(2, donors[5], 8000000000000000000);  // 8 ETH

        // Campaign 3: Healing Hearts Medical Mission - 30% funded
        _addDonation(3, donors[1], 35000000000000000000); // 35 ETH
        _addDonation(3, donors[3], 20000000000000000000); // 20 ETH
        _addDonation(3, donors[4], 11000000000000000000); // 11 ETH

        // Campaign 4: Canvas Dreams Art Therapy - 80% funded
        _addDonation(4, donors[0], 30000000000000000000); // 30 ETH
        _addDonation(4, donors[2], 18000000000000000000); // 18 ETH
        _addDonation(4, donors[5], 8000000000000000000);  // 8 ETH

        // Campaign 5: Innovation Hub Startup Incubator - 20% funded
        _addDonation(5, donors[1], 25000000000000000000); // 25 ETH
        _addDonation(5, donors[3], 15000000000000000000); // 15 ETH
        _addDonation(5, donors[4], 8000000000000000000);  // 8 ETH

        // Campaign 6: Robotics Explorer Camp for Kids - 15% funded
        _addDonation(6, donors[0], 30000000000000000000); // 30 ETH
        _addDonation(6, donors[2], 20000000000000000000); // 20 ETH
        _addDonation(6, donors[5], 2500000000000000000);  // 2.5 ETH

        // Campaign 7: Rise Up Women's Empowerment - 90% funded
        _addDonation(7, donors[1], 25000000000000000000); // 25 ETH
        _addDonation(7, donors[3], 20000000000000000000); // 20 ETH
        _addDonation(7, donors[4], 9000000000000000000);  // 9 ETH

        // Campaign 8: Lab to Life: Research for Rare Diseases - 35% funded
        _addDonation(8, donors[0], 55000000000000000000); // 55 ETH
        _addDonation(8, donors[2], 35000000000000000000); // 35 ETH
        _addDonation(8, donors[5], 15000000000000000000); // 15 ETH
    }

    // Internal function to add donations during seeding
    function _addDonation(uint256 campaignId, address donor, uint256 amount) private {
        Campaign storage campaign = campaigns[campaignId];
        campaign.amountCollected += amount;
        campaign.donators.push(donor);

        // Update user donation tracking
        User storage user = users[donor];
        if (user.id == address(0)) {
            user.id = donor;
            numberOfUsers++;
        }
        user.totalAmountDonated += amount;
    }

    // Internal function to create initial campaigns (no validation for seeding)
    function _createInitialCampaign(
        address owner,
        string memory title,
        string memory metadata,
        uint256 target,
        uint256 deadline
    ) private {
        uint256 campaignId = numberOfCampaigns;
        
        Campaign storage campaign = campaigns[campaignId];
        campaign.id = numberOfCampaigns;
        campaign.owner = owner;
        campaign.title = title;
        campaign.target = target;
        campaign.metadata = metadata;
        campaign.deadline = deadline;
        campaign.amountCollected = 0;
        campaign.exists = true;

        numberOfCampaigns++;

        // Add campaign to user's list
        User storage campaignCreator = users[owner];
        if (campaignCreator.id == address(0)) {
            campaignCreator.id = owner;
            numberOfUsers++;
        }
        campaignCreator.campaignIds.push(campaignId);

        emit CampaignCreated(campaignId, owner, title);
    }

    // Create a new campaign (public function with validation)
    function createCampaign(
        address owner,
        string memory title,
        string memory metadata,
        uint256 target,
        uint256 deadline
    ) public {
        require(deadline > block.timestamp, "Deadline should be in the future");
        require(target > 0, "Target must be greater than 0");
        require(bytes(title).length > 0, "Title cannot be empty");

        uint256 campaignId = numberOfCampaigns;
        
        Campaign storage campaign = campaigns[campaignId];
        campaign.id = numberOfCampaigns;
        campaign.owner = owner;
        campaign.title = title;
        campaign.target = target;
        campaign.metadata = metadata;
        campaign.deadline = deadline;
        campaign.amountCollected = 0;
        campaign.exists = true;

        numberOfCampaigns++;

        // Add campaign to user's list
        User storage campaignCreator = users[msg.sender];
        if (campaignCreator.id == address(0)) {
            campaignCreator.id = msg.sender;
            numberOfUsers++;
        }
        campaignCreator.campaignIds.push(campaignId);

        emit CampaignCreated(campaignId, owner, title);
    }

    // Donate to a campaign
    function donate(uint256 campaignId) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(campaignId < numberOfCampaigns, "Campaign doesn't exist");
        require(campaigns[campaignId].exists, "Campaign doesn't exist");
        require(campaigns[campaignId].deadline > block.timestamp, "Campaign expired");

        Campaign storage currentCampaign = campaigns[campaignId];
        currentCampaign.amountCollected += msg.value;

        User storage currentUser = users[msg.sender];
        if (currentUser.id == address(0)) {
            currentUser.id = msg.sender;
            numberOfUsers++;
        }
        currentUser.totalAmountDonated += msg.value;
        currentCampaign.donators.push(msg.sender);
        string memory campaign_title = currentCampaign.title;
        emit DonationMade(campaignId, campaign_title, msg.sender, msg.value);
    }

    // Get campaign details safely
    function getCampaign(uint256 campaignId) public view returns (
        Campaign memory
    ) {
        require(campaignId < numberOfCampaigns, "Campaign does not exist");
        require(campaigns[campaignId].exists, "Campaign does not exist");
        
        Campaign storage c = campaigns[campaignId];
        
        Campaign memory campaign = Campaign({
            id: c.id,
            owner: c.owner,
            title: c.title,
            target: c.target,
            deadline: c.deadline,
            metadata: c.metadata,
            amountCollected: c.amountCollected,
            donators: c.donators,
            exists: c.exists
        });
        return campaign;
    }

    // Get all campaigns - FIXED VERSION
    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        
        for(uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = Campaign({
                id: campaign.id,
                owner: campaign.owner,
                title: campaign.title,
                metadata: campaign.metadata,
                target: campaign.target,
                deadline: campaign.deadline,
                amountCollected: campaign.amountCollected,
                exists: campaign.exists,
                donators: campaign.donators
            });
        }
        
        return allCampaigns;
    }

    // Get user details
    function getUser(address userAddress) public view returns (
        address id,
        uint256[] memory campaignIds,
        uint256 totalAmountDonated
    ) {
        User storage user = users[userAddress];
        return (
            user.id,
            user.campaignIds,
            user.totalAmountDonated
        );
    }

    // Check if campaign exists
    function campaignExists(uint256 campaignId) public view returns (bool) {
        return campaignId < numberOfCampaigns && campaigns[campaignId].exists;
    }

    // Helper function to get current timestamp (useful for testing)
    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }
}