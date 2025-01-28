// import React, { useState } from 'react';
// import { FaChevronDown } from 'react-icons/fa6';

// const FAQ = () => {
//   const [openQuestion, setOpenQuestion] = useState<string | null>(null);

//   const faqItems = [
//     {
//       id: '1',
//       question: 'I paid for early access program, but still not showing up ?',
//       answer: 'Your access should be granted within 24 hours of payment confirmation. If you\'re still experiencing issues, please contact our support team.'
//     },
//     {
//       id: '2',
//       question: 'how does your platform ensure the security of user funds and data',
//       answer: 'We implement industry-standard security protocols including encryption and secure storage solutions.'
//     },
//     {
//       id: '3',
//       question: 'what cryptocurrencies are supported on your platform?',
//       answer: 'We currently support major cryptocurrencies including Bitcoin, Ethereum, and various other popular tokens.'
//     },
//     {
//       id: '4',
//       question: 'Is the platform suitable for beginners in cryptocurrency?',
//       answer: 'Yes, our platform is designed to be user-friendly for both beginners and experienced users.'
//     },
//     {
//       id: '5',
//       question: 'how does the ai generate insights and predictions for cryptocurrency markets?',
//       answer: 'Our AI uses a combination of machine learning, natural language processing (NLP), and deep learning models to analyze data. This includes historical price trends, on-chain activity, market sentiment from social media and news, and macroeconomic indicators.'
//     }
//   ];

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">FAQ</h1>
      
//       <div className="space-y-4">
//         {faqItems.map((item) => (
//           <div 
//             key={item.id}
//             className="border border-white/5 rounded-lg overflow-hidden"
//           >
//             <button
//               className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
//               onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
//             >
//               <span className="text-sm">{item.question}</span>
//               <FaChevronDown 
//                 className={`transition-transform duration-200 ${
//                   openQuestion === item.id ? 'rotate-180' : ''
//                 }`}
//               />
//             </button>
            
//             {openQuestion === item.id && (
//               <div className="p-4 bg-white/5 text-sm text-gray-300">
//                 {item.answer}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
      
//       <p className="text-center text-xs text-gray-500 mt-8">
//         Information provided by Toly is not Financial Advice
//       </p>
//     </div>
//   );
// };

// export default FAQ;

"use client"
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqItems = [
    {
      id: '1',
      question: 'I paid for early access program, but still not showing up ?',
      answer: 'Your access should be granted within 24 hours of payment confirmation. If you\'re still experiencing issues, please contact our support team.'
    },
    {
      id: '2',
      question: 'how does your platform ensure the security of user funds and data',
      answer: 'We implement industry-standard security protocols including encryption and secure storage solutions.'
    },
    {
      id: '3',
      question: 'what cryptocurrencies are supported on your platform?',
      answer: 'We currently support major cryptocurrencies including Bitcoin, Ethereum, and various other popular tokens.'
    },
    {
      id: '4',
      question: 'Is the platform suitable for beginners in cryptocurrency?',
      answer: 'Yes, our platform is designed to be user-friendly for both beginners and experienced users.'
    },
    {
      id: '5',
      question: 'how does the ai generate insights and predictions for cryptocurrency markets?',
      answer: 'Our AI uses a combination of machine learning, natural language processing (NLP), and deep learning models to analyze data. This includes historical price trends, on-chain activity, market sentiment from social media and news, and macroeconomic indicators.'
    }
  ];

  return (
    <div className="min-h-full">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">FAQ</h1>
          <div className="flex gap-4">
            {/* Additional nav items if needed */}
          </div>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div 
              key={item.id}
              className="border border-white/5 rounded-lg overflow-hidden bg-[#121417] transition-all duration-200 hover:border-[#6FCB71]/20"
            >
              <button
                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenQuestion(openQuestion === item.id ? null : item.id)}
              >
                <span className="text-sm md:text-base pr-4">{item.question}</span>
                <FaChevronDown 
                  className={`flex-shrink-0 transition-transform duration-200 text-[#6FCB71] ${
                    openQuestion === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openQuestion === item.id && (
                <div className="p-4 md:p-6 bg-white/5 text-sm md:text-base text-gray-300 border-t border-white/5">
                  {item.answer}
                </div>
              )}
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

export default FAQ;