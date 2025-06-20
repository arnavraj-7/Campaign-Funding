"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu,  X, Zap } from "lucide-react";
import { useContractStore } from "@/stores/contractsStore"
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connectWallet,isConnected } = useContractStore();
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

   const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "features" },
    { name: "Education", href: "education" },
    { name: "About", href: "footer" },
    { name: "Contact", href: "mailto:arnavrajcodes@gmail.com" },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CrowdSpark</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
              variant={"link"}
                key={item.name}
                onClick={() => {
                  if(item.href=="/") router.push(`${item.href}`); scrollToTop();
                  if(item.name=="Contact") router.push(`${item.href}`);
                  router.push(`/`); scrollToSection(item.href)}}
                className="text-slate-300 hover:text-purple-400 transition-colors duration-200 font-medium my-0 mx-2"
              >
                {item.name}
              </Button>
            ))}
            <Button 
              size="sm"
              className={`${isConnected?"bg-gradient-to-r from-green-700 to-green-800 hover-from-green-800 hover-to-green-900 ":"bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"}`}
              onClick={connectWallet}
            >
              
              {isConnected? "Connected" :"Connect Wallet"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-slate-300 hover:text-purple-400 hover:bg-slate-800 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;