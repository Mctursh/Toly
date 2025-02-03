export default function TransferTokens() {
  const TransferTokens = () => {
  //   if () return;
    console.log('Confirming launch:');
    // Add your buy logic here
  };

  return (
    <div className="mt-2 p-3 bg-[#121417] text-gray-300 rounded-lg">
      <div className="flex flex-col gap-y-1">
      <div className="text-sm grid grid-cols-1">
      <div className="text-lg">
          Transfer tokens
      </div>
      </div>

      <div className="mt-3 rounded-lg">
      <div className="flex items-center gap-1 mb-3">
        <span>You are about to transfer</span>
        <span className="font-medium">1</span>
        <span className="font-medium">$USDC</span>
        <img
          className="w-5 h-5 mx-1 rounded-full"
          src="https://ipfs.io/ipfs/Qmd9aU8WuzDqfsGkz82KAZeNLRwnRGzL4fih4aZ3tQ6ZUv"
          alt="USDC Token"
        />
        
        <span>to</span>
      </div>
      
      <div className="mt-2">
        <code className="block p-3 border border-[#427943] shadow-sm rounded text-sm font-mono break-all">
        FxmGwcJW4fQQboEETbYrfMGKebKdEyW1HXiMMShWXbCj
        </code>
      </div>
    </div>
    <div>
      <span className='text-[#6FCB71]'>This transaction will cost you <span className='text-[#67f769]'>0.005</span> SOL</span>
    </div>
        
        <div className="mt-2 flex flex-col">
        <button
            onClick={TransferTokens}
            className="bg-[#6FCB71] mt-3 hover:bg-green-700 text-black px-4 py-2 rounded-sm w-full"
          >
            Confirm transfer
          </button>
        </div>
      </div>
    </div>
  );
}