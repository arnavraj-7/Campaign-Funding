"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  ArrowLeft,
  Heart,
  Share2
} from "lucide-react";
import  Link  from "next/link";
import { useContractStore } from "@/stores/contractsStore";

// Mock type - replace with your actual type
interface Campaign {
  id: string;
  title: string;
  description?: string;
  target: string;
  donated: string;
  deadline: string;
  owner?: string;
  category?: string;
}

// Mock store
// const useContractStore = () => ({
//   getAllCampaigns: async (): Promise<Campaign[]> => {
//     // Mock data
//     return [
//       {
//         id: "1",
//         title: "Revolutionary AI Assistant for Students",
//         description: "Building an AI-powered learning companion that helps students understand complex topics through personalized explanations.",
//         target: "50",
//         donated: "32.5",
//         deadline: "2024-08-15T18:00:00",
//         owner: "0x1234...5678",
//         category: "Technology"
//       },
//       {
//         id: "2", 
//         title: "Sustainable Urban Farming Initiative",
//         description: "Creating vertical farms in urban areas to provide fresh, local produce while reducing environmental impact.",
//         target: "25",
//         donated: "18.7",
//         deadline: "2024-07-30T12:00:00",
//         owner: "0xabcd...efgh",
//         category: "Environment"
//       },
//       {
//         id: "3",
//         title: "Open Source Education Platform",
//         description: "Developing a free, accessible education platform for underserved communities worldwide.",
//         target: "75",
//         donated: "12.3",
//         deadline: "2024-09-01T23:59:59",
//         owner: "0x9876...4321",
//         category: "Education"
//       }
//     ];
//   }
// });

const Campaigns = () => {
  const { getAllCampaigns,contract } = useContractStore();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const allCampaigns = await getAllCampaigns();
        console.log(allCampaigns);
        setCampaigns(allCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Ended";
    if (diffDays === 0) return "Ends today";
    return `${diffDays} days left`;
  };

  const getProgressPercentage = (donated: string, target: string) => {
    return Math.min((parseFloat(donated) / parseFloat(target)) * 100, 100);
  };
  
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Environment: "bg-green-500/20 text-green-400 border-green-500/30",
      Education: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Health: "bg-red-500/20 text-red-400 border-red-500/30",
      Art: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    };
    return colors[category || ""] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bol mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Active Campaigns
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover innovative projects and help bring them to life
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>{campaigns.length} Active Projects</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span>
                  {campaigns.reduce((acc, campaign) => acc + parseFloat(campaign.donated), 0).toFixed(1)} ETH Raised
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {campaigns.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Campaigns Yet</h3>
              <p className="text-gray-400 mb-6">Be the first to create a campaign and start raising funds!</p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Create Campaign
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => {
              const progress = getProgressPercentage(campaign.donated, campaign.target);
              const isEnded = new Date(campaign.deadline) < new Date();
              
              return (
                <Card 
                  key={campaign.id} 
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      {campaign.category && (
                        <Badge className={`${getCategoryColor(campaign.category)} font-medium`}>
                          {campaign.category}
                        </Badge>
                      )}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400 p-2">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-400 p-2">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardTitle className="text-white text-xl line-clamp-2 mb-2">
                      {campaign.title}
                    </CardTitle>
                    
                    {campaign.description && (
                      <CardDescription className="text-gray-400 line-clamp-3">
                        {campaign.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-white">
                          {campaign.donated} ETH
                        </span>
                        <span className="text-gray-400">
                          of {campaign.target} ETH
                        </span>
                      </div>
                      
                      <Progress 
                        value={progress} 
                        className="h-2 bg-gray-800"
                      />
                      
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{progress.toFixed(1)}% funded</span>
                        <span>{Math.floor(Math.random() * 50 + 10)} backers</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className={`font-medium ${isEnded ? 'text-red-400' : 'text-blue-400'}`}>
                        {formatDeadline(campaign.deadline)}
                      </span>
                    </div>

                    {/* Owner */}
                    {campaign.owner && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span className="font-mono">
                          {campaign.owner}
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button 
                      className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${
                        isEnded 
                          ? 'bg-gray-600 hover:bg-gray-700 text-gray-300' 
                          : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white transform hover:scale-[1.02]'
                      }`}
                      disabled={isEnded}
                    >
                      {isEnded ? 'Campaign Ended' : 'Support This Project'}
                    </Button>
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
