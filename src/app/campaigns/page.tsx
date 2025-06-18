'use client';

import { useState } from 'react';
import { useContract } from '../../hooks/useCrowdFunding';

export default function Home() {
  const { account, isConnected, isLoading, connectWallet, createCampaign } = useContract();
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    deadline: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createCampaign(
        formData.title,
        formData.target,
        formData.deadline
      );
      
      alert('Campaign created!');
      setFormData({ title: '', target: '', deadline: '' });
    } catch (error) {
      alert('Error creating campaign');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">CrowdFunding DApp</h1>
      
      {!isConnected ? (
        <div className="text-center">
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">Connected: {account}</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Campaign Title"
              className="w-full p-3 border rounded"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Target (ETH)"
              className="w-full p-3 border rounded"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
              required
            />
            
            <input
              type="datetime-local"
              className="w-full p-3 border rounded"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              required
            />
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white p-3 rounded"
            >
              {isLoading ? 'Creating...' : 'Create Campaign'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}