"use client";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { sepolia, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Web3Modal } from "@web3modal/wagmi/react";

const projectId = "YOUR_PROJECT_ID";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost, sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [], // EIP-6963 or injected as you like
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      {children}
      <Web3Modal projectId={projectId} chains={chains} />
    </WagmiConfig>
  );
}
