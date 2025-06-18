// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CrowdFunding {

    // CAMPAIGNS
    struct Campaign {
        address owner;
        string title;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        bool exists; // ✅ For safe checks
    }

    uint256 public numberOfCampaigns = 0;
    mapping(uint256 => Campaign) public campaigns;

    // USERS
    struct user {
        address id;
        uint256[] campaigns;
        uint256 totalamountDonated;
        mapping(uint256 => uint256) donations;
    }

    mapping(address => user) public users;
    uint256 public numberOfUsers = 0;

    // Events
    event CampaignCreated(uint256 indexed id, address owner, string title);

    // Create a new campaign
    function createCampaign(
        address owner,
        string memory title,
        uint256 target,
        uint256 deadline
    ) public {
        require(deadline > block.timestamp, "Deadline should be in the future");

        uint256 campaignId = numberOfCampaigns;
        numberOfCampaigns++;

        Campaign storage campaign = campaigns[campaignId];
        campaign.owner = owner;
        campaign.title = title;
        campaign.target = target;
        campaign.deadline = deadline;
        campaign.exists = true; // ✅ important

        // Add campaign to user's list
        user storage campaignCreator = users[msg.sender];
        if (campaignCreator.id == address(0)) {
            campaignCreator.id = msg.sender;
            numberOfUsers++;
        }
        campaignCreator.campaigns.push(campaignId);

        emit CampaignCreated(campaignId, msg.sender, title);
    }

    // Donate to a campaign
    function donate(uint256 campaignId) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(campaigns[campaignId].exists, "Campaign doesn't exist");
        require(campaigns[campaignId].deadline > block.timestamp, "Campaign expired");

        Campaign storage currentCampaign = campaigns[campaignId];
        currentCampaign.amountCollected += msg.value;

        user storage currentUser = users[msg.sender];
        if (currentUser.id == address(0)) {
            currentUser.id = msg.sender;
            numberOfUsers++;
        }
        currentUser.totalamountDonated += msg.value;
        currentUser.donations[campaignId] += msg.value;
    }

    // Get campaign details safely
    function getCampaign(uint256 campaignId) public view returns (
        address owner,
        string memory title,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected
    ) {
        require(campaigns[campaignId].exists, "Campaign does not exist");
        Campaign storage c = campaigns[campaignId];
        return (
            c.owner,
            c.title,
            c.target,
            c.deadline,
            c.amountCollected
        );
    }
}
