"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
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
import {motion} from "framer-motion"
import {
  ArrowLeft,
  Clock,
  Wallet,
  Users,
  Share2,
} from "lucide-react";
import { useContractStore } from "@/stores/contractsStore";
import type { ProcessedCampaign } from "@/types/index.ts";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const tagIcons: Record<string, string> = {
  "Technology": "💻",
  "Environment": "🌱",
  "Education": "📚",
  "Health": "🏥",
  "Art": "🎨",
  "Arts & Culture": "🎨",
  "Startups / Business": "🚀",
  "Child Welfare": "👶",
  "Disaster Relief / Emergency": "🆘",
  "Scientific Research": "🔬",
  "Women Empowerment / Social Justice": "⚖️",
};

const CampaignDetail = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const campaignId = params?.campaign;
  const { allCampaigns, isfetching, isConnected, connectWallet, donate, getAllCampaigns } = useContractStore();
  const [currentCampaign, setCurrent] = useState<ProcessedCampaign | null>(null);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    if (allCampaigns === null) return;
    const isCurrent = allCampaigns.find((camp: ProcessedCampaign) => camp.id === Number(campaignId));
    if (!isCurrent) return;
    setCurrent(isCurrent);
    console.log(isCurrent.donators);
  }, [allCampaigns, campaignId]);

    // useEffect(() => {
    //     const handleDonations = async (
    //   campaignId: number,
    //   campaignTitle: string,
    //   donor: string,
    //   donationAmount: bigint
    // ) => {
    //   console.log("Donation made");
    //   toast.success(
    //     `Donation of ${ethers.formatEther(
    //       donationAmount
    //     )} ETH made successfully to ${campaignTitle}`,
    //     { duration: 5000 }
    //   );
    //   getAllCampaigns();
    // };
    //   if (!contract) return;
    //   setCurrentContract(contract);
    // ;
    //   contract.on("DonationMade", handleDonations);
    //   return () => {
    //     if (currentContract) {
    //       console.log("Removing event listener");
    //       currentContract.off("DonationMade", handleDonations);
    //     }
    //   };
    // }, [ currentContract, getAllCampaigns]);
  

  const formatDeadline = (deadlineDate: Date) => {
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Ended";
    if (diffDays === 0) return "Ends today";
    return `${diffDays} days left`;
  };

  const getProgressPercentage = (donated: string, target: string) => {
    return ((parseFloat(donated) / parseFloat(target)) * 100);
  };

  const getTagColor = (tag?: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Environment: "bg-green-500/20 text-green-400 border-green-500/30",
      Education: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Health: "bg-red-500/20 text-red-400 border-red-500/30",
      "Arts & Culture": "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "Startups / Business": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    };
    return colors[tag || ""] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const handleDonate = async () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    if (!currentCampaign || !donationAmount) return;
      setIsLoading(true);
    try {
      await donate(Number(currentCampaign.id), donationAmount);
      toast.success(`Donation of ${donationAmount} ETH made successfully!`);
      setDonationAmount("");
      getAllCampaigns();
      //eslint-disable-next-line
    } catch (error : any) {
      toast.error("Donation failed. Please try again:.",error.message);
    }
  };

  if (isfetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-inter">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!currentCampaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Campaign Not Found</h2>
            <Button onClick={() => router.push("/campaigns")} className="bg-purple-600 hover:bg-purple-700">
              Back to Campaigns
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = getProgressPercentage(currentCampaign.amountCollected, currentCampaign.target);
  const isEnded = new Date(currentCampaign.deadlineDate) < new Date();

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-inter">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
 <motion.div
     initial={ { opacity: 0, y: 40, scale: 0.98, }}
          animate={{ opacity: 1, y: 0, scale: 1,  }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          exit={ { opacity: 0, y: -30, scale: 0.95, }}
    >
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/campaigns")}
              className="text-slate-400 hover:text-white hover:bg-purple-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:bg-purple-500 hover:text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campaign Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Image and Basic Info */}
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 overflow-hidden rounded-2xl">
              <div className="relative h-96">
                <Image
                  fill={true}
                  src={currentCampaign.imageUrl}
                  alt={currentCampaign.title}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4 mb-4">
                    {currentCampaign.tag && (
                      <Badge className={`${getTagColor(currentCampaign.tag)} font-medium border backdrop-blur-sm px-3 py-1`}>
                        <span className="mr-2">{tagIcons[currentCampaign.tag] || "📁"}</span>
                        {currentCampaign.tag}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2 font-playfair">{currentCampaign.title}</h1>
                  <p className="text-slate-300 text-lg">by {currentCampaign.owner}</p>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white font-playfair text-2xl">About This Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed text-lg font-inter">
                  {currentCampaign.description || "No description provided for this campaign."}
                </p>
                
                {/* Metadata */}
                <div className="mt-6 p-4 bg-slate-900/30 rounded-lg">
                  <p className="text-sm text-slate-400 mb-2">Campaign Metadata (IPFS):</p>
                  <Link
                    href={currentCampaign.metadata}
                    target="_blank"
                    className="text-purple-400 hover:text-purple-300 underline break-all font-mono text-sm"
                  >
                    {currentCampaign.metadata}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 rounded-2xl">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2 font-playfair">
                    {currentCampaign.amountCollected} ETH
                  </div>
                  <div className="text-slate-400 font-inter">
                    raised of {currentCampaign.target} ETH goal
                  </div>
                </div>

                <Progress value={progress} className="h-4 bg-slate-700/50 rounded-full" />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white font-playfair">{progress.toFixed(1)}%</div>
                    <div className="text-slate-400 text-sm font-inter">Funded</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white font-playfair">{currentCampaign.donators.length}</div>
                    <div className="text-slate-400 text-sm font-inter">Backers</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className={`font-medium font-inter ${isEnded ? "text-red-400" : "text-emerald-400"}`}>
                    {formatDeadline(new Date(currentCampaign.deadlineDate))}
                  </span>
                </div>

                {/* Donate Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full py-4 text-lg rounded-xl transition-all duration-300 font-inter font-semibold cursor-pointer ${
                        isEnded
                          ? "bg-slate-600 hover:bg-slate-700 text-slate-300"
                          : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25"
                      }`}
                      disabled={isEnded || isLoading}
                    >
                      {isEnded ? "Campaign Ended" : "Support This Project"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700 text-white rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="font-playfair text-2xl">Support {currentCampaign.title}</DialogTitle>
                      <DialogDescription className="text-slate-300 font-inter">
                        Help bring this project to life with your contribution
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <div className="space-y-3">
                        <Label htmlFor="amount" className="text-white font-medium font-inter">
                          Donation Amount (ETH)
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          placeholder="0.1"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-white font-inter rounded-xl py-3"
                        />
                      </div>
                      <Button
                        onClick={handleDonate}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-4 text-lg font-semibold rounded-xl transition-all duration-300 font-inter cursor-pointer"
                        disabled={!donationAmount || isLoading}
                      >
                        {!isConnected ? (
                          <>
                            <Wallet className="w-5 h-5 mr-2" />
                            Connect & Donate
                          </>
                        ) : (
                          `Donate ${donationAmount || "0"} ETH`
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Donators List */}
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/50 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white font-playfair text-xl flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Supporters ({currentCampaign.donators.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentCampaign.donators.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 font-inter">No supporters yet. Be the first to support this campaign!</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {currentCampaign.donators.map((donator, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {donator.slice(2, 4).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-mono text-sm">
                            {donator.slice(0, 6)}...{donator.slice(-4)}
                          </p>
                          <p className="text-slate-400 text-xs">Supporter #{index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default CampaignDetail;
