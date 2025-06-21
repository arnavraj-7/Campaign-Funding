"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Clock,
  ArrowLeft,
  Plus,
  Info,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useContractStore } from "@/stores/contractsStore";
import type { ProcessedCampaign } from "@/types/index.ts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {motion} from "framer-motion"

const tagIcons: Record<string, string> = {
  Technology: "💻",
  Environment: "🌱",
  Education: "📚",
  "Medical / Health": "🏥",
  "Arts & Culture": "🎨",
  "Startups / Business": "🚀",
  "Child Welfare": "👶",
  "Disaster Relief / Emergency": "🆘",
  "Scientific Research": "🔬",
  "Women Empowerment / Social Justice": "⚖️",
};

const Campaigns = () => {
  const router = useRouter();
  const [tag, setTag] = useState<string>("All");
  const {isLoading,
    connectWallet,
    getAllCampaigns,
    isConnected,
    allCampaigns,
    isfetching,
    sortedCampaigns,
  } = useContractStore();
  const [taggedCampaigns, setTaggedCampaigns] = useState<ProcessedCampaign[]>([]);




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
  }, [isConnected, getAllCampaigns,]);

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

  // useEffect(() => {
  //   console.log("called useEffect");
  //   console.log("taggedCampaigns", taggedCampaigns);
  // }, [taggedCampaigns]);

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
      
      {!isConnected &&(
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
                )}

      {/* Header */}
      <motion.div
      
       initial={ { opacity: 0, y: 40, scale: 0.98, }}
          animate={{ opacity: 1, y: 0, scale: 1,  }}
          transition={{ duration: 0.8, ease: ["easeInOut"] }}
          exit={ { opacity: 0, y: -30, scale: 0.95, }}
          
      >

     
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-slate-400 hover:text-white hover:bg-transparent cursor-pointer hover:underline"
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

          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-playfair">
              Active Campaigns
            </h1>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto font-inter">
              Discover innovative projects and help bring them to life
            </p>

            {/* Stats Section */}
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white font-playfair">
                      {allCampaigns?.length || 0}
                    </p>
                    <p className="text-sm text-slate-400 font-inter">Active Campaigns</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white font-playfair">
                      {tag === "All" ? allCampaigns?.length || 0 : taggedCampaigns?.length || 0}
                    </p>
                    <p className="text-sm text-slate-400 font-inter">
                      {tag === "All" ? "Total Projects" : `${tag} Projects`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2">
                <select 
                  className="bg-transparent text-white font-inter text-sm px-4 py-2 rounded-lg border-none outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer min-w-[200px]" 
                  name="tag" 
                  defaultValue={"All"} 
                  onChange={(e) => {
                    console.log(e.target.value, sortedCampaigns[e.target.value]);
                    setTaggedCampaigns(sortedCampaigns[e.target.value]);
                    setTag(e.target.value);
                  }}
                >
                  <option value="All" className="bg-slate-800 text-white">🌟 All Categories</option>
                  {Object.keys(tagIcons).map((tag) => (
                    <option key={tag} value={tag} className="bg-slate-800 text-white">
                      {tagIcons[tag]} {tag}
                    </option>
                  ))}
                </select>
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
        ) : tag !== "All" && (!taggedCampaigns || taggedCampaigns.length === 0) ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">{tagIcons[tag] || "📁"}</div>
              <h3 className="text-xl font-semibold text-white mb-2 font-playfair">
                No {tag} Campaigns
              </h3>
              <p className="text-slate-400 mb-6">
                There are currently no campaigns in the {tag} category. Be the first to create one!
              </p>
              <Button
                onClick={() => router.push("/create-campaign")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Create {tag} Campaign
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(tag === "All" ? allCampaigns : taggedCampaigns)?.map((campaign: ProcessedCampaign, index) => {
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
                  {/* Campaign Image Section */}
                  <div className="relative h-64 overflow-hidden rounded-t-2xl group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      {campaign.tag && (
                        <Badge
                          className={`${gettagColor(
                            campaign.tag
                          )} font-medium border backdrop-blur-sm px-3 py-1`}
                        >
                          <span className="mr-2">{tagIcons[campaign.tag] || "📁"}</span>
                          {campaign.tag}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-5">
                    {/* Description */}
                    <h3 className="text-xl font-semibold text-white font-playfair line-clamp-1">
                      {campaign.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">
                      {campaign.description}
                    </p>

                    {/* Progress Bar */}
                    <Progress value={progress} className="h-3 rounded-full bg-slate-700/50" />
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{progress.toFixed(1)}% Funded</span>
                      <span>{campaign.amountCollected} ETH</span>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className={`font-medium ${isEnded ? "text-red-400" : "text-emerald-400"}`}>
                        {formatDeadline(new Date(campaign.deadlineDate))}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>
                        <Target className="w-4 h-4 inline-block mr-1 align-middle" />
                        {campaign.target} ETH Goal
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link href={`/campaigns/${campaign.id}`}>
                        <Button
                          className="w-full py-4 text-lg rounded-xl transition-all duration-300 font-inter font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 cursor-pointer"
                        >
                          <Info className="w-5 h-5 mr-2" />
                          View Campaign Details
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
    </motion.div>
    </div>
  );
};

export default Campaigns;