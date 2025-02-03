import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import WalletPanel from './WalletPanel';

const CollapsibleWalletPanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div 
      className={`relative flex h-screen bg-[#121417] transition-all duration-300 ease-in-out border-r border-white/5 ${
        isExpanded ? 'w-80' : 'w-16'
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-8 z-10 flex h-8 w-8 items-center justify-center border-[1px] border-white/5 rounded-full bg-[#121417] text-white hover:bg-[#1a1d21] transition-colors duration-200"
        aria-label={isExpanded ? 'Collapse wallet panel' : 'Expand wallet panel'}
      >
        {isExpanded ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </button>

      {/* Wallet Panel Content */}
      <div 
      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
        isExpanded 
          ? 'opacity-100 visible transform translate-x-0' 
          : 'opacity-0 invisible transform -translate-x-full'
      }`}
      >
        {/* <WalletPanel walletAddress=''/> */}
      </div>

      {/* Collapsed State Content */}
      {!isExpanded && (
        <div className="flex h-full w-full flex-col items-center p-4 text-white">
          {/* Add minimal wallet info for collapsed state */}
          {/* <img src="/logo.png" alt="Wallet" className="h-8 w-8 rounded-full" /> */}
        </div>
      )}
    </div>
  );
};

export default CollapsibleWalletPanel;