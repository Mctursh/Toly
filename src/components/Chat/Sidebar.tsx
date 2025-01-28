// // components/Sidebar.tsx
// "use client";

// import React, { FC, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { usePrivy } from '@privy-io/react-auth';
// import { 
//   FaPlus, 
//   FaMagnifyingGlass,
//   FaChartLine, 
//   FaWallet, 
//   FaPaperPlane,
//   FaUserTie,
//   FaChartPie,
//   FaCircleQuestion,
//   FaX
// } from "react-icons/fa6";
// import { FaCog, FaHistory } from 'react-icons/fa';
// import type { IconType } from 'react-icons';
// import { Conversation } from '@/types/chat';
// import Http from '@/services/httpService';

// interface NavigationItem {
//   name: string;
//   icon: IconType;
//   href: string;
// }

// interface SidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
//   currentThreadId?: string;
// }

// export const Sidebar: FC<SidebarProps> = ({ 
//   isSidebarOpen, 
//   toggleSidebar,
//   currentThreadId 
// }) => {
//   const router = useRouter();
//   // const { getAccessToken } = usePrivy();
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4600';
//   // const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

//   const navigationItems: NavigationItem[] = [
//     { name: 'Explore', icon: FaMagnifyingGlass, href: '/explore' },
//     { name: 'History', icon: FaHistory, href: '/history' },
//     { name: 'Solana Analytics', icon: FaChartLine, href: '/analytics' },
//     { name: 'Wallet Audit', icon: FaWallet, href: '/audit' },
//     { name: 'Send Transactions', icon: FaPaperPlane, href: '/send' },
//     { name: 'Top Performing Traders', icon: FaUserTie, href: '/traders' },
//     { name: 'Top Performing Strategies', icon: FaChartPie, href: '/strategies' }
//   ];

//   const fetchConversations = async (page = 1, limit = 20) => {
//     try {
//       setLoading(true);
//       // const token = await getAccessToken();
      
//       const response = await fetch(
//         `${API_URL}/chat/conversations?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             // 'Authorization': `Bearer ${token}`
//           }
//         }
//       );
  
//       if (!response.ok) throw new Error('Failed to fetch conversations');
      
//       const data = await response.json();
//       setConversations(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch conversations');
//       console.error('Error fetching conversations:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createNewConversation = async () => {
//     try {
//       // const token = await getAccessToken();
      
//       const response = await Http.post(`${API_URL}/chat/conversations`,{}, {
//         headers: {
//           // 'Authorization': `Bearer ${token}`
//         }
//       });

//       // if (!response.) throw new Error('Failed to create conversation');
      
//       const newConversation = await response.data
//       setConversations(prev => [newConversation, ...prev]);
//       router.push(`/chat/${newConversation.threadId}`);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to create conversation');
//       console.error('Error creating conversation:', err);
//     }
//   };

//   const switchConversation = async (threadId: string) => {
//     try {
//       // const token = await getAccessToken();
      
//       await fetch(`${API_URL}/chat/conversations/${threadId}/switch`, {
//         method: 'POST',
//         headers: {
//           // 'Authorization': `Bearer ${token}`
//         }
//       });

//       router.push(`/chat/${threadId}`);
//     } catch (err) {
//       console.error('Error switching conversation:', err);
//     }
//   };

//   useEffect(() => {
//     // fetchConversations();
//   }, []);

//   return (
//     <div 
//       className={`fixed lg:relative w-[309px] h-screen bg-[#0B0C0F] transition-all duration-300 z-50 flex flex-col
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         border-r border-white/5`}
//     >
//       {/* Logo and New Chat Button */}
//       <div className="flex-shrink-0">
//         <div className="flex items-center gap-4 p-8">
//           <div className="relative">
//             <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
//             <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full relative z-10" />
//           </div>
//           <span className="text-2xl font-medium">Toly.AI</span>
//         </div>

//         <div className="px-6">
//           <button 
//             onClick={createNewConversation}
//             className="w-full flex items-center justify-center gap-3 h-14 bg-[#0B0C0F] rounded-xl border border-[#6FCB71]/20 hover:bg-[#6FCB71]/5 transition-colors duration-200"
//           >
//             <FaPlus className="text-[#6FCB71]" />
//             <span className="text-[#6FCB71] font-medium">New Chat</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Navigation and Conversations */}
//       <div className="flex-1 overflow-y-auto mt-8">
//         {/* Navigation Items */}
//         <nav className="px-6 space-y-2">
//           {navigationItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => router.push(item.href)}
//               className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
//             >
//               <item.icon className="text-xl" />
//               <span className="font-medium text-nowrap">{item.name}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Recent Conversations */}
//         <div className="mt-10 px-6">
//           <h3 className="text-[#9097A6] mb-4 px-4">Recent chats</h3>
          
//           {loading ? (
//             <div className="flex justify-center py-4">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6FCB71]" />
//             </div>
//           ) : error ? (
//             <div className="px-4 py-3 text-sm text-red-500">
//               {error}
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {conversations.map((conversation) => (
//                 <button
//                   key={conversation.id}
//                   onClick={() => switchConversation(conversation.threadId)}
//                   className={`w-full text-left px-6 py-3.5 border rounded-xl transition-colors duration-200 
//                     ${conversation.threadId === currentThreadId 
//                       ? 'bg-white/10 border-[#6FCB71]/40' 
//                       : 'border-white/5 hover:bg-white/5'}`}
//                 >
//                   <p className="text-sm text-white truncate">
//                     {conversation.lastMessage || 'New Conversation'}
//                   </p>
//                   <p className="text-xs text-[#9097A6] mt-1">
//                     {new Date(conversation.updatedAt).toLocaleDateString()}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Navigation */}
//       <div className="flex-shrink-0 px-6 py-8 border-t border-white/5 space-y-2">
//         {[
//           { icon: FaCircleQuestion, label: 'FAQ', href: '/faq' },
//           { icon: FaCog, label: 'Settings', href: '/settings' }
//         ].map((item) => (
//           <button 
//             key={item.label}
//             onClick={() => router.push(item.href)}
//             className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
//           >
//             <item.icon className="text-xl" />
//             <span className="font-medium">{item.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Mobile Close Button */}
//       <button 
//         className="lg:hidden absolute top-8 right-6 text-white/80 hover:text-white transition-colors duration-200"
//         onClick={toggleSidebar}
//         aria-label="Close sidebar"
//       >
//         <FaX size={24} />
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

// components/Sidebar.tsx
// "use client";

// import React, { FC, useState } from 'react';
// import { 
//   FaPlus, 
//   FaMagnifyingGlass,
//   FaChartLine, 
//   FaWallet, 
//   FaPaperPlane,
//   FaUserTie,
//   FaChartPie,
//   FaCircleQuestion,
//   FaX
// } from "react-icons/fa6";
// import { FaCog, FaHistory } from 'react-icons/fa';
// import type { IconType } from 'react-icons';
// import { Conversation } from '@/types/chat';
// import Http from '@/services/httpService';
// import { ExploreModal, InfoModal } from './NavigationModals';

// interface NavigationItem {
//   name: string;
//   icon: IconType;
//   description: string;
// }

// interface SidebarProps {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
//   currentThreadId?: string;
//   onPromptSelect: (promptText: string) => void;
//   onModalOpen: (type: string, name: string) => void;
// }

// export const Sidebar: FC<SidebarProps> = ({ 
//   isSidebarOpen, 
//   toggleSidebar,
//   currentThreadId,
//   onPromptSelect 
// }) => {
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeModal, setActiveModal] = useState<string | null>(null);

//   const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4600';

//   const navigationItems: NavigationItem[] = [
//     { 
//       name: 'Explore', 
//       icon: FaMagnifyingGlass,
//       description: 'Discover all the capabilities of Toly AI, from asset queries to advanced trading operations.'
//     },
//     { 
//       name: 'History', 
//       icon: FaHistory,
//       description: 'View your past interactions and conversations with Toly AI. Track your queries, trades, and operations over time.'
//     },
//     { 
//       name: 'Solana Analytics', 
//       icon: FaChartLine,
//       description: 'Deep dive into Solana blockchain analytics. Monitor network performance, track transactions, and analyze market trends.'
//     },
//     { 
//       name: 'Wallet Audit', 
//       icon: FaWallet,
//       description: 'Comprehensive wallet analysis tool. Review your assets, track portfolio performance, and monitor token movements.'
//     },
//     { 
//       name: 'Send Transactions', 
//       icon: FaPaperPlane,
//       description: 'Easily send tokens and execute transactions on Solana. Support for SOL, SPL tokens, and NFTs with optimal fee estimation.'
//     },
//     { 
//       name: 'Top Performing Traders', 
//       icon: FaUserTie,
//       description: 'Track and analyze the most successful traders on Solana. Learn from their strategies and trading patterns.'
//     },
//     { 
//       name: 'Top Performing Strategies', 
//       icon: FaChartPie,
//       description: 'Explore high-performing trading strategies on Solana. Compare different approaches and their historical success rates.'
//     }
//   ];

//   const createNewConversation = async () => {
//     try {
//       const response = await Http.post(`${API_URL}/chat/conversations`, {}, {
//         headers: {}
//       });
      
//       const newConversation = await response.data;
//       setConversations(prev => [newConversation, ...prev]);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to create conversation');
//       console.error('Error creating conversation:', err);
//     }
//   };

//   const switchConversation = async (threadId: string) => {
//     try {
//       await fetch(`${API_URL}/chat/conversations/${threadId}/switch`, {
//         method: 'POST',
//         headers: {}
//       });
//     } catch (err) {
//       console.error('Error switching conversation:', err);
//     }
//   };

//   return (
//     <div 
//       className={`fixed lg:relative w-[309px] h-screen bg-[#0B0C0F] transition-all duration-300 z-50 flex flex-col
//         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         border-r border-white/5`}
//     >
//       {/* Logo and New Chat Button */}
//       <div className="flex-shrink-0">
//         <div className="flex items-center gap-4 p-8">
//           <div className="relative">
//             <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
//             <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full relative z-10" />
//           </div>
//           <span className="text-2xl font-medium">Toly.AI</span>
//         </div>

//         <div className="px-6">
//           <button 
//             onClick={createNewConversation}
//             className="w-full flex items-center justify-center gap-3 h-14 bg-[#0B0C0F] rounded-xl border border-[#6FCB71]/20 hover:bg-[#6FCB71]/5 transition-colors duration-200"
//           >
//             <FaPlus className="text-[#6FCB71]" />
//             <span className="text-[#6FCB71] font-medium">New Chat</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Navigation and Conversations */}
//       <div className="flex-1 overflow-y-auto mt-8">
//         {/* Navigation Items */}
//         <nav className="px-6 space-y-2">
//           {navigationItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => {
//                 if (item.name === 'Explore') {
//                   setActiveModal('explore');
//                 } else {
//                   setActiveModal(item.name.toLowerCase());
//                 }
//               }}
//               className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
//             >
//               <item.icon className="text-xl" />
//               <span className="font-medium text-nowrap">{item.name}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Recent Conversations */}
//         <div className="mt-10 px-6">
//           <h3 className="text-[#9097A6] mb-4 px-4">Recent chats</h3>
          
//           {loading ? (
//             <div className="flex justify-center py-4">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6FCB71]" />
//             </div>
//           ) : error ? (
//             <div className="px-4 py-3 text-sm text-red-500">
//               {error}
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {conversations.map((conversation) => (
//                 <button
//                   key={conversation.id}
//                   onClick={() => switchConversation(conversation.threadId)}
//                   className={`w-full text-left px-6 py-3.5 border rounded-xl transition-colors duration-200 
//                     ${conversation.threadId === currentThreadId 
//                       ? 'bg-white/10 border-[#6FCB71]/40' 
//                       : 'border-white/5 hover:bg-white/5'}`}
//                 >
//                   <p className="text-sm text-white truncate">
//                     {conversation.lastMessage || 'New Conversation'}
//                   </p>
//                   <p className="text-xs text-[#9097A6] mt-1">
//                     {new Date(conversation.updatedAt).toLocaleDateString()}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Navigation */}
//       <div className="flex-shrink-0 px-6 py-8 border-t border-white/5 space-y-2">
//         {[
//           { icon: FaCircleQuestion, label: 'FAQ', description: 'Get answers to frequently asked questions about using Toly AI.' },
//           { icon: FaCog, label: 'Settings', description: 'Customize your Toly AI experience and manage your preferences.' }
//         ].map((item) => (
//           <button 
//             key={item.label}
//             onClick={() => setActiveModal(item.label.toLowerCase())}
//             className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
//           >
//             <item.icon className="text-xl" />
//             <span className="font-medium">{item.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Mobile Close Button */}
//       <button 
//         className="lg:hidden absolute top-8 right-6 text-white/80 hover:text-white transition-colors duration-200"
//         onClick={toggleSidebar}
//         aria-label="Close sidebar"
//       >
//         <FaX size={24} />
//       </button>

//       {/* Modals */}
//       <ExploreModal 
//         isOpen={activeModal === 'explore'}
//         onClose={() => setActiveModal(null)}
//         onPromptSelect={(promptText) => {
//           onPromptSelect(promptText);
//           setActiveModal(null);
//         }}
//       />

//       {navigationItems.map((item) => (
//         item.name.toLowerCase() !== 'explore' && (
//           <InfoModal
//             key={item.name}
//             isOpen={activeModal === item.name.toLowerCase()}
//             onClose={() => setActiveModal(null)}
//             title={item.name}
//             description={item.description}
//             icon={<item.icon className="h-6 w-6" />}
//           />
//         )
//       ))}

//       {/* Footer Modals */}
//       <InfoModal
//         isOpen={activeModal === 'faq'}
//         onClose={() => setActiveModal(null)}
//         title="FAQ"
//         description="Get answers to frequently asked questions about using Toly AI."
//         icon={<FaCircleQuestion className="h-6 w-6" />}
//       />
//       <InfoModal
//         isOpen={activeModal === 'settings'}
//         onClose={() => setActiveModal(null)}
//         title="Settings"
//         description="Customize your Toly AI experience and manage your preferences."
//         icon={<FaCog className="h-6 w-6" />}
//       />
//     </div>
//   );
// };

// export default Sidebar;

// components/Sidebar.tsx
// "use client";

import React, { FC } from 'react';
import { 
  FaPlus, 
  FaCircleQuestion,
  FaX,
  
} from "react-icons/fa6";
import { FaCog, FaHistory } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { Conversation } from '@/types/chat';

interface NavigationItem {
  name: string;
  icon: IconType;
  description: string;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  clearChat: () => void;
  switchConversation: (convo: Conversation) => Promise<void>;
  currentThreadId?: string;
  onPromptSelect: (promptText: string) => void;
  onModalOpen: (type: string, name: string) => void;
  navigationItems: NavigationItem[];
  conversations: Conversation[]
  setConversations: (value: Conversation[]) => void
  loading: boolean
  error: string | null
  
}

export const Sidebar: FC<SidebarProps> = ({ 
  isSidebarOpen, 
  toggleSidebar,
  currentThreadId,
  onPromptSelect,
  onModalOpen,
  navigationItems,
  switchConversation,
  clearChat,
  conversations,
  loading,
  error,
}) => {
  // const [conversations, setConversations] = useState<Conversation[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const { post, get } = useApi()
  // const { state } = useChatContext()
  // const isAuth = useMemo(() => state.isAuthenticated, [state.isAuthenticated])
  // const router = useRouter()

  // const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4600';

  
  // }, [state.isAuthenticated])
  

  // const getConversations = async () => {
  //   try {
  //     const response = await get(`chat/conversations`, {
  //       // headers: {
  //       //   'Authorization': `Bearer ${state.accessToken}`,
  //       // },
  //     });
  //     // const response = await post(`chat/conversations`);
      
  //     const newConversation = await response.data;

  //     console.log(response);
      
  //     setConversations(newConversation);
  //     // setConversations(prev => newConversation);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to create conversation');
  //     console.error('Error creating conversation:', err);
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  // const createNewConversation = async () => {
  //   try {
  //     const response = await post<Conversation>(`chat/create-conversations`);
  //     // const response = await post(`chat/conversations`);

  //     console.log(response);
      
      
  //     const newConversation = await response.data.data;
  //     dispatch({
  //       type: 'ADD CHAT DETAILS',
  //       payload: {
  //         chat: {
  //           chatId: newConversation._id,
  //           threadId: newConversation.threadId
  //         }
  //       }
  //     })

  //     router.push(`chat/c/${newConversation._id}`)

  //     setConversations(prev => [...prev, newConversation]);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to create conversation');
  //     console.error('Error creating conversation:', err);
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  

  // const switchConversation = async (conversation: Conversation) => {
  //   dispatch({
  //     type: "ADD CHAT DETAILS",
  //     payload: {
  //       chat: {
  //         chatId: conversation._id,
  //         threadId: conversation.threadId
  //       }
  //     }
  //   })

  //   router.push(`/chat/c/${conversation._id}`)
  //   try {
  //     // await post(`chat/conversations/${threadId}/switch`, {
  //     //   method: 'POST',
  //     //   headers: {}
  //     // });
  //   } catch (err) {
  //     console.error('Error switching conversation:', err);
  //   }
  // };

  const footerItems = [
    {
      icon: FaRocket,
      label: 'Automations',
      description: 'Configure and manage automated trading actions.'
    },
    { 
      icon: FaCircleQuestion, 
      label: 'FAQ', 
      description: 'Get answers to frequently asked questions about using Toly AI.' 
    },
    {
      icon: FaHistory,
      label: 'Changelog',
      description: 'View latest updates and changes to Toly.'
    },
    { 
      icon: FaCog, 
      label: 'Settings', 
      description: 'Customize your Toly AI experience and manage your preferences.' 
    }
  ];

  return (
    <div 
      className={`fixed lg:relative w-[309px] h-screen bg-[#0B0C0F] transition-all duration-300 z-50 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r border-white/5`}
    >
      {/* Logo and New Chat Button */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-4 p-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full relative z-10" />
          </div>
          <span className="text-2xl font-medium">Toly.AI</span>
        </div>

        <div className="px-6">
          <button 
            onClick={clearChat}
            className="w-full flex items-center justify-center gap-3 h-14 bg-[#0B0C0F] rounded-xl border border-[#6FCB71]/20 hover:bg-[#6FCB71]/5 transition-colors duration-200"
          >
            <FaPlus className="text-[#6FCB71]" />
            <span className="text-[#6FCB71] font-medium">New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Navigation and Conversations */}
      <div className="flex-1 overflow-y-auto mt-8">
        {/* Navigation Items */}
        <nav className="px-6 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (item.name === 'Explore') {
                  onModalOpen('explore', item.name.toLowerCase());
                } else {
                  onModalOpen('info', item.name.toLowerCase());
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
            >
              <item.icon className="text-xl" />
              <span className="font-medium text-nowrap">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Recent Conversations */}
        <div className="mt-10 px-6">
          <h3 className="text-[#9097A6] mb-4 px-4">Recent chats</h3>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6FCB71]" />
            </div>
          ) : error ? (
            <div className="px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          ) : (
            <div className="space-y-2">
              {conversations?.length ? (conversations.map((conversation) => (
                <button
                  key={conversation?.threadId}
                  onClick={() => switchConversation(conversation)}
                  className={`w-full text-left px-6 py-3.5 border rounded-xl transition-colors duration-200 
                    ${true 
                    // ${conversation.threadId === currentThreadId 
                      ? 'bg-white/10 border-[#6FCB71]/40' 
                      : 'border-white/5 hover:bg-white/5'}`}
                >
                  <p className="text-sm text-white truncate">
                    {conversation?.lastMessage?.content || 'New Conversation'}
                  </p>
                  <p className="text-xs text-[#9097A6] mt-1">
                    {new Date(conversation?.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </button>
              ))) : (
                <p className='flex justify-center my-4' >No Recent Chat</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex-shrink-0 px-6 py-8 border-t border-white/5 space-y-2">
        {footerItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => onModalOpen('info', item.label.toLowerCase())}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-[#9097A6] hover:bg-white/5 rounded-xl transition-colors duration-200"
          >
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Close Button */}
      <button 
        className="lg:hidden absolute top-8 right-6 text-white/80 hover:text-white transition-colors duration-200"
        onClick={toggleSidebar}
        aria-label="Close sidebar"
      >
        <FaX size={24} />
      </button>
    </div>
  );
};

export default Sidebar;