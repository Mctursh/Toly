"use client"
import { toast } from '@/hooks/useToast';
import { ellipsify } from '@/utils';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { FaDiscord, FaTwitter, FaGithub, FaTelegram, FaClipboard } from 'react-icons/fa';
import GenerateWalletModal from "../Modal/GenerateWalletModal";
import { useApi } from '@/hooks/useHttp';
import { Actions, useChatContext } from '../Context/ChatProvider';
import ConfirmRevokeModal from '../Modal/ConfirmRevokeModal';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type settingsProp = {
  address: string,
  inAppWallet?: string
  dispatch: Dispatch<Actions>
}

const Settings = ({ address, inAppWallet, dispatch }: settingsProp) => {
  const { state } = useChatContext()
  const { logOut } = useAuth()
  const router = useRouter();
  const { post, del } = useApi()
  const [showModal, setShowModal] = useState(false)
  const [isModalLoading, setIsModalLoading] = useState(false)
  const [isRevoked, setRevoked] = useState(false)
  const [showRevokeModal, setRevokeModal] = useState(false)
  const [privateKey, setPrivateKey] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [error, setError] = useState('')
  const [countDown, setCountDown] = useState(5)


  const handleCopyWallet = () => {
    navigator.clipboard.writeText(publicKey)
    .then(() => {
      toast.success("Copied")
    })
    .catch(() => {
      toast.error("Failed to copy address")
    });
  }

  useEffect(() => {
    if(!inAppWallet) return
    setPublicKey(inAppWallet)
    return () => {}
  }, [inAppWallet])

  useEffect(() => {
    if(!isRevoked) return
    async function run(){
      if (countDown == 0) {
        await logOut()
        await state.logOutHandler()
        router.push('/');
        dispatch({
          type: "LOGOUT"
        })
        setRevoked(false)
      }
  
      const timer = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    run()

  }, [countDown, isRevoked])
  

  const generateWallet = async() => {
    try {
      setIsModalLoading(true)
      setShowModal(true)

      const response = await post(`user/create-new-wallet/${address}`)
      console.log(response);

      const data = response?.data.data
      setPrivateKey(data.privateKey)
      setPublicKey(data.publicKey)
      

    } catch (error) {
      setError("Failed to generate wallet")
      console.log("Failed to generate wallet", error);
    } finally {
      setIsModalLoading(false)
    }
  }

  const handleClosePrivateKeyModal = () => {
    setShowModal(!showModal)
    setPrivateKey('')
    dispatch({
      type: 'ADD IN APP WALLET',
      payload: publicKey
    })
  }
  
  const handleCloseRevokeModal = () => {
    setRevokeModal(false)
    setIsModalLoading(false)
  }

  const handleRevokeConfirmation = () => {
    setRevokeModal(true)
  }
  
  const revokeWallet = async() => {
    setIsModalLoading(true)
    try {
      await del(`user/revoke/${address}`)
      toast.success("Succcessfully Revoked Wallet")
      setPublicKey('')
      
      dispatch({
        type: 'ADD IN APP WALLET',
        payload: ''
      })
      
      setRevoked(true)
      setIsModalLoading(false)

    } catch (error) {
      toast.error("Failed to Revoked Wallet")
    }
    
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
              {
                inAppWallet || publicKey ?
                (
                  <div className="flex items-center gap-x-3">
                    <button onClick={handleRevokeConfirmation} className="flex justify-center align-center py-1 px-3 bg-red-500/10 border border-red-500 rounded-full text-red-500 text-sm">
                      Revoke
                    </button>

                    <button onClick={handleCopyWallet} className="flex items-center gap-x-4 px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors w-full md:w-auto text-center">
                      <span>{ellipsify(publicKey, 8)}</span>
                      <FaClipboard className='text-gray-400' />
                    </button>
                  </div>
                )
                :
                (
                  <button 
                  className='rounded-lg text-base bg-[#6FCB71] px-4 py-1 text-white'
                  onClick={generateWallet}
                >
                  Generate wallet
                </button>
                )
              }
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

      <GenerateWalletModal
        isOpen={showModal}
        isLoading={isModalLoading}
        privateKey={privateKey}
        error={error}
        onClose={handleClosePrivateKeyModal}
        onClickHandler={() => {}}
        />

      <ConfirmRevokeModal 
        isOpen={showRevokeModal}
        isLoading={isModalLoading}
        onClose={handleCloseRevokeModal}
        onConfirm={revokeWallet}
        isRevoked={isRevoked}
        countDown={countDown}
      />
    </div>
  );
};

export default Settings;