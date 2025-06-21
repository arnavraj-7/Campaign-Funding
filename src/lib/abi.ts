// export const CONTRACT_ABI =[
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "title",
//           "type": "string"
//         }
//       ],
//       "name": "CampaignCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "campaignId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "title",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "donor",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "DonationMade",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "campaignId",
//           "type": "uint256"
//         }
//       ],
//       "name": "campaignExists",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "campaigns",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "title",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "metadata",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "target",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amountCollected",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bool",
//           "name": "exists",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "title",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "metadata",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "target",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "deadline",
//           "type": "uint256"
//         }
//       ],
//       "name": "createCampaign",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "campaignId",
//           "type": "uint256"
//         }
//       ],
//       "name": "donate",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "getAllCampaigns",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "owner",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "title",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "metadata",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "target",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "deadline",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "amountCollected",
//               "type": "uint256"
//             },
//             {
//               "internalType": "bool",
//               "name": "exists",
//               "type": "bool"
//             },
//             {
//               "internalType": "address[]",
//               "name": "donators",
//               "type": "address[]"
//             }
//           ],
//           "internalType": "struct CrowdFunding.Campaign[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "campaignId",
//           "type": "uint256"
//         }
//       ],
//       "name": "getCampaign",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "owner",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "title",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "metadata",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "target",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "deadline",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "amountCollected",
//               "type": "uint256"
//             },
//             {
//               "internalType": "bool",
//               "name": "exists",
//               "type": "bool"
//             },
//             {
//               "internalType": "address[]",
//               "name": "donators",
//               "type": "address[]"
//             }
//           ],
//           "internalType": "struct CrowdFunding.Campaign",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "userAddress",
//           "type": "address"
//         }
//       ],
//       "name": "getUser",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "id",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256[]",
//           "name": "campaignIds",
//           "type": "uint256[]"
//         },
//         {
//           "internalType": "uint256",
//           "name": "totalAmountDonated",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "numberOfCampaigns",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "numberOfUsers",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "users",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "id",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "totalAmountDonated",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];
export const CONTRACT_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        }
      ],
      "name": "CampaignCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DonationMade",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        }
      ],
      "name": "campaignExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "campaigns",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "metadata",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "target",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountCollected",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "metadata",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "target",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "createCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        }
      ],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllCampaigns",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "metadata",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "target",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountCollected",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "exists",
              "type": "bool"
            },
            {
              "internalType": "address[]",
              "name": "donators",
              "type": "address[]"
            }
          ],
          "internalType": "struct CrowdFunding.Campaign[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        }
      ],
      "name": "getCampaign",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "metadata",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "target",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountCollected",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "exists",
              "type": "bool"
            },
            {
              "internalType": "address[]",
              "name": "donators",
              "type": "address[]"
            }
          ],
          "internalType": "struct CrowdFunding.Campaign",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentTimestamp",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUser",
      "outputs": [
        {
          "internalType": "address",
          "name": "id",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "campaignIds",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "totalAmountDonated",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfCampaigns",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfUsers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "address",
          "name": "id",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "totalAmountDonated",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
// export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //local testnet
export const CONTRACT_ADDRESS = "0x358e51c3e8EC9b877cF5883215aa7B1bb6707775"; //actual deploy on testnet
