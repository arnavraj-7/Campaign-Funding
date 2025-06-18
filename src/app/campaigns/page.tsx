"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Target,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  ArrowLeft,
  Heart,
  Share2,
  Plus,
  Eye,
  Wallet,
} from "lucide-react";
import { useContractStore } from "@/stores/contractsStore";
import type { campaign, ProcessedCampaign } from "@/types/index.ts";
import Link from "next/link";
import { all } from "axios";
import toast from "react-hot-toast";
import { ethers } from "ethers";

const tagIcons: Record<string, string> = {
  Technology: "💻",
  Environment: "🌱",
  Education: "📚",
  Health: "🏥",
  Art: "🎨",
  "Arts & Culture": "🎨",
  "Startups / Business": "🚀",
  "Child Welfare": "👶",
  "Disaster Relief / Emergency": "🆘",
  "Scientific Research": "🔬",
  "Women Empowerment / Social Justice": "⚖️",
};

const Campaigns = () => {
  const { getAllCampaigns, isConnected, connectWallet, donate, allCampaigns,contract } =
    useContractStore();
  const [loading, setLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<campaign | null>(
    null
  );
  const [donationAmount, setDonationAmount] = useState("");
  const [likedCampaigns, setLikedCampaigns] = useState<Set<string>>(new Set());

  useEffect(() => {
    if(isConnected && contract){
      contract.on("DonationMade",(campaignId:number,campaignTitle:string,donor:string,donationAmount:bigint)=>{
        toast.success(`Donation of ${ethers.f(donationAmount)} ETH made successfully to ${campaignTitle}`,{duration:5000});
        getAllCampaigns();
      })
    }

    const fetchCampaigns = async () => {
      if(!isConnected) return
      try {
        setLoading(true);
        await getAllCampaigns();
        console.log("allCampaigns", allCampaigns);
        if (allCampaigns) {
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [isConnected]);

  const formatDeadline = (deadlineDate: Date) => {
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Ended";
    if (diffDays === 0) return "Ends today";
    return `${diffDays} days left`;
  };

  const getProgressPercentage = (donated: string, target: string) => {
    return Math.min((parseFloat(donated) / parseFloat(target)) * 100, 100);
  };

  const gettagColor = (tag?: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Environment: "bg-green-500/20 text-green-400 border-green-500/30",
      Education: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Health: "bg-red-500/20 text-red-400 border-red-500/30",
      "Arts & Culture": "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "Startups / Business":
        "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };
    return (
      colors[tag || ""] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
    );
  };


  const handleDonate = async(id:string,amount:string) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
   await donate(id, amount);
    console.log(
      `Donating ${donationAmount} ETH to campaign ${selectedCampaign?.id}`
    );
    setDonationAmount("");
    setSelectedCampaign(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading campaigns...</p>
        </div>
      </div>
    );
  }
  if(allCampaigns===null){
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/")}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <Button
              onClick={() => (window.location.href = "/create-campaign")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              Active Campaigns
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Discover innovative projects and help bring them to life
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <TrendingUp className="w-4 h-4" />
                <span>{allCampaigns.length} Active Projects</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <DollarSign className="w-4 h-4" />
                <span>
                  {allCampaigns
                    .reduce(
                      (acc, campaign) => acc + parseFloat(campaign.donated),
                      0
                    )
                    .toFixed(1)}{" "}
                  ETH Raised
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span>
                  {allCampaigns.length * Math.floor(Math.random() * 20 + 10)}{" "}
                  Backers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {allCampaigns?.length === 0 ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Campaigns Yet
              </h3>
              <p className="text-slate-400 mb-6">
                Be the first to create a campaign and start raising funds!
              </p>
              <Button
                onClick={() => (window.location.href = "/create-campaign")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCampaigns?.map((campaign: ProcessedCampaign, index) => {
              const progress = getProgressPercentage(
                campaign.amountCollected,
                campaign.target
              );
              const isEnded = new Date(campaign.deadlineDate) < new Date();
              const isLiked = true;

              return (
                <Card
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group overflow-hidden"
                >
                  {/* Mock Campaign Image */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 overflow-hidden">
                    <img
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      className="absolute h-full w-full object-cover inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"
                    />
                    <div className="absolute top-4 left-4">
                      {campaign.tag && (
                        <Badge
                          className={`${gettagColor(
                            campaign.tag
                          )} font-medium border backdrop-blur-sm`}
                        >
                          <span className="mr-1">
                            {tagIcons[campaign.tag] || "📁"}
                          </span>
                          {campaign.tag}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`backdrop-blur-sm border ${
                          isLiked
                            ? "text-red-400 bg-red-500/20"
                            : "text-white bg-black/20"
                        } hover:scale-110 transition-transform`}
                      >
                        <Heart
                          className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white bg-black/20 backdrop-blur-sm border hover:scale-110 transition-transform"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white font-bold text-lg mb-1 line-clamp-2">
                        {campaign.title}
                      </div>
                      <div className="text-slate-300 text-sm">
                        by {campaign.owner}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Description */}
                    {campaign.description && (
                      <p className="text-slate-400 text-sm line-clamp-3">
                        {campaign.description}
                      </p>
                    )}

                    {/* Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">
                          {campaign.amountCollected || 0} ETH
                        </span>
                        <span className="text-slate-400">
                          of {campaign.target} ETH
                        </span>
                      </div>

                      <Progress value={progress} className="h-2 bg-slate-700" />

                      <div className="flex justify-between text-sm text-slate-400">
                        <span>{progress.toFixed(1)}% funded</span>
                        <span>
                          {Math.floor(Math.random() * 50 + 10)} backers
                        </span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span
                        className={`font-medium ${
                          isEnded ? "text-red-400" : "text-blue-400"
                        }`}
                      >
                        {formatDeadline(new Date(campaign.deadlineDate))}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-slate-500 font-mono">
                      IPFS:{" "}
                      <Link
                        className="underline overflow-hidden truncate"
                        href={campaign.metadata}
                        target="_blank"
                      >
                        {campaign.metadata.slice(0,20)}...
                      </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className={`flex-1 py-6 text-lg rounded-xl transition-all duration-300 ${
                              isEnded
                                ? "bg-slate-600 hover:bg-slate-700 text-slate-300"
                                : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transform hover:scale-[1.02]"
                            }`}
                            disabled={isEnded}
                            onClick={() => setSelectedCampaign(campaign)}
                          >
                            {isEnded ? "Campaign Ended" : "Support Project"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-slate-700 text-white">
                          <DialogHeader>
                            <DialogTitle>Support {campaign.title}</DialogTitle>
                            <DialogDescription className="text-slate-300">
                              Help bring this project to life with your
                              contribution
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="amount">
                                Donation Amount (ETH)
                              </Label>
                              <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="0.1"
                                value={donationAmount}
                                onChange={(e) =>
                                  setDonationAmount(e.target.value)
                                }
                                className="bg-slate-700 border-slate-600 text-white"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={()=>{
                                  handleDonate(campaign.id, donationAmount);
                                }}
                                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                                disabled={!donationAmount}
                              >
                                {!isConnected ? (
                                  <>
                                    <Wallet className="w-4 h-4 mr-2" />
                                    Connect & Donate
                                  </>
                                ) : (
                                  `Donate ${donationAmount || "0"} ETH`
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="icon"
                        className="border-slate-600 text-slate-400 hover:text-white hover:border-slate-500"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
