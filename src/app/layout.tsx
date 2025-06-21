"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "./globals.css";
import { useContractStore } from "@/stores/contractsStore";
import { useEffect } from "react";
import toast, {Toaster} from "react-hot-toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
const {isConnected, connectWallet} = useContractStore();
  

  useEffect(() => {
    // runs only once on initial mount (and on any full-page reload)
    async function autoconnect(){
      await connectWallet();
    }
    if (!isConnected) {
      autoconnect();
    }
      // eslint-disable-next-line
       const ethereum  = (window as any).ethereum;

    if (!ethereum) {
      console.warn("MetaMask not installed.");
      return;
    }

    const handleChainChanged = (chainId: string) => {
      console.log("Chain changed to:", chainId);
      toast.success("Network changed.");
      autoconnect(); // or you can re-run your connection logic
    };

    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (ethereum.removeListener) {
        ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [isConnected, connectWallet]);
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/lightning.png" sizes="any" />
        <title>Crowd-Spark</title>
      </head>
      <body>
        
        <Navbar/>
        {children}
        <Footer/>
<Toaster/>
        </body>
    </html>
  )
}
