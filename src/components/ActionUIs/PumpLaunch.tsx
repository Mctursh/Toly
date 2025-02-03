import { useState } from "react";

export function LaunchTokenOnPump() {
    const [tokenName, setTokenName] = useState('');
    const [ticker, setTicker] = useState('');
    const [createAndBuy, setCreateAndBuy] = useState(false);
    const [amount, setAmount] = useState('');
    const [imageFile, setImageFile] = useState({ name: ''});
    const [imagePreview, setImagePreview] = useState('');
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        // Create a preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    };
  
    const launchOnPump = () => {
      if (!tokenName && !ticker) return;
      console.log('Confirming launch:', tokenName, 'Amount to buy:', amount, 'Image:', imageFile);
      // Add your buy logic here
    };
  
    return (
      <div className="mt-2 p-3 bg-gray-800 text-gray-300 rounded-lg">
        <div className="flex flex-col gap-y-1">
          <div className="text-sm grid grid-cols-2 items-center">
            <div className="col-span-1 text-lg">
              Launch Token on PumpFun
            </div>
          </div>
          
          <div className="mt-2 flex flex-col">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter ticker e.g $DOGS"
              className="flex-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <input
              type="text"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Enter name"
              className="flex-1 p-2 mt-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
  
            {/* Image Upload Section */}
            <div className="mt-2">
              <label className="block mb-2 text-sm">Token Image</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="cursor-pointer flex items-center justify-center p-2 border-2 border-dashed border-gray-600 rounded hover:border-green-500">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="text-sm">
                      {imageFile ? imageFile.name : 'Upload Image'}
                    </span>
                  </label>
                </div>
                {imagePreview && (
                  <div className="w-12 h-12">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
  
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="createAndBuy"
                checked={createAndBuy}
                onChange={(e) => setCreateAndBuy(e.target.checked)}
                className="w-4 h-4 rounded bg-gray-700"
              />
              <label htmlFor="createAndBuy" className="text-sm">
                Create and Buy Token
              </label>
            </div>
  
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${createAndBuy ? 'max-h-20 mt-2' : 'max-h-0'}`}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to buy..."
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
  
            <button
              onClick={launchOnPump}
              className="bg-green-600 mt-3 hover:bg-green-700 px-4 py-2 rounded-sm w-full"
            >
              {createAndBuy ? 'Launch and Buy Token' : 'Launch Token on Pump'}
            </button>
          </div>
        </div>
      </div>
    );
}