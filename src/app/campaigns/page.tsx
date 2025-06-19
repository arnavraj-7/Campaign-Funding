"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  Target,
  Clock,
  ArrowLeft,
  Share2,
  Plus,
  Wallet,
  Info,
} from "lucide-react";
import { useContractStore } from "@/stores/contractsStore";
import type { ProcessedCampaign } from "@/types/index.ts";
import Link from "next/link";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const router = useRouter();
  const {
    getAllCampaigns,
    isConnected,
    connectWallet,
    donate,
    allCampaigns,
    contract,
    isfetching,
  } = useContractStore();
  const [selectedCampaign, setSelectedCampaign] =
    useState<ProcessedCampaign | null>(null);
  const [currentContract, setCurrentContract] =
    useState<ethers.Contract | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const handleDonations = async (
    campaignId: number,
    campaignTitle: string,
    donor: string,
    donationAmount: bigint
  ) => {
    toast.success(
      `Donation of ${ethers.formatEther(
        donationAmount
      )} ETH made successfully to ${campaignTitle}`,
      { duration: 5000 }
    );
    getAllCampaigns();
  };
  useEffect(() => {
    if (!contract) return;
    setCurrentContract(contract);
    contract.on("DonationMade", handleDonations);
    return () => {
      if (currentContract) {
        currentContract.off("DonationMade", handleDonations);
      }
    };
  }, [contract]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!isConnected) return;
      try {
        await getAllCampaigns();
        console.log("allCampaigns", allCampaigns);
        if (allCampaigns) {
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
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
    return (parseFloat(donated) / parseFloat(target)) * 100;
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

  const handleDonate = async (id: number, amount: string) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    await donate(Number(id), amount);
    console.log(
      `Donating ${donationAmount} ETH to campaign ${selectedCampaign?.id}`
    );
    setDonationAmount("");
    setSelectedCampaign(null);
  };

  if (isfetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-inter">Loading campaigns...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-inter">
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
              onClick={() => router.push("/")}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            <Button
              onClick={() => router.push("/create-campaign")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-playfair">
              Active Campaigns
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-inter">
              Discover innovative projects and help bring them to life
            </p>

            {/* ... keep existing code (stats section) */}
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {allCampaigns?.length === 0 ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <Target className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-playfair">
                No Campaigns Yet
              </h3>
              <p className="text-slate-400 mb-6">
                Be the first to create a campaign and start raising funds!
              </p>
              <Button
                onClick={() => router.push("/create-campaign")}
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

              return (
                <Card
                  key={index}
                  className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/70 transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/10 group overflow-hidden rounded-2xl"
                >
                  {/* Campaign Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      fill={true}
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      className="absolute h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                    <div className="absolute top-4 left-4">
                      {campaign.tag && (
                        <Badge
                          className={`${gettagColor(
                            campaign.tag
                          )} font-medium border backdrop-blur-sm px-3 py-1 text-xs font-inter`}
                        >
                          <span className="mr-2 text-sm">
                            {tagIcons[campaign.tag] || "📁"}
                          </span>
                          {campaign.tag}
                        </Badge>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 hover:scale-110 transition-all duration-300"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 font-playfair">
                        {campaign.title}
                      </h3>
                      <p className="text-slate-300 text-sm font-inter">
                        by {campaign.owner}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-5">
                    {/* Description */}
                    {campaign.description && (
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed font-inter">
                        {campaign.description}
                      </p>
                    )}

                    {/* Progress */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white font-playfair">
                          {campaign.amountCollected || 0} ETH
                        </span>
                        <span className="text-slate-400 font-inter">
                          of {campaign.target} ETH
                        </span>
                      </div>

                      <Progress
                        value={progress}
                        className="h-3 bg-slate-700/50 rounded-full"
                      />

                      <div className="flex justify-between text-sm text-slate-400 font-inter">
                        <span className="font-medium">
                          {progress.toFixed(1)}% funded
                        </span>
                        <span>
                          {Math.floor(Math.random() * 50 + 10)} backers
                        </span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span
                        className={`font-medium font-inter ${
                          isEnded ? "text-red-400" : "text-emerald-400"
                        }`}
                      >
                        {formatDeadline(new Date(campaign.deadlineDate))}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-slate-500 font-mono bg-slate-900/30 p-2 rounded-lg">
                      <span className="text-slate-400">IPFS: </span>
                      <Link
                        className="underline hover:text-slate-300 transition-colors"
                        href={campaign.metadata}
                        target="_blank"
                      >
                        {campaign.metadata.slice(0, 25)}...
                      </Link>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 flex justify-between gap-x-5">
                      <Link href={`/campaigns/${campaign.id}`}>
                        <Button className="w-full py-4 text-lg rounded-xl transition-all duration-300 font-inter font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25">
                          <Info className="w-5 h-5 mr-2" />
                          Donate and View Campaign Details
                        </Button>
                      </Link>
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
