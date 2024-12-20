// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden bg-black">
//       {/* Left Side Content */}
//       <div className="absolute left-[300px] top-[332px] w-[575px] flex flex-col gap-6">
//         <motion.h1 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-[48px] leading-[60px] font-medium text-[#FAFAFA] font-['Familjen_Grotesk'] capitalize"
//         >
//           Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
//         </motion.h1>
        
//         <motion.p 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="w-[561px] text-lg leading-[160%] text-[#9097A6] font-['Familjen_Grotesk']"
//         >
//           Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
//         </motion.p>
//       </div>

//       {/* Bottom Left Image */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="absolute left-[297px] top-[766px]"
//       >
//         <Image
//           src="/wen.png"
//           alt="Wen"
//           width={171}
//           height={171}
//           className="rounded-[500px]"
//           priority
//         />
//       </motion.div>

//       {/* Squiggly Line SVG */}
//       <svg
//         className="absolute left-[461px] top-[308px] z-10"
//         width="983"
//         height="544"
//         viewBox="0 0 983 544"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M0 543C83.5-181 899.5 725 983 1"
//           stroke="url(#squiggly-gradient)"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <defs>
//           <linearGradient
//             id="squiggly-gradient"
//             x1="491.5"
//             y1="1"
//             x2="491.5"
//             y2="543"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="#C44FE2" />
//             <stop offset="1" stopColor="#6FCB71" />
//           </linearGradient>
//         </defs>
//       </svg>

//       {/* Form Section */}
//       <div className="absolute left-[1040px] top-[332px] w-[580px]">
//         {/* Top Image */}
//         <div className="absolute -top-[50px] right-0">
//           <Image
//             src="/wencat.png"
//             alt="Wen Cat"
//             width={171}
//             height={171}
//             className="rounded-[500px]"
//             priority
//           />
//         </div>

//         {/* Form */}
//         <motion.form 
//           className="flex flex-col gap-6"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//           <div className="flex flex-col gap-4">
//             {['name', 'email', 'password'].map((field) => (
//               <motion.div 
//                 key={field}
//                 className="flex items-center px-8 h-20 bg-[#121417] rounded-3xl"
//                 whileFocus={{ scale: 1.02 }}
//               >
//                 <input
//                   type={field === 'password' ? 'password' : 'text'}
//                   name={field}
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={formData[field as keyof FormData]}
//                   onChange={handleInputChange}
//                   className="w-full bg-transparent text-lg text-[#9097A6] font-['Familjen_Grotesk'] outline-none"
//                 />
//               </motion.div>
//             ))}
//           </div>

//           <motion.button
//             type="submit"
//             className="flex justify-center items-center w-full h-16 bg-[#6FCB71] border border-[#6FCB71]/20 rounded-full"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <span className="text-lg font-medium text-[#0B0C0F] capitalize font-['Familjen_Grotesk']">
//               Sign Me Up With Toly
//             </span>
//           </motion.button>

//           <p className="text-center text-[#9097A6] font-['Familjen_Grotesk']">
//             Already have an account?{' '}
//             <Link href="/signin" className="text-[#6FCB71]">
//               Sign In
//             </Link>
//           </p>
//         </motion.form>
//       </div>

