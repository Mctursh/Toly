// ExploreModal.tsx
import React, { useState, useMemo, JSX } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaSearch } from 'react-icons/fa';

interface Prompt {
  title: string;
  description: string;
  category: string;
  promptText: string;
}

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPromptSelect: (promptText: string) => void;
}

// Parse all DAS endpoints and actions into prompts
const allPrompts: Prompt[] = [
    // Asset Related
    {
      title: "Get Asset Details",
      description: "Retrieve detailed information about a specific asset by its ID",
      category: "Assets",
      promptText: "Can you help me get detailed information about an asset using its ID?"
    },
    {
      title: "Check Wallet Assets",
      description: "View all assets owned by a specific wallet address",
      category: "Assets",
      promptText: "Show me all the assets owned by this wallet address: [wallet address]"
    },
    {
      title: "View Fungible Tokens",
      description: "See all fungible tokens in a wallet with their balances",
      category: "Assets",
      promptText: "What fungible tokens are in this wallet: [wallet address]"
    },
    {
      title: "Get Portfolio Value",
      description: "Calculate the total value of a wallet's portfolio",
      category: "Assets",
      promptText: "What's the total value of this wallet's portfolio: [wallet address]"
    },
  
    // Balance Related
    {
      title: "Check SOL Balance",
      description: "View the native SOL balance of a wallet",
      category: "Balance",
      promptText: "What's the SOL balance of this wallet: [wallet address]"
    },
    {
      title: "View Complete Balance",
      description: "See all token balances including SOL and SPL tokens",
      category: "Balance",
      promptText: "Show me all token balances for this wallet: [wallet address]"
    },
    {
      title: "Check Token Price",
      description: "Get the current market price of any token",
      category: "Balance",
      promptText: "What's the current price of this token: [token mint address]"
    },
    {
      title: "Token Balance Check",
      description: "View the balance of a specific token in a wallet",
      category: "Balance",
      promptText: "How many [token name] tokens does this wallet have: [wallet address]"
    },
  
    // Transactions
    {
      title: "Block Transactions",
      description: "View all transactions in a specific block",
      category: "Transactions",
      promptText: "Show me all transactions in block number: [block number]"
    },
    {
      title: "Raw Transaction Data",
      description: "Get detailed raw data for a specific transaction",
      category: "Transactions",
      promptText: "Can you show me the raw data for this transaction: [transaction signature]"
    },
    {
      title: "Account Transactions",
      description: "View transaction history for a specific account",
      category: "Transactions",
      promptText: "Show me the transaction history for this account: [account address]"
    },
    {
      title: "Enriched Transaction Details",
      description: "Get detailed information about a transaction with related accounts",
      category: "Transactions",
      promptText: "Can you provide enriched details for this transaction: [transaction signature]"
    },
  
    // Domain Operations
    {
      title: "Resolve Solana Domain",
      description: "Get information about a .sol domain",
      category: "Domains",
      promptText: "Can you resolve this .sol domain: [domain name]"
    },
    {
      title: "Check Domain Availability",
      description: "Check if a domain is available across all TLDs",
      category: "Domains",
      promptText: "Is this domain available: [domain name]"
    },
    {
      title: "Get Domain Owner",
      description: "Find out who owns a specific Solana domain",
      category: "Domains",
      promptText: "Who owns this Solana domain: [domain name]"
    },
  
    // Trading & DEX
    {
      title: "View Solana DEXes",
      description: "List all decentralized exchanges on Solana",
      category: "Trading",
      promptText: "Show me all available DEXes on Solana"
    },
    {
      title: "Check Token Pools",
      description: "View liquidity pools for a specific token",
      category: "Trading",
      promptText: "What liquidity pools are available for this token: [token address]"
    },
    {
      title: "View Pool Trades",
      description: "See recent trades in a specific pool",
      category: "Trading",
      promptText: "Show me recent trades in this pool: [pool address]"
    },
    {
      title: "Token Price Chart",
      description: "View historical price data for any token",
      category: "Trading",
      promptText: "Can you show me the price chart for this token: [token address]"
    },
  
    // Actions
    {
      title: "List NFT for Sale",
      description: "List an NFT on TensorSwap marketplace",
      category: "Actions",
      promptText: "Help me list this NFT for sale: [NFT mint address]"
    },
    {
      title: "Cancel NFT Listing",
      description: "Remove an NFT listing from TensorSwap",
      category: "Actions",
      promptText: "I want to cancel the listing for this NFT: [NFT mint address]"
    },
    {
      title: "Swap Tokens",
      description: "Exchange tokens using Jupiter aggregator",
      category: "Actions",
      promptText: "Help me swap [token A] for [token B] using Jupiter"
    },
    {
      title: "Transfer Tokens",
      description: "Send tokens to another wallet",
      category: "Actions",
      promptText: "Guide me through sending tokens to this address: [recipient address]"
    },
    {
      title: "Stake with Jupiter",
      description: "Stake tokens on Jupiter protocol",
      category: "Actions",
      promptText: "How do I stake tokens with Jupiter?"
    },
    {
      title: "Create Tip Link",
      description: "Generate a tip link for easy token transfers",
      category: "Actions",
      promptText: "Help me create a tip link for sending tokens"
    },
    {
      title: "Deploy Collection",
      description: "Create and deploy an NFT collection",
      category: "Actions",
      promptText: "Guide me through deploying an NFT collection"
    },
    {
      title: "Launch Token",
      description: "Create and launch a token on Pump.fun",
      category: "Actions",
      promptText: "How do I launch a new token on Pump.fun?"
    },
    {
      title: "Send Airdrop",
      description: "Send tokens to multiple recipients efficiently",
      category: "Actions",
      promptText: "Help me set up a token airdrop to multiple addresses"
    },
  
    // Network Stats
    {
      title: "Check Network TPS",
      description: "View current transactions per second on Solana",
      category: "Network",
      promptText: "What's the current TPS on Solana?"
    },
    {
      title: "Current Slot",
      description: "Get the current slot number on Solana",
      category: "Network",
      promptText: "What's the current slot number on Solana?"
    },
    {
      title: "Network Status",
      description: "Check overall Solana network performance",
      category: "Network",
      promptText: "How is the Solana network performing right now?"
    }
  ];

const ExploreModal: React.FC<ExploreModalProps> = ({ isOpen, onClose, onPromptSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPrompts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allPrompts.filter(prompt => 
      prompt.title.toLowerCase().includes(query) ||
      prompt.description.toLowerCase().includes(query) ||
      prompt.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#121417] rounded-2xl shadow-xl overflow-hidden max-h-[80vh] flex flex-col"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Explore Toly</h2>
            <p className="text-sm text-gray-400">Discover everything you can do with Toly</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 border-b border-white/10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCB71]/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {filteredPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => {
                  onPromptSelect(prompt.promptText);
                  onClose();
                }}
                className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-medium">
                    {prompt.title}
                  </h3>
                  <span className="text-xs text-[#6FCB71] px-2 py-1 rounded-full bg-[#6FCB71]/10">
                    {prompt.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  {prompt.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};


interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: JSX.Element;
}

const InfoModal: React.FC<InfoModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  description,
  icon 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#121417] rounded-2xl shadow-xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-[#6FCB71] bg-[#6FCB71]/10 p-3 rounded-xl">
              {icon}
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
          
          <p className="text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export { ExploreModal, InfoModal };