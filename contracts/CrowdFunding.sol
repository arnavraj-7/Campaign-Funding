// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CrowdFunding {

    // CAMPAIGNS
    struct Campaign {
        address owner;
        string title;
        string metadata;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        bool exists;
        address[]donators;
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

    // Create a new campaign
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
        emit DonationMade(campaignId,campaign_title, msg.sender, msg.value);
    }

    // Get campaign details safely
    function getCampaign(uint256 campaignId) public view returns (
        Campaign memory
    ) {
        require(campaignId < numberOfCampaigns, "Campaign does not exist");
        require(campaigns[campaignId].exists, "Campaign does not exist");
        
        Campaign storage c = campaigns[campaignId];
        
          Campaign memory compaign = Campaign({
           owner: c.owner,
           title: c.title,
            target:c.target,
            deadline:c.deadline,
           metadata: c.metadata,
            amountCollected:c.amountCollected,
           donators: c.donators,
           exists: c.exists});
       return compaign;
    }

    // Get all campaigns - FIXED VERSION
    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        
        for(uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage campaign = campaigns[i];
            allCampaigns[i] = Campaign({
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
}