//       {/* Bottom Right Gradient Vectors */}
//       <div className="absolute right-[-10.16%] bottom-[14.68%] w-[83.33%] h-[67.74%] transform rotate-[12.89deg]">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute left-[26.83%] right-[-10.16%] top-[17.58%] h-[15.65%] bg-gradient-to-r from-[#599DB0] to-[#47F8C3]"
//         />
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute left-[15.21%] right-[1.46%] top-[68.38%] h-[15.63%] bg-gradient-to-r from-[#C44FE2] to-[#73B0D0]"
//         />
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute left-[21.01%] right-[-4.35%] top-[43%] h-[15.62%] bg-gradient-to-r from-[#778CBF] to-[#5DCDC9]"
//         />
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-black overflow-y-auto pb-20">
//       {/* Main Content Container - Adjusted top spacing */}
//       <div className="relative max-w-[1920px] mx-auto pt-[200px]">
//         {/* Left Side Content */}
//         <div className="absolute left-[300px] w-[575px] flex flex-col gap-6">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-[48px] leading-[60px] font-medium text-[#FAFAFA] font-['Familjen_Grotesk'] capitalize"
//           >
//             Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="w-[561px] text-lg leading-[160%] text-[#9097A6] font-['Familjen_Grotesk']"
//           >
//             Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
//           </motion.p>
//         </div>

//         {/* Bottom Left Image */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute left-[297px] top-[500px]"
//         >
//           <Image
//             src="/wen.png"
//             alt="Wen"
//             width={171}
//             height={171}
//             className="rounded-[500px]"
//             priority
//           />
//         </motion.div>

//         {/* Squiggly Line SVG - Adjusted path and thickness */}
//         <svg
//           className="absolute left-[461px] top-[180px] z-10"
//           width="983"
//           height="544"
//           viewBox="0 0 983 544"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M0 543C83.5-181 899.5 725 983 0"
//             stroke="url(#squiggly-gradient)"
//             strokeWidth="4"
//             strokeLinecap="round"
//           />
//           <defs>
//             <linearGradient
//               id="squiggly-gradient"
//               x1="491.5"
//               y1="0"
//               x2="491.5"
//               y2="543"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop stopColor="#C44FE2" />
//               <stop offset="1" stopColor="#6FCB71" />
//             </linearGradient>
//           </defs>
//         </svg>

//         {/* Form Section - Adjusted spacing */}
//         <div className="absolute left-[1040px] top-0 w-[580px]">
//           {/* Top Image - Positioned above form with proper spacing */}
//           <div className="absolute -top-[120px] right-0 z-20">
//             <Image
//               src="/wencat.png"
//               alt="Wen Cat"
//               width={171}
//               height={171}
//               className="rounded-[500px]"
//               priority
//             />
//           </div>

//           {/* Form */}
//           <motion.form 
//             className="flex flex-col gap-6 mt-[80px]"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <div className="flex flex-col gap-4">
//               {['name', 'email', 'password'].map((field) => (
//                 <motion.div 
//                   key={field}
//                   className="flex items-center px-8 h-20 bg-[#121417] rounded-3xl"
//                   whileFocus={{ scale: 1.02 }}
//                 >
//                   <input
//                     type={field === 'password' ? 'password' : 'text'}
//                     name={field}
//                     placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                     value={formData[field as keyof FormData]}
//                     onChange={handleInputChange}
//                     className="w-full bg-transparent text-lg text-[#9097A6] font-['Familjen_Grotesk'] outline-none"
//                   />
//                 </motion.div>
//               ))}
//             </div>

//             <motion.button
//               type="submit"
//               className="flex justify-center items-center w-full h-16 bg-[#6FCB71] border border-[#6FCB71]/20 rounded-full"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <span className="text-lg font-medium text-[#0B0C0F] capitalize font-['Familjen_Grotesk']">
//                 Sign Me Up With Toly
//               </span>
//             </motion.button>

//             <p className="text-center text-[#9097A6] font-['Familjen_Grotesk']">
//               Already have an account?{' '}
//               <Link href="/signin" className="text-[#6FCB71]">
//                 Sign In
//               </Link>
//             </p>
//           </motion.form>
//         </div>

//         {/* Bottom Right Gradient Vectors - Adjusted for S shape */}
//         <div className="absolute right-[-5%] bottom-[5%] w-[40%] h-[30%] transform rotate-[12.89deg]">
//           {/* First vector - Longer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="absolute left-[26.83%] right-[-10.16%] top-[17.58%] h-[8%] bg-gradient-to-r from-[#599DB0] to-[#47F8C3]"
//           />
//           {/* Middle vector - Shorter */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="absolute left-[15.21%] right-[1.46%] top-[48.38%] h-[6%] bg-gradient-to-r from-[#C44FE2] to-[#73B0D0]"
//           />
//           {/* Bottom vector - Longer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="absolute left-[21.01%] right-[-4.35%] top-[79%] h-[8%] bg-gradient-to-r from-[#778CBF] to-[#5DCDC9]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-black overflow-y-auto pb-20">
//       <div className="relative max-w-[1920px] mx-auto pt-[200px]">
//         {/* Left Side Content */}
//         <div className="absolute left-[300px] top-[200px] w-[575px] flex flex-col gap-6">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-[48px] leading-[60px] font-medium text-[#FAFAFA] font-['Familjen_Grotesk'] capitalize"
//           >
//             Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="w-[561px] text-lg leading-[160%] text-[#9097A6] font-['Familjen_Grotesk']"
//           >
//             Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
//           </motion.p>
//         </div>

//         {/* Bottom Left Image */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute left-[297px] top-[500px]"
//         >
//           <Image
//             src="/wen.png"
//             alt="Wen"
//             width={171}
//             height={171}
//             className="rounded-[500px]"
//             priority
//           />
//         </motion.div>

//         {/* Squiggly Line SVG */}
//         <svg
//           className="absolute left-[461px] top-[180px] z-10"
//           width="983"
//           height="544"
//           viewBox="0 0 983 544"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M0 543C83.5-181 899.5 725 983 0"
//             stroke="url(#squiggly-gradient)"
//             strokeWidth="4"
//             strokeLinecap="round"
//           />
//           <defs>
//             <linearGradient
//               id="squiggly-gradient"
//               x1="491.5"
//               y1="0"
//               x2="491.5"
//               y2="543"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop stopColor="#C44FE2" />
//               <stop offset="1" stopColor="#6FCB71" />
//             </linearGradient>
//           </defs>
//         </svg>

//         {/* Form Section - Aligned with left content */}
//         <div className="absolute left-[1040px] top-[200px] w-[580px]">
//           {/* Top Image */}
//           <div className="absolute -top-[120px] right-0 z-20">
//             <Image
//               src="/wencat.png"
//               alt="Wen Cat"
//               width={171}
//               height={171}
//               className="rounded-[500px]"
//               priority
//             />
//           </div>

//           {/* Form */}
//           <motion.form 
//             className="flex flex-col gap-6 mt-[80px]"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <div className="flex flex-col gap-4">
//               {['name', 'email', 'password'].map((field) => (
//                 <motion.div 
//                   key={field}
//                   className="flex items-center px-8 h-20 bg-[#121417] rounded-3xl"
//                   whileFocus={{ scale: 1.02 }}
//                 >
//                   <input
//                     type={field === 'password' ? 'password' : 'text'}
//                     name={field}
//                     placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                     value={formData[field as keyof FormData]}
//                     onChange={handleInputChange}
//                     className="w-full bg-transparent text-lg text-[#9097A6] font-['Familjen_Grotesk'] outline-none"
//                   />
//                 </motion.div>
//               ))}
//             </div>

//             <motion.button
//               type="submit"
//               className="flex justify-center items-center w-full h-16 bg-[#6FCB71] border border-[#6FCB71]/20 rounded-full"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <span className="text-lg font-medium text-[#0B0C0F] capitalize font-['Familjen_Grotesk']">
//                 Sign Me Up With Toly
//               </span>
//             </motion.button>

//             <p className="text-center text-[#9097A6] font-['Familjen_Grotesk']">
//               Already have an account?{' '}
//               <Link href="/signin" className="text-[#6FCB71]">
//                 Sign In
//               </Link>
//             </p>
//           </motion.form>
//         </div>

//         {/* Bottom Right Gradient Vectors - Thicker but shorter */}
//         <div className="absolute right-[-5%] bottom-[5%] w-[25%] h-[20%] transform rotate-[12.89deg]">
//           {/* First vector - Longer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="absolute left-[26.83%] right-[-10.16%] top-[17.58%] h-[15%] bg-gradient-to-r from-[#599DB0] to-[#47F8C3]"
//           />
//           {/* Middle vector - Shorter */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="absolute left-[15.21%] right-[1.46%] top-[48.38%] h-[12%] bg-gradient-to-r from-[#C44FE2] to-[#73B0D0]"
//           />
//           {/* Bottom vector - Longer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="absolute left-[21.01%] right-[-4.35%] top-[79%] h-[15%] bg-gradient-to-r from-[#778CBF] to-[#5DCDC9]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-black overflow-y-auto pb-20">
//       <div className="relative max-w-[1920px] mx-auto">
//         {/* Left Side Content */}
//         <div className="absolute left-[300px] top-[180px] w-[575px] flex flex-col gap-6">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-[48px] leading-[60px] font-medium text-[#FAFAFA] font-['Familjen_Grotesk'] capitalize"
//           >
//             Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="w-[561px] text-lg leading-[160%] text-[#9097A6] font-['Familjen_Grotesk']"
//           >
//             Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
//           </motion.p>
//         </div>

//         {/* Left Image with Circle Background */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="absolute left-[297px] top-[500px]"
//         >
//           <div className="relative">
//             <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
//             <Image
//               src="/wen.png"
//               alt="Wen"
//               width={171}
//               height={171}
//               className="relative z-10 rounded-full"
//               priority
//             />
//           </div>
//         </motion.div>

//         {/* Squiggly Line SVG - Redesigned path */}
//         <svg
//           className="absolute left-[461px] top-[180px] z-10"
//           width="983"
//           height="544"
//           viewBox="0 0 983 544"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M171 171C171 171 300 171 400 250C500 329 600 200 700 250C800 300 900 400 983 300"
//             stroke="url(#squiggly-gradient)"
//             strokeWidth="4"
//             strokeLinecap="round"
//           />
//           <defs>
//             <linearGradient
//               id="squiggly-gradient"
//               x1="171"
//               y1="171"
//               x2="983"
//               y2="300"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop stopColor="#6FCB71" />
//               <stop offset="1" stopColor="#C44FE2" />
//             </linearGradient>
//           </defs>
//         </svg>

//         {/* Form Section */}
//         <div className="absolute right-[300px] top-[180px] w-[480px]">
//           {/* Form Container with Dark Background */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-[#121417]/80 backdrop-blur-lg rounded-3xl p-6"
//           >
//             <motion.form className="flex flex-col gap-4">
//               <div className="flex flex-col gap-4">
//                 {['name', 'email', 'password'].map((field) => (
//                   <motion.div 
//                     key={field}
//                     className="flex items-center px-6 h-16 bg-black/40 rounded-2xl"
//                     whileFocus={{ scale: 1.02 }}
//                   >
//                     <input
//                       type={field === 'password' ? 'password' : 'text'}
//                       name={field}
//                       placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                       value={formData[field as keyof FormData]}
//                       onChange={handleInputChange}
//                       className="w-full bg-transparent text-lg text-[#9097A6] font-['Familjen_Grotesk'] outline-none"
//                     />
//                   </motion.div>
//                 ))}
//               </div>

//               <motion.button
//                 type="submit"
//                 className="flex justify-center items-center w-full h-16 bg-[#6FCB71] rounded-full mt-4"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <span className="text-lg font-medium text-black capitalize font-['Familjen_Grotesk']">
//                   Sign Me Up With Toly
//                 </span>
//               </motion.button>

//               <p className="text-center text-[#9097A6] font-['Familjen_Grotesk'] mt-4">
//                 Already have an account?{' '}
//                 <Link href="/signin" className="text-[#6FCB71]">
//                   Sign In
//                 </Link>
//               </p>
//             </motion.form>
//           </motion.div>

//           {/* Diamond Shape Decoration */}
//           <div className="absolute -top-8 right-8 w-6 h-6 bg-[#C44FE2] transform rotate-45" />
//         </div>

//         {/* Bottom Right S-shaped Vectors - Adjusted size and position */}
//         <div className="absolute right-[100px] bottom-[50px] w-[200px] h-[120px] transform rotate-[12.89deg]">
//           {/* Three thick lines forming S shape */}
//           <motion.div className="absolute w-full h-[30px] bg-gradient-to-r from-[#599DB0] to-[#47F8C3] transform -rotate-15" />
//           <motion.div className="absolute top-[45px] w-[80%] h-[30px] bg-gradient-to-r from-[#C44FE2] to-[#73B0D0]" />
//           <motion.div className="absolute bottom-0 w-full h-[30px] bg-gradient-to-r from-[#778CBF] to-[#5DCDC9] transform rotate-15" />
//         </div>
//       </div>
//     </div>
//   );
// }; my input fields are not work, they should work. Secondly, the image at the bottom should be  under the text and not coincide so I think you should separate them. Let's remove the right bottom vectors and have a solana logo that's rotated in to be in that position too, directly beside (after) the diamond should be an image just like the one we have at the beside and also the line should be behind not infront and it should be connecting the image at the top after the diamond to the image at the bottom. The line would connect or touch each image from their sides. Obviously to touch the image on top, you have to also touch the diamond and it's going to be behind not infront. I don't know whether you understand but look at the picture closely and study it then you'll understand what I mean.

// export default SignupPage;

// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="relative w-full min-h-screen bg-black overflow-y-auto pb-20">
//       <div className="relative max-w-[1920px] mx-auto">
//         {/* Squiggly Line SVG - Positioned behind with lower z-index */}
//         <svg
//           className="absolute left-[461px] top-[180px] z-0"
//           width="983"
//           height="544"
//           viewBox="0 0 983 544"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M171 400 C171 400 300 400 400 350 C500 300 600 280 700 300 C800 320 900 300 983 280"
//             stroke="url(#squiggly-gradient)"
//             strokeWidth="4"
//             strokeLinecap="round"
//           />
//           <defs>
//             <linearGradient
//               id="squiggly-gradient"
//               x1="171"
//               y1="400"
//               x2="983"
//               y2="280"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop stopColor="#6FCB71" />
//               <stop offset="1" stopColor="#C44FE2" />
//             </linearGradient>
//           </defs>
//         </svg>

//         {/* Left Side Content */}
//         <div className="absolute left-[300px] top-[180px] w-[575px] flex flex-col gap-10">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-[48px] leading-[60px] font-medium text-[#FAFAFA] font-['Familjen_Grotesk'] capitalize"
//           >
//             Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="w-[561px] text-lg leading-[160%] text-[#9097A6] font-['Familjen_Grotesk']"
//           >
//             Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
//           </motion.p>

//           {/* Bottom Image - Positioned below text with proper spacing */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-10"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
//               <Image
//                 src="/wen.png"
//                 alt="Wen"
//                 width={171}
//                 height={171}
//                 className="relative z-10 rounded-full"
//                 priority
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* Form Section */}
//         <div className="absolute right-[300px] top-[180px] w-[480px]">
//           {/* Diamond and Top Image Container */}
//           <div>
//             <div className="absolute -top-8 right-8 w-6 h-6 bg-[#C44FE2] transform rotate-45 z-20" />
//             {/* Top Image beside diamond */}
//             <div className="absolute -top-[60px] right-[60px]">
//               <Image
//                 src="/wencat.png"
//                 alt="Top Wen Cat"
//                 width={100}
//                 height={100}
//                 className="rounded-full"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Form Container */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-[#121417]/80 backdrop-blur-lg rounded-3xl p-6 z-10 relative"
//           >
//             <motion.form className="flex flex-col gap-4">
//               <div className="flex flex-col gap-4">
//                 {['name', 'email', 'password'].map((field) => (
//                   <motion.div 
//                     key={field}
//                     className="relative z-20" // Added z-index for input interaction
//                   >
//                     <input
//                       type={field === 'password' ? 'password' : 'text'}
//                       name={field}
//                       placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                       value={formData[field as keyof FormData]}
//                       onChange={handleInputChange}
//                       className="w-full h-16 px-6 bg-black/40 rounded-2xl text-lg text-[#9097A6] font-['Familjen_Grotesk'] outline-none focus:ring-2 focus:ring-[#6FCB71]/20"
//                     />
//                   </motion.div>
//                 ))}
//               </div>

//               <motion.button
//                 type="submit"
//                 className="flex justify-center items-center w-full h-16 bg-[#6FCB71] rounded-full mt-4"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <span className="text-lg font-medium text-black capitalize font-['Familjen_Grotesk']">
//                   Sign Me Up With Toly
//                 </span>
//               </motion.button>

//               <p className="text-center text-[#9097A6] font-['Familjen_Grotesk'] mt-4">
//                 Already have an account?{' '}
//                 <Link href="/signin" className="text-[#6FCB71]">
//                   Sign In
//                 </Link>
//               </p>
//             </motion.form>
//           </motion.div>
//         </div>

//         {/* Rotated Solana Logo */}
//         <div className="absolute right-[100px] bottom-[50px] transform rotate-12">
//           <Image
//             src="/solana-logo.svg" // Make sure to add this SVG to your public folder
//             alt="Solana Logo"
//             width={100}
//             height={100}
//             className="opacity-80"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// interface FormData {
//   name: string;
//   email: string;
//   password: string;
// }

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password: ''
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="relative w-full min-h-[130vh] bg-black pb-20">
//       <div className="relative max-w-[1920px] mx-auto">
//         {/* Left Side Content */}
//         <div className="absolute left-[300px] top-[260px] w-[575px] flex flex-col gap-10">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-[48px] leading-[60px] font-medium text-[#FAFAFA] font-['Familjen_Grotesk'] capitalize z-10"
//           >
//             Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
//           </motion.h1>
          
//           <motion.p 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="w-[561px] text-lg leading-[160%] text-[#9097A6] font-['Familjen_Grotesk']"
//           >
//             Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
//           </motion.p>

//           {/* Bottom Image - Connection Point for Line */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-0"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
//               <Image
//                 src="/wen.png"
//                 alt="Wen"
//                 width={100}
//                 height={100}
//                 className="relative z-10 rounded-full"
//                 priority
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* Form Section with Top Decorations */}
//         <div className="absolute right-[300px] top-[120px] w-[480px]">
//           {/* Top Decorations Container */}
//           <div className="relative h-[116px] mb-8"> {/* Height matches the image size */}

