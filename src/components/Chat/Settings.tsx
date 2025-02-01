// import React from 'react';
// import { FaDiscord, FaTwitter, FaGithub, FaTelegram } from 'react-icons/fa';

// const Settings = () => {
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">Account</h1>

//       {/* Profile Information */}
//       <div className="bg-[#121417] rounded-lg p-6 mb-8">
//         <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-medium">FICCNL_beta1</h3>
//               <p className="text-sm text-gray-400">Account Created Nov 12, 2024</p>
//             </div>
//             <button className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors">
//               Early Access Status
//             </button>
//           </div>
          
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-gray-400">Dark Mode</span>
//             <div className="w-12 h-6 bg-[#6FCB71] rounded-full relative cursor-pointer">
//               <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Connected Accounts */}
//       <div className="bg-[#121417] rounded-lg p-6">
//         <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
//         <div className="space-y-4">
//           {[
//             { icon: FaDiscord, name: 'Discord', status: 'Disconnected' },
//             { icon: FaTwitter, name: 'X (Twitter)', status: 'Connect' },
//             { icon: FaGithub, name: 'Github', status: 'Disconnected' },
//             { icon: FaTelegram, name: 'Telegram', status: 'Connect' }
//           ].map((account, index) => (
//             <div key={index} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <account.icon className="text-xl text-gray-400" />
//                 <span className="text-sm">{account.name}</span>
//               </div>
//               <button className="text-sm text-gray-400 hover:text-white transition-colors">
//                 {account.status}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <p className="text-center text-xs text-gray-500 mt-8">
//         Information provided by Toly is not Financial Advice
//       </p>
//     </div>
//   );
// };

// export default Settings;

"use client"
import { toast } from '@/hooks/useToast';
import { ellipsify } from '@/utils';
import React from 'react';
import { FaDiscord, FaTwitter, FaGithub, FaTelegram, FaClipboard } from 'react-icons/fa';

type settingsProp = {
  address: string
}

const Settings = ({ address }: settingsProp) => {

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(address)
    .then(() => {
      toast.success("Copied")
    })
    .catch(() => {
      toast.error("Failed to copy address")
    });
  }
  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Account</h1>
        </div>

        {/* Profile Information */}
        <div className="bg-[#121417] rounded-lg p-4 md:p-6 mb-6 md:mb-8 border border-white/5">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">Wallet Address</h3>
                {/* <p className="text-sm text-gray-400">Account Created Nov 12, 2024</p> */}
              </div>
              <button onClick={handleCopyWallet} className="flex items-center gap-x-4 px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors w-full md:w-auto text-center">
                <span>{ellipsify(address, 8)}</span>
                <FaClipboard className='text-gray-400' />
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">FICCNL_beta1</h3>
                <p className="text-sm text-gray-400">Account Created Nov 12, 2024</p>
              </div>
              <button className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors w-full md:w-auto text-center">
                Early Access Status
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Dark Mode</span>
              <div className="w-12 h-6 bg-[#6FCB71] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-[#121417] rounded-lg p-4 md:p-6 border border-white/5">
          <h2 className="text-lg font-semibold mb-4">Connected Accounts</h2>
          <div className="space-y-4">
            {[
              { icon: FaDiscord, name: 'Discord', status: 'Disconnected' },
              { icon: FaTwitter, name: 'X (Twitter)', status: 'Connect' },
              { icon: FaGithub, name: 'Github', status: 'Disconnected' },
              { icon: FaTelegram, name: 'Telegram', status: 'Connect' }
            ].map((account, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <account.icon className="text-xl text-gray-400" />
                  <span className="text-sm md:text-base">{account.name}</span>
                </div>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  {account.status}
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Information provided by Toly is not Financial Advice
        </p>
      </div>
    </div>
  );
};

export default Settings;