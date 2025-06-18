"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "./globals.css";
import { useContractStore } from "@/stores/contractsStore";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
const {isConnected, connectWallet} = useContractStore();
  

  useEffect(() => {
    // runs only once on initial mount (and on any full-page reload)
    if (!isConnected) {
      async function autoconnect(){

        await connectWallet();
      }
      autoconnect();
    }
  }, [isConnected, connectWallet]);
  
  return (
    <html lang="en">
      <body>
        
        <Navbar/>
        {children}
        <Footer/>

        </body>
    </html>
  )
}
