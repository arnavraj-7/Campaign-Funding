//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CrowdFunding {

    //CAMPAIGNS
    struct Campaign {
        address owner;
        string title;
        string metadataURI; // IPFS CID
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        mapping(address => uint256) donations;
    }

    uint256 public numberOfCampaigns = 0;
    mapping(bytes32 => Campaign) public campaigns;

    //USERS
    struct user {
        address id;
        bytes32[] campaigns;
        uint256 totalamountDonated;
        mapping(bytes32 => uint256) donations;
    }

    mapping(address => user) public users;
    uint256 public numberOfUsers = 0;

    function createCampaign(
        address owner,
        string memory title,
        string memory metadataURI,
        uint256 target,
        uint256 deadline
    ) public {
        require(deadline > block.timestamp, "The deadline should be a date in the future");

        numberOfCampaigns++;
        bytes32 campaignId = keccak256(abi.encodePacked(msg.sender, block.timestamp, title));

        Campaign storage campaign = campaigns[campaignId];
        campaign.owner = owner;
        campaign.title = title;
        campaign.metadataURI = metadataURI;
        campaign.target = target;
        campaign.deadline = deadline;

        // Add campaignId to user's campaigns list
        user storage campaignCreator = users[msg.sender];
        if (campaignCreator.id == address(0)) {
            campaignCreator.id = msg.sender;
            numberOfUsers++;
        }
        campaignCreator.campaigns.push(campaignId);
    }

    function donate(bytes32 campaign) public payable {
        require(msg.value > 0, "Amount should be greater than 0");
        require(campaigns[campaign].deadline > block.timestamp, "Campaign expired");

        Campaign storage currentCampaign = campaigns[campaign];
        currentCampaign.amountCollected += msg.value;
        currentCampaign.donations[msg.sender] += msg.value;

        user storage currentUser = users[msg.sender];
        if (currentUser.id == address(0)) {
            currentUser.id = msg.sender;
            numberOfUsers++;
        }
        currentUser.totalamountDonated += msg.value;
        currentUser.donations[campaign] += msg.value;
    }
}