//             {/* Diamond - Same size as image */}
//             <div className="absolute left-72 top-16 w-[60px] h-[60px] bg-[#C44FE2] transform rotate-45" />
//             {/* Top Image - First in DOM for proper z-index */}
//             <div className="absolute left-[360px] top-10">
//               <Image
//                 src="/dyor.png"
//                 alt="Top Wen Cat"
//                 width={100}
//                 height={100}
//                 className="relative z-10 rounded-full"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Squiggly Line - Positioned to connect images */}
//           <svg
//             className="absolute left-[-700px] top-[-4px] z-0"
//             width="1050"
//             height="800"
//             viewBox="0 0 983 744"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//             d="M20 600 C800 900 900 500 900 400 C900 300 300 200 900 150 C800 100 900 85 983 85"
//             stroke="url(#squiggly-gradient)"
//             strokeWidth="4"
//             strokeLinecap="round"
//             />
//             <defs>
//               <linearGradient
//                 id="squiggly-gradient"
//                 x1="50"
//                 y1="500"
//                 x2="983"
//                 y2="85"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#6FCB71" />
//                 <stop offset="1" stopColor="#C44FE2" />
//               </linearGradient>
//             </defs>
//           </svg>

//           {/* Form Container - Below Top Decorations */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-[#121417]/80 backdrop-blur-lg rounded-3xl p-6 relative z-10"
//           >
//             <motion.form className="flex flex-col gap-4">
//               <div className="flex flex-col gap-4">
//                 {['name', 'email', 'password'].map((field) => (
//                   <motion.div 
//                     key={field}
//                     className="relative z-20"
//                   >
//                     <input
//                       type={field === 'password' ? 'password' : 'text'}
//                       name={field}
//                       placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                       value={formData[field as keyof FormData]}
//                       onChange={handleInputChange}
//                       className="w-full h-16 px-6 bg-black/40 rounded-2xl text-lg text-[#9097A6] font-['Familjen_Grotesk'] outline-none focus:ring-2 focus:ring-[#6FCB71]/20"
//                     />
//                   </motion.div>
//                 ))}
//               </div>

