import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AutomationAction {
  id: string;
  title: string;
  description: string;
  type: 'swap' | 'launch' | 'buy' | 'sell' | 'liquidity' | 'limit';
  platform: string;
}

const Automations = () => {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentAction, setCurrentAction] = useState<AutomationAction | null>(null);

  const automations: AutomationAction[] = [
    {
      id: 'jupiter-swap',
      title: 'Jupiter Swap',
      description: 'Swap tokens using Jupiter aggregator for best rates',
      type: 'swap',
      platform: 'Jupiter'
    },
    {
      id: 'pump-launch',
      title: 'Launch on Pump',
      description: 'Launch your token on Pump with custom parameters',
      type: 'launch',
      platform: 'Pump'
    },
    {
      id: 'pump-buy',
      title: 'Buy on Pump',
      description: 'Automatically buy tokens on Pump when conditions are met',
      type: 'buy',
      platform: 'Pump'
    },
    {
      id: 'pump-sell',
      title: 'Sell on Pump',
      description: 'Automatically sell tokens on Pump when conditions are met',
      type: 'sell',
      platform: 'Pump'
    },
    {
      id: 'dlmm-add',
      title: 'Add Liquidity (DLMM)',
      description: 'Add liquidity to DLMM pools',
      type: 'liquidity',
      platform: 'DLMM'
    },
    {
      id: 'dlmm-remove',
      title: 'Remove Liquidity (DLMM)',
      description: 'Remove liquidity from DLMM pools',
      type: 'liquidity',
      platform: 'DLMM'
    },
    {
      id: 'limit-order',
      title: 'Limit Order',
      description: 'Place limit orders for token swaps',
      type: 'limit',
      platform: 'Jupiter'
    }
  ];

  const handleActionClick = (automation: AutomationAction) => {
    setCurrentAction(automation);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Handle the automation action here
    setShowConfirmation(false);
    setCurrentAction(null);
  };

  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Automations</h1>
        </div>

        {/* Info Alert */}
        <div className="mb-8 p-4 rounded-lg border border-[#6FCB71]/20 bg-[#121417]">
          <h2 className="text-base font-medium text-white mb-1">Automated Trading Actions</h2>
          <p className="text-sm text-gray-400">
            Set up automated trading actions for various platforms. Always verify the parameters before confirming any action.
          </p>
        </div>
        
        <div className="space-y-4">
          {automations.map((automation) => (
            <div 
              key={automation.id}
              className="border border-white/5 rounded-lg overflow-hidden bg-[#121417] transition-all duration-200 hover:border-[#6FCB71]/20"
            >
              <button
                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 transition-colors"
                onClick={() => setSelectedAutomation(selectedAutomation === automation.id ? null : automation.id)}
              >
                <div>
                  <h3 className="text-sm md:text-base font-medium">{automation.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">Platform: {automation.platform}</p>
                </div>
                <ChevronDown 
                  className={`flex-shrink-0 transition-transform duration-200 text-[#6FCB71] ${
                    selectedAutomation === automation.id ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              
              {selectedAutomation === automation.id && (
                <div className="p-4 md:p-6 bg-white/5 border-t border-white/5">
                  <p className="text-sm md:text-base text-gray-300 mb-4">
                    {automation.description}
                  </p>
                  <button
                    onClick={() => handleActionClick(automation)}
                    className="px-4 py-2 bg-[#6FCB71] text-black rounded-lg text-sm hover:bg-[#7fdb85] transition-colors"
                  >
                    Configure Action
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && currentAction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#121417] rounded-xl p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
              <p className="text-gray-400 mb-6">
                Are you sure you want to take this action? This will execute {currentAction.title.toLowerCase()}.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setCurrentAction(null);
                  }}
                  className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-[#6FCB71] text-black rounded-lg hover:bg-[#7fdb85] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-8">
          Information provided by Toly is not Financial Advice
        </p>
      </div>
    </div>
  );
};

export default Automations;