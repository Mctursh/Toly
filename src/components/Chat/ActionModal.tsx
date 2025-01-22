// ActionModal.tsx
"use client";

import React, { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLink, FaImage, FaCoins, FaPuzzlePiece, FaImages, FaSquare, FaTag, FaExchangeAlt } from 'react-icons/fa';

interface Prompt {
  title: string;
  description: string;
  icon: JSX.Element;
  promptText: string;
}

interface Tab {
  name: string;
  prompts: Prompt[];
}

const tabs: Tab[] = [
  {
    name: 'Create',
    prompts: [
      {
        title: 'Create a Tiplink',
        description: 'Generate a new tiplink for fast transfers',
        icon: <FaLink className="h-6 w-6" />,
        promptText: "How do I create a tiplink for sending SOL?"
      },
      {
        title: 'Create an Image',
        description: 'Generate images using DALL-E',
        icon: <FaImage className="h-6 w-6" />,
        promptText: "Can you help me create an image?"
      },
      {
        title: 'Create Token on PumpFun',
        description: 'Launch your own token using PumpPortal',
        icon: <FaCoins className="h-6 w-6" />,
        promptText: "Can you create a token on PumpFun?"
      }
    ]
  },
  {
    name: 'Deploy',
    prompts: [
      {
        title: 'Deploy Metaplex Fungible Token',
        description: 'Create and deploy fungible tokens',
        icon: <FaPuzzlePiece className="h-6 w-6" />,
        promptText: "How can you help me deploy a Metaplex fungible token?"
      },
      {
        title: 'Deploy Collection',
        description: 'Create and deploy an NFT collection',
        icon: <FaImages className="h-6 w-6" />,
        promptText: "Please I want to deploy an NFT collection"
      },
      {
        title: 'Deploy Metaplex Core NFT',
        description: 'Create and deploy individual NFTs',
        icon: <FaSquare className="h-6 w-6" />,
        promptText: "I want to deploy an NFT, Can you do that?"
      },
      {
        title: 'List NFT for Sale',
        description: 'List your NFT on marketplaces',
        icon: <FaTag className="h-6 w-6" />,
        promptText: "Can you list my NFT for sale?"
      }
    ]
  },
  {
    name: 'Trade',
    prompts: [
      {
        title: 'Swap Tokens using Jupiter',
        description: 'Trade tokens with the best rates',
        icon: <FaExchangeAlt className="h-6 w-6" />,
        promptText: "Can you help me swap tokens using Jupiter?"
      }
    ]
  }
];

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: string;
  onPromptSelect: (promptText: string) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTab,
  onPromptSelect
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handlePromptClick = (promptText: string) => {
    onPromptSelect(promptText);
    onClose();
  };

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
        className="relative w-full max-w-2xl bg-[#121417] rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes className="h-6 w-6" />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors
                ${activeTab === tab.name 
                  ? 'text-[#6FCB71] border-b-2 border-[#6FCB71]' 
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-4">
            {tabs.find(t => t.name === activeTab)?.prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt.promptText)}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left group"
              >
                <div className="text-[#6FCB71] group-hover:text-[#61BDFF] transition-colors">
                  {prompt.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {prompt.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ActionModal;