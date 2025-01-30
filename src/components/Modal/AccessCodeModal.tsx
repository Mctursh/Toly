// "use client"

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

// interface ConfirmationModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onConfirm?: () => void;
//     message?: string;
//   }

//   const box: React.CSSProperties = {
//     width: 100,
//     height: 100,
//     backgroundColor: "#0cdcf7",
//     borderRadius: "10px",
// }

// const AccessCodeModal: React.FC<ConfirmationModalProps> = ({
//     isOpen,
//     onClose,
//     onConfirm,
//     message
// }) => {
    
//     // if (!isOpen) return null;

//     // const [code, setCode] = useState('');
//     // const [error, setError] = useState('');
//     // const [isLoading, setIsLoading] = useState(true);
//     // // const { getToken, isAuthenticated } = useAuth();
//     // const router = useRouter();
//     // const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    
    
//     //   useEffect(() => {
//     //     // checkWhitelistStatus();
//     //   }, []);
    
//     //   const checkWhitelistStatus = async () => {
//     //     try {
//     //       // const token = await getToken();
//     //       const response = await fetch(`${API_URL}/whitelist/check-status`, {
//     //         headers: {
//     //           // 'Authorization': `Bearer ${token}`
//     //         }
//     //       });
//     //       const data = await response.json();
          
//     //       if (data.isWhitelisted) {
//     //         router.push('/chat');
//     //       } else {
//     //         setIsLoading(false);
//     //       }
//     //     } catch (error) {
//     //       setIsLoading(false);
//     //       console.error('Failed to check whitelist status:', error);
//     //     }
//     //   };
    
//     //   const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     setError('');
        
//     //     try {
//     //       // const token = await getToken();
//     //       const response = await fetch(`${API_URL}/whitelist/validate-code`, {
//     //         method: 'POST',
//     //         headers: {
//     //           // 'Authorization': `Bearer ${token}`,
//     //           'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify({ code })
//     //       });
    
//     //       if (response.ok) {
//     //         router.push('/chat');
//     //       } else {
//     //         const data = await response.json();
//     //         setError(data.message || 'Invalid code');
//     //       }
//     //     } catch (error) {
//     //       setError('Failed to validate code');
//     //     }
//     //   };
    
//     //   if (isLoading) {
//     //     return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>;
//     //   }

// //   return (
// //     // <AnimatePresence initial={false}>
// //     //     {
// //     //         isOpen && 
            // <div className="min-h-screen bg-black flex items-center justify-center">
            //     <div className="max-w-md w-full p-6">
            //     <h1 className="text-2xl font-bold text-white mb-6">Enter Access Code</h1>
            //     <form onSubmit={handleSubmit}>
            //         <input
            //         type="text"
            //         value={code}
            //         onChange={(e) => setCode(e.target.value)}
            //         className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4"
            //         placeholder="Enter your access code"
            //         />
            //         {error && <p className="text-red-500 mb-4">{error}</p>}
            //         <button
            //         type="submit"
            //         className="w-full bg-[#6FCB71] text-black font-bold py-3 rounded-lg"
            //         >
            //         Submit
            //         </button>
            //     </form>
            //     </div>
            // </div>
// //     //     }
// //     // </AnimatePresence>
// //   )
// // }

// export default AccessCodeModal
interface AccessCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClickHandler: (promptText: string) => void;
  }

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ isOpen, onClose, onClickHandler }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    // const filteredPrompts = useMemo(() => {
    //   const query = searchQuery.toLowerCase();
    //   return allPrompts.filter(prompt => 
    //     prompt.title.toLowerCase().includes(query) ||
    //     prompt.description.toLowerCase().includes(query) ||
    //     prompt.category.toLowerCase().includes(query)
    //   );
    // }, [searchQuery]);
  
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
          className="relative w-[23%] max-w-2xl bg-[#121417] rounded-2xl shadow-xl overflow-hidden max-h-[80vh] flex flex-col"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-baseline">
            <div>
            <h1 className="text-2xl font-bold text-white mb-6">Enter Access Code</h1>
              {/* <h2 className="text-xl font-semibold text-white mb-1">Explore Toly</h2>
              <p className="text-sm text-gray-400">Discover everything you can do with Toly</p> */}
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
              {/* <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> */}
              <input
                type="text"
                placeholder="Enter Access Code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 rounded-xl py-3 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6FCB71]/50"
              />
            </div>
          </div>
  
          <div className="flex-1 overflow-y-auto p-6">
          <button
            type="button"
            onClick={() => onClickHandler(searchQuery)}
            className="w-full bg-[#6FCB71] text-black font-bold py-3 rounded-lg"
          >
            Submit
          </button>
          {/* <div className="animate-spin mx-auto rounded-full h-5 w-5 border-b-2 border-[#6FCB71]"></div> */}
          </div>
        </motion.div>
      </div>
    );
  };


export default AccessCodeModal