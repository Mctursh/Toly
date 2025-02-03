import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaClipboard, FaTimes } from 'react-icons/fa';
import LoadingOrNotFound from '../Chat/LoadingOrNotFound';
import { toast } from '@/hooks/useToast';

interface GenerateWalletProps {
    isLoading: boolean
    error: string,
    privateKey: string
    isOpen: boolean;
    onClose: () => void;
    onClickHandler: (promptText: string) => void;
  }

const AccessCodeModal: React.FC<GenerateWalletProps> = ({ 
    isOpen,
    onClose,
    onClickHandler,
    isLoading,
    error,
    privateKey
}) => {
  
    if (!isOpen) return null;

    const copyPrivateKey = () => {
        navigator.clipboard.writeText(privateKey)
        .then(() => {
            toast.success("Copied")
        })
        .catch(() => {
            toast.error("Failed to copy address")
        });
    }
  
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
          className="relative w-[32%] max-w-2xl bg-[#121417] rounded-2xl shadow-xl overflow-hidden max-h-[80vh] flex flex-col"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-baseline">
            <div>
                <h1 className="text-2xl font-bold text-white">Wallet Details </h1>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
  
          <div className="p-6 border-b border-white/10">
            {
                isLoading ?
                (
                    <LoadingOrNotFound loading={true} text='' />
                ): 
                (
                    error ? 
                    (
                        <div className="p-3 mb-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                            Failed to generate you wallet.
                        </div>
                    )
                    : 
                    (
                        <div className="w-full">
                            <div className="p-3 mb-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
                                Please Note you would not be able to see this Private key after you close this modal, save it somewhere safe
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className='flex flex-col gap-y-4'>
                                    <h3 className="font-medium">Private key</h3>
                                    <p className="text-sm text-gray-400 text__word-wrap">{privateKey}</p>
                                    <button onClick={copyPrivateKey} className="flex items-center justify-center gap-x-4 px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors w-full md:w-auto text-center">
                                        <span>Copy to clipboard</span>
                                        <FaClipboard className='text-gray-400' />
                                    </button> 
                                </div>
                            </div>
                        </div>
                    )
                )

            }
            
          </div>
  
          {!isLoading && !error && <div className="flex-1 overflow-y-auto p-6">
            <button
                type="button"
                onClick={onClose}
                className="w-full bg-[#6FCB71] text-black font-bold py-3 rounded-lg"
            >
                I have saved it
            </button>
          </div>}
        </motion.div>
      </div>
    );
  };


export default AccessCodeModal