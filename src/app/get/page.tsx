'use client';

import { useState } from 'react';
import { useContract } from '@/hooks/useCrowdFunding';

export default function CampaignViewer() {
  const { 
    connectWallet, 
    isConnected, 
    getCampaign, 
    getCampaignCount,
    getAllCampaigns,
    donateToCampaign,
    isLoading 
  } = useContract();
  
  const [campaign, setCampaign] = useState(null);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [campaignCount, setCampaignCount] = useState(0);
  const [selectedCampaignId, setSelectedCampaignId] = useState(0);
  const [donationAmount, setDonationAmount] = useState('');
  const [error, setError] = useState('');

  const fetchCampaignCount = async () => {
    try {
      setError('');
      const count = await getCampaignCount();
      setCampaignCount(count);
      console.log(`Total campaigns: ${count}`);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch campaign count: ' + err.message);
    }
  };

  const fetchCampaign = async () => {
    try {
      setError('');
      const data = await getCampaign(selectedCampaignId);
      setCampaign(data);
      console.log('Campaign data:', data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch campaign: ' + err.message);
    }
  };

  const fetchAllCampaigns = async () => {
    try {
      setError('');
      const campaigns = await getAllCampaigns();
      setAllCampaigns(campaigns);
      console.log('All campaigns:', campaigns);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch campaigns: ' + err.message);
    }
  };

  const handleDonate = async (campaignId) => {
    try {
      setError('');
      if (!donationAmount || parseFloat(donationAmount) <= 0) {
        setError('Please enter a valid donation amount');
        return;
      }
      
      await donateToCampaign(campaignId, donationAmount);
      alert('Donation successful!');
      setDonationAmount('');
      
      // Refresh campaign data
      await fetchCampaign();
    } catch (err) {
      console.error(err);
      setError('Donation failed: ' + err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Campaign Viewer</h1>
      
      {!isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={fetchCampaignCount}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
            >
              {isLoading ? 'Loading...' : 'Get Campaign Count'}
            </button>
            
            <button
              onClick={fetchAllCampaigns}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
            >
              {isLoading ? 'Loading...' : 'Load All Campaigns'}
            </button>
            
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(parseInt(e.target.value) || 0)}
                className="border px-2 py-1 rounded w-20 text-black"
                placeholder="ID"
              />
              <button
                onClick={fetchCampaign}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white flex-1"
              >
                {isLoading ? 'Loading...' : 'Load Campaign'}
              </button>
            </div>
          </div>

          {campaignCount > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">Total Campaigns: {campaignCount}</h3>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {campaign && (
            <div className="bg-white shadow-lg rounded-lg p-6 border">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Campaign #{campaign.campaignId}</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Title:</strong> {campaign.title}</p>
                <p><strong>Owner:</strong> {campaign.owner}</p>
                <p><strong>Target:</strong> {campaign.target} ETH</p>
                <p><strong>Amount Collected:</strong> {campaign.amountCollected} ETH</p>
                <p><strong>Deadline:</strong> {campaign.deadline}</p>
                <p><strong>Progress:</strong> {((parseFloat(campaign.amountCollected) / parseFloat(campaign.target)) * 100).toFixed(2)}%</p>
              </div>
              
              <div className="mt-6 flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Amount (ETH)"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="border px-3 py-2 rounded flex-1 text-black"
                />
                <button
                  onClick={() => handleDonate(campaign.campaignId)}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-medium"
                >
                  {isLoading ? 'Donating...' : 'Donate'}
                </button>
              </div>
            </div>
          )}

          {allCampaigns.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">All Campaigns</h2>
              {allCampaigns.map((camp) => (
                <div key={camp.campaignId} className="bg-white shadow rounded-lg p-4 border">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Campaign #{camp.campaignId}: {camp.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><strong>Target:</strong> {camp.target} ETH</p>
                    <p><strong>Collected:</strong> {camp.amountCollected} ETH</p>
                    <p><strong>Owner:</strong> {camp.owner.slice(0, 8)}...</p>
                    <p><strong>Deadline:</strong> {camp.deadline}</p>
                  </div>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{
                          width: `${Math.min(((parseFloat(camp.amountCollected) / parseFloat(camp.target)) * 100), 100)}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {((parseFloat(camp.amountCollected) / parseFloat(camp.target)) * 100).toFixed(2)}% funded
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}