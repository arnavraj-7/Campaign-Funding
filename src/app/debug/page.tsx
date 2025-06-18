"use client"
import React, { useState } from 'react';
import { useContractStore } from '@/stores/contractsStore';

const ContractDebug = () => {
  const {
    contract,
    isConnected,
    account,
    isLoading,
    connectWallet,
    createCampaign,
    getAllCampaigns,
    getCampaign
  } = useContractStore();

  const [testResults, setTestResults] = useState<string[]>([]);
  const [campaignId, setCampaignId] = useState('');

  const addLog = (message: string) => {
    console.log(message);
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testBasicCalls = async () => {
    if (!contract) {
      addLog("Contract not connected");
      return;
    }

    try {
      addLog("Testing basic contract calls...");
      
      // Test numberOfCampaigns
      const numCampaigns = await contract.numberOfCampaigns();
      addLog(`Number of campaigns: ${numCampaigns.toString()}`);
      
      // Test numberOfUsers
      const numUsers = await contract.numberOfUsers();
      addLog(`Number of users: ${numUsers.toString()}`);
      
      addLog("Basic calls successful!");
    } catch (error) {
      addLog(`Basic calls failed: ${error.message}`);
    }
  };

  const testCreateCampaign = async () => {
    if (!account) {
      addLog("No account connected");
      return;
    }

    try {
      addLog("Creating test campaign...");
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30); // 30 days from now
      
      await createCampaign(
        account,
        "Test Campaign",
        "1", // 1 ETH target
        futureDate.toISOString()
      );
      
      addLog("Campaign created successfully!");
    } catch (error) {
      addLog(`Create campaign failed: ${error.message}`);
    }
  };

  const testGetAllCampaigns = async () => {
    try {
      addLog("Getting all campaigns...");
      const campaigns = await getAllCampaigns();
      addLog(`Found ${campaigns?.length || 0} campaigns`);
      if (campaigns && campaigns.length > 0) {
        campaigns.forEach((campaign, index) => {
          addLog(`Campaign ${index}: ${campaign.title} - Target: ${campaign.targetEth} ETH - Raised: ${campaign.amountCollectedEth} ETH`);
        });
      }
    } catch (error) {
      addLog(`Get all campaigns failed: ${error.message}`);
    }
  };

  const testGetCampaign = async () => {
    if (!campaignId) {
      addLog("Please enter a campaign ID");
      return;
    }

    try {
      addLog(`Getting campaign ${campaignId}...`);
      const campaign = await getCampaign(campaignId);
      addLog(`Campaign: ${campaign.title}`);
      addLog(`Owner: ${campaign.owner}`);
      addLog(`Target: ${campaign.targetEth} ETH`);
      addLog(`Raised: ${campaign.amountCollectedEth} ETH`);
      addLog(`Deadline: ${campaign.deadlineDate}`);
    } catch (error) {
      addLog(`Get campaign failed: ${error.message}`);
    }
  };

  const clearLogs = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Contract Debug Tool</h1>
      
      {/* Connection Status */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p><strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}</p>
        <p><strong>Account:</strong> {account || 'None'}</p>
        <p><strong>Contract:</strong> {contract ? 'Loaded' : 'Not loaded'}</p>
        <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
      </div>

      {/* Connect Wallet */}
      {!isConnected && (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}

      {/* Test Buttons */}
      {isConnected && (
        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-semibold">Test Functions</h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={testBasicCalls}
              disabled={isLoading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Test Basic Calls
            </button>
            
            <button
              onClick={testCreateCampaign}
              disabled={isLoading}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Create Test Campaign
            </button>
            
            <button
              onClick={testGetAllCampaigns}
              disabled={isLoading}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
            >
              Get All Campaigns
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Campaign ID"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <button
              onClick={testGetCampaign}
              disabled={isLoading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              Get Campaign
            </button>
          </div>
        </div>
      )}

      {/* Test Results */}
      <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Test Results</h3>
          <button
            onClick={clearLogs}
            className="bg-gray-600 text-white px-3 py-1 rounded text-xs"
          >
            Clear
          </button>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {testResults.length === 0 ? (
            <p>No test results yet...</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractDebug;