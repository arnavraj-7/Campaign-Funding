"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wallet, Plus, ArrowLeft } from "lucide-react";
import { useContractStore } from '@/stores/contractsStore';
import Link from "next/link"
// import { useToast } from "@/hooks/use-toast";



const CreateCampaign = () => {
  //   const { toast } = useToast();
  const{connectWallet, createCampaign, isConnected, isLoading, account} = useContractStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;
    
    try {
     await createCampaign(account,formData.title,formData.target, formData.deadline);
    //   toast({
    //     title: "Campaign Created!",
    //     description: `${formData.title} has been successfully created.`,
    //   });
      setFormData({ title: '', description: '', target: '', deadline: '' });
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Error",
    //     description: "Failed to create campaign. Please try again.",
    //   });
    }
  };

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
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="text-slate-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
<Link href="/campaigns">
view all
</Link>          
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              Launch Your Campaign
            </h1>
            <p className="text-gray-400 text-lg">Turn your innovative ideas into funded reality</p>
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
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white font-medium">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project, its goals, and why people should support it..."
                      className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 min-h-[120px]"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

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
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isLoading ? 'Creating...' : 'Launch Campaign'}
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