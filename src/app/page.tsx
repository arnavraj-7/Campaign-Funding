"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Zap, Shield, Clock, TrendingUp, Users, Coins, BookOpen } from "lucide-react";
import "./globals.css";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 transition-colors">
              🚀 Powered by Blockchain Technology
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ignite Your Dreams
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary crowdfunding platform built on Ethereum. Create campaigns, raise funds, and bring your innovative ideas to life with complete transparency and security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('features')}
                className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 hover:text-white hover:border-slate-500 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Learn More
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-purple-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to launch successful crowdfunding campaigns
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Create Campaigns</CardTitle>
                <CardDescription className="text-slate-300">
                  Launch your crowdfunding campaign in minutes with our intuitive interface
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Smart Donations</CardTitle>
                <CardDescription className="text-slate-300">
                  Secure, transparent donations powered by smart contracts
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Deadline Management</CardTitle>
                <CardDescription className="text-slate-300">
                  Automated deadline tracking with built-in refund mechanisms
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Blockchain Security</CardTitle>
                <CardDescription className="text-slate-300">
                  Immutable records and transparent fund management on Ethereum
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">ETH Payments</CardTitle>
                <CardDescription className="text-slate-300">
                  Native Ethereum payments with low fees and fast transactions
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Learn & Grow</CardTitle>
                <CardDescription className="text-slate-300">
                  Educational resources about blockchain and crowdfunding
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Learn About Blockchain Crowdfunding
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Understanding the technology that powers the future of fundraising
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4">What is Blockchain Crowdfunding?</h3>
                <p className="text-slate-300 leading-relaxed">
                  Blockchain crowdfunding leverages smart contracts to create transparent, secure, and automated fundraising campaigns. Unlike traditional platforms, funds are held in escrow and released based on predefined conditions.
                </p>
              </div>
              
              <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4">Why Ethereum?</h3>
                <p className="text-slate-300 leading-relaxed">
                  Ethereum's smart contract capabilities enable programmable money, allowing for complex funding rules, automatic refunds, and transparent fund management without intermediaries.
                </p>
              </div>
              
              <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                <h3 className="text-2xl font-bold text-white mb-4">Benefits for Creators</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Lower fees compared to traditional platforms</li>
                  <li>• Global reach without geographic restrictions</li>
                  <li>• Transparent fund tracking and management</li>
                  <li>• Automated refunds if goals aren't met</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-8 rounded-2xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="text-white font-semibold">Create Campaign</h4>
                    <p className="text-slate-300 text-sm">Set your funding goal, deadline, and campaign details</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="text-white font-semibold">Deploy Smart Contract</h4>
                    <p className="text-slate-300 text-sm">Your campaign is secured by blockchain technology</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="text-white font-semibold">Receive Donations</h4>
                    <p className="text-slate-300 text-sm">Backers contribute ETH to your campaign</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h4 className="text-white font-semibold">Automatic Execution</h4>
                    <p className="text-slate-300 text-sm">Funds released when goals are met, or refunded if not</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Launch Your Campaign?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who have successfully funded their projects with our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Your Campaign
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 hover:text-white hover:border-slate-500 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              View Examples
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;