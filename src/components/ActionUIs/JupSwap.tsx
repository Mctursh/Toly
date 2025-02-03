import React from 'react'

export default function SwapOnJupiter() {
    const SwapOnJup = () => {
    //   if () return;
      console.log('Confirming launch:');
      // Add your buy logic here
    };
  
    return (
      <div className="mt-2 p-3 bg-gray-800 text-gray-300 rounded-lg">
        <div className="flex flex-col gap-y-1">
        <div className="text-sm grid grid-cols-1 items-center justify-items-center">
        <div className="text-lg">
            Swap token on Jupiter
        </div>
        </div>

          <div className="w-full flex justify-center flex-col items-center gap-x-2 mt-2">
            <img
              className="w-[60px] h-[60px] rounded-md"
              src="https://ipfs.io/ipfs/Qmd9aU8WuzDqfsGkz82KAZeNLRwnRGzL4fih4aZ3tQ6ZUv"
              alt="Token"
            />
            <div className='text-center mt-4'>
                <code>EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v</code>
                <div>1 $USDC</div>
            </div>
          </div>

          {/* Animated Arrow */}
        <div className="flex justify-center my-4">

            <div className="w-[2px] h-[50px] inset-[2px] bg-white rounded-full flex items-center justify-center">

            </div>
        </div>

        <div className="w-full flex justify-center flex-col items-center gap-x-2 mt-2">
            <img
              className="w-[60px] h-[60px] rounded-md"
              src="https://ipfs.io/ipfs/Qmd9aU8WuzDqfsGkz82KAZeNLRwnRGzL4fih4aZ3tQ6ZUv"
              alt="Token"
            />
            <div className='text-center mt-4'>
                <code>FLJYGHpCCcfYUdzhcfHSeSd2peb5SMajNWaCsRnhpump</code>
                <div>40 $STORE</div>
            </div>
          </div>
          
          <div className="mt-2 flex flex-col">
          <button
              onClick={SwapOnJup}
              className="bg-green-600 mt-3 hover:bg-green-700 px-4 py-2 rounded-sm w-full"
            >
              Swap on Jupiter
            </button>
          </div>
        </div>
      </div>
    );
}