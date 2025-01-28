// import React from 'react';
// import { FaCircle } from 'react-icons/fa6';

// const Changelog = () => {
//   const changes = [
//     {
//       id: 1,
//       title: 'Access Pass',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis vitae augue nec lorem congue fermentum non in purus. Curabitur eu turpis vel ex facilisi tincidunt vel vel lorem.',
//       date: 'Oct 27, 2024',
//       status: 'Added',
//       statusColor: 'bg-green-500'
//     },
//     {
//       id: 2,
//       title: 'Access Pass',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis vitae augue nec lorem congue fermentum non in purus. Curabitur eu turpis vel ex facilisi tincidunt vel vel lorem.',
//       date: 'Oct 27, 2024',
//       status: 'Deprecated',
//       statusColor: 'bg-blue-500'
//     },
//     {
//       id: 3,
//       title: 'Access Pass',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis vitae augue nec lorem congue fermentum non in purus. Curabitur eu turpis vel ex facilisi tincidunt vel vel lorem.',
//       date: 'Oct 27, 2024',
//       status: 'Removed',
//       statusColor: 'bg-red-500'
//     }
//   ];

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-2xl font-bold">Changelogs</h1>
//         <div className="flex gap-4">
//           <button className="text-sm hover:text-white">Mobile</button>
//           <button className="text-sm hover:text-white">Docs</button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {changes.map((change) => (
//           <div 
//             key={change.id}
//             className="border border-white/5 rounded-lg p-6"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">{change.title}</h3>
//                 <p className="text-sm text-gray-400">{change.description}</p>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-xs ${change.statusColor}`}>
//                 {change.status}
//               </span>
//             </div>
            
//             <div className="flex items-center justify-between mt-4">
//               <p className="text-xs text-gray-500">Read More About Toly Access Pass Here</p>
//               <span className="text-xs text-gray-500">{change.date}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <p className="text-center text-xs text-gray-500 mt-8">
//         Information provided by Toly is not Financial Advice
//       </p>
//     </div>
//   );
// };

// export default Changelog;

"use client"
import React from 'react';

const Changelog = () => {
  const changes = [
    {
      id: 1,
      title: 'Access Pass',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis vitae augue nec lorem congue fermentum non in purus. Curabitur eu turpis vel ex facilisi tincidunt vel vel lorem.',
      date: 'Oct 27, 2024',
      status: 'Added',
      statusColor: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Access Pass',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis vitae augue nec lorem congue fermentum non in purus. Curabitur eu turpis vel ex facilisi tincidunt vel vel lorem.',
      date: 'Oct 27, 2024',
      status: 'Deprecated',
      statusColor: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Access Pass',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis vitae augue nec lorem congue fermentum non in purus. Curabitur eu turpis vel ex facilisi tincidunt vel vel lorem.',
      date: 'Oct 27, 2024',
      status: 'Removed',
      statusColor: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Changelogs</h1>
          <div className="flex gap-4">
            <button className="text-sm hover:text-white transition-colors">Mobile</button>
            <button className="text-sm hover:text-white transition-colors">Docs</button>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {changes.map((change) => (
            <div 
              key={change.id}
              className="border border-white/5 rounded-lg p-4 md:p-6 bg-[#121417] hover:border-[#6FCB71]/20 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{change.title}</h3>
                  <p className="text-sm text-gray-400 pr-4">{change.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${change.statusColor} flex-shrink-0`}>
                  {change.status}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <p className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer">
                  Read More About Toly Access Pass Here
                </p>
                <span className="text-xs text-gray-500">{change.date}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Information provided by Toly is not Financial Advice
        </p>
      </div>
    </div>
  );
};

export default Changelog;