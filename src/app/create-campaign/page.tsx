"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Plus, ArrowLeft, Upload, X, Eye } from "lucide-react";
import { useContractStore } from '@/stores/contractsStore';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import Image from 'next/image';
import axios from 'axios';

const tags = [
  { value: 'technology', label: 'Technology', icon: '💻', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'environment', label: 'Environment', icon: '🌱', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { value: 'education', label: 'Education', icon: '📚', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { value: 'health', label: 'Medical / Health', icon: '🏥', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { value: 'arts', label: 'Arts & Culture', icon: '🎨', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  { value: 'startups', label: 'Startups / Business', icon: '🚀', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { value: 'children', label: 'Child Welfare', icon: '👶', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  { value: 'disaster', label: 'Disaster Relief / Emergency', icon: '🆘', color: 'bg-red-600/20 text-red-500 border-red-600/30' },
  { value: 'research', label: 'Scientific Research', icon: '🔬', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
  { value: 'social', label: 'Women Empowerment / Social Justice', icon: '⚖️', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
];

const CreateCampaign = () => {
  const { connectWallet, createCampaign, isConnected, account ,contract} = useContractStore();
  const [isLoading,setisLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedtag, setSelectedtag] = useState('');
  const [currentContract,setCurrent] = useState<ethers.Contract>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setisLoading(true);
    e.preventDefault();
    if (!account || !image || !selectedtag) return;
    
    try {
      const tagData = tags.find(cat => cat.value === selectedtag);
      const data = {
        name: formData.title,
        description: formData.description,
        tag: tagData?.label || '',
      };
      const form =new FormData();
      form.append('file', image);
      form.append('data', JSON.stringify(data));
     const metadata : string= (await axios.post('/api/uploadmetadata', form)).data.data;
      
      await createCampaign(account, formData.title, metadata, formData.target, formData.deadline);
      
      // Reset form
      setFormData({ title: '', description: '', target: '', deadline: '' });
      setImage(null);
      setImagePreview('');
      setSelectedtag('');
      setisLoading(false);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };
  const handleCreation = async (campaignId:string, owner:string, title:string)=>{
         toast.success(`Campaign ${title} Created Successfully!`);
       };

  useEffect(()=>{
    if(isConnected){
      if(!contract) return;
      setCurrent(contract);
    }
  },[isConnected,contract])
  useEffect(()=>{

     if(currentContract){
       currentContract.on("CampaignCreated",handleCreation);
    }

   return ()=>{
    if(!currentContract) return;
    currentContract.removeListener("CampaignCreated",handleCreation);
   }
  },[contract,currentContract])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
            <Button 
              variant="ghost" 
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            </Link>

            <Link href="/campaigns">
            
            <Button 
              variant="outline"
              className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70"
            >
              <Eye className="w-4 h-4 mr-2" />
              View All Campaigns
            </Button>
            </Link>
            
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              Launch Your Campaign
            </h1>
            <p className="text-slate-300 text-lg">Turn your innovative ideas into funded reality</p>
          </div>
        </div>
      </div>

      {/* Campaign Creation Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {!isConnected ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl">Connect Your Wallet</CardTitle>
              <CardDescription className="text-slate-300">
                Connect your Web3 wallet to start creating campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={connectWallet}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg rounded-xl"
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Connected Status */}
            <Card className="bg-green-500/10 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">Connected: </span>
                  <span className="text-green-400 font-mono text-sm">{account}</span>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Form */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  Create New Campaign
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Fill in the details below to launch your crowdfunding campaign
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white font-medium">Campaign Title</Label>
                      <Input
                        id="title"
                        placeholder="Revolutionary AI Assistant"
                        className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target" className="text-white font-medium">Target Amount (ETH)</Label>
                      <Input
                        id="target"
                        type="number"
                        step="0.01"
                        placeholder="10.0"
                        className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                        value={formData.target}
                        onChange={(e) => setFormData({...formData, target: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white font-medium">Description</Label>
                    <textarea
                      id="description"
                      placeholder="Describe your project, its goals, and why people should support it..."
                      className="w-full min-h-[120px] p-3 bg-slate-800/50 border border-slate-600 rounded-md text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  {/* tag Selection */}
                  <div className="space-y-4">
                    <Label className="text-white font-medium">Campaign tag</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {tags.map((tag) => (
                        <button
                          key={tag.value}
                          type="button"
                          onClick={() => setSelectedtag(tag.value)}
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            selectedtag === tag.value
                              ? tag.color + ' scale-105'
                              : 'bg-slate-800/30 border-slate-600 text-slate-400 hover:bg-slate-700/50'
                          }`}
                        >
                          <div className="text-2xl mb-1">{tag.icon}</div>
                          <div className="text-xs font-medium text-center">{tag.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <Label className="text-white font-medium">Campaign Image</Label>
                    {!imagePreview ? (
                      <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-300 mb-2">Upload your campaign image</p>
                        <p className="text-slate-500 text-sm mb-4">PNG, JPG, GIF up to 10MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          className="border-slate-600 text-slate-300 hover:bg-purple-500 hover:border-purple-400 bg-zinc-800/50"
                        >
                          Choose Image
                        </Button>
                      </div>
                    ) : (
                      <div className="relative h-64">
                        <Image
                          src={imagePreview}
                            fill={true}
                          alt="Campaign preview"
                          className="w-full h-full object-cover rounded-lg border border-slate-600"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeImage}
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Deadline */}
                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-white font-medium">Campaign Deadline</Label>
                    <Input
                      id="deadline"
                      type="datetime-local"
                      className="bg-slate-800/50 border-slate-600 text-white focus:border-purple-500"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !image || !selectedtag}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Creating Campaign...' : 'Launch Campaign'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;