//               <motion.button
//                 type="submit"
//                 className="flex justify-center items-center w-full h-16 bg-[#6FCB71] rounded-full mt-4"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <span className="text-lg font-medium text-black capitalize font-['Familjen_Grotesk']">
//                   Sign Me Up With Toly
//                 </span>
//               </motion.button>

//               <p className="text-center text-[#9097A6] font-['Familjen_Grotesk'] mt-4">
//                 Already have an account?{' '}
//                 <Link href="/auth/signin" className="text-[#6FCB71]">
//                   Sign In
//                 </Link>
//               </p>
//             </motion.form>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupPage;

"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative w-full min-h-[150vh] bg-black overflow-x-hidden pb-20">
      <div className="relative max-w-[1920px] mx-auto">
        {/* Left Side Content */}
        <div className="absolute lg:left-[300px] left-8 right-8 lg:right-auto top-[260px] lg:w-[575px] flex flex-col gap-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-[48px] leading-normal lg:leading-[60px] font-medium text-[#FAFAFA] font-['Familjen_Grotesk'] capitalize z-10"
          >
            Your AI companion exploring the solana blockchain to bring you insights and detailed analytics in real time
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[561px] text-base lg:text-lg leading-[160%] text-[#9097A6] font-['Familjen_Grotesk']"
          >
            Toly is here to help with insights on transactions, tokens, wallets and all activities on the Solana Blockchain
          </motion.p>

          {/* Bottom Image - Connection Point for Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#6FCB71]/20 rounded-full blur-lg" />
              <Image
                src="/wen.png"
                alt="Wen"
                width={100}
                height={100}
                className="relative z-10 rounded-full"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Form Section with Top Decorations */}
        <div className="absolute lg:right-[300px] left-8 right-8 lg:left-auto top-[750px] lg:top-[120px] lg:w-[480px]">
          {/* Top Decorations Container */}
          <div className="relative h-[116px] mb-8 hidden lg:block">
            {/* Diamond - Same size as image */}
            <div className="absolute left-72 top-16 w-[60px] h-[60px] bg-[#C44FE2] transform rotate-45" />
            {/* Top Image */}
            <div className="absolute left-[360px] top-10">
              <Image
                src="/dyor.png"
                alt="Top Wen Cat"
                width={100}
                height={100}
                className="relative z-10 rounded-full"
                priority
              />
            </div>
          </div>

          {/* Squiggly Line - Only visible on desktop */}
          <svg
            className="absolute left-[-700px] top-[-4px] z-0 hidden lg:block"
            width="1050"
            height="800"
            viewBox="0 0 983 744"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 600 C800 900 900 500 900 400 C900 300 300 200 900 150 C800 100 900 85 983 85"
              stroke="url(#squiggly-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="squiggly-gradient"
                x1="50"
                y1="500"
                x2="983"
                y2="85"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6FCB71" />
                <stop offset="1" stopColor="#C44FE2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121417]/80 backdrop-blur-lg rounded-3xl p-6 relative z-10 mb-10"
          >
            <motion.form className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {['name', 'email', 'password'].map((field) => (
                  <motion.div 
                    key={field}
                    className="relative z-20"
                  >
                    <input
                      type={field === 'password' ? 'password' : 'text'}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={formData[field as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full h-16 px-6 bg-black/40 rounded-2xl text-lg text-[#9097A6] font-['Familjen_Grotesk'] outline-none focus:ring-2 focus:ring-[#6FCB71]/20"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                type="submit"
                className="flex justify-center items-center w-full h-16 bg-[#6FCB71] rounded-full mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg font-medium text-black capitalize font-['Familjen_Grotesk']">
                  Sign Me Up With Toly
                </span>
              </motion.button>

              <p className="text-center text-[#9097A6] font-['Familjen_Grotesk'] mt-4">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-[#6FCB71]">
                  Sign In
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;