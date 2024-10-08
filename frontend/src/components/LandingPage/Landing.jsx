import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/ContextAPI';
import {ethers} from "ethers";
const Landing = () => {
    const[toogle,settoogle] = useState(false);
    const{walletAddress,setWalletAddress} = useContext(MyContext)
    console.log(toogle  )
    console.log(walletAddress)
    const {ethereum} = window;
      const handleConnect = async()=>{
          if(typeof ethereum!="undefined")
          {
            try {
              const accounts = await ethereum.request({method:"eth_requestAccounts"});
              console.log(accounts[0]);
              setWalletAddress(accounts[0]);
              
            } catch (error) {
              alert("Error in Connecting Metamask.")
              console.log(error);
              return;
            }
          }
          else{
            alert("Install Metamask");
            return;
          }

      }
      useEffect(()=>{
          const CheckingConnect = async()=>{
            if(typeof window.ethereum !== "undefined")
            { 
              const provider =  new ethers.BrowserProvider(ethereum);
              const accounts =await ethereum.request({method:"eth_accounts"});
              setWalletAddress(accounts[0]);
            }
          }

          ethereum.on("accountsChanged",(accounts)=>{
              if(accounts.length>0)
              {
                setWalletAddress(accounts[0]);
                console.log("accoutn changed",accounts[0]);
                window.location.reload(); 
              }
              else{
                setWalletAddress("");
                alert("cant find account address");
                return;
              }
          })
          CheckingConnect();
      },[])
  return (
    <div className="bg-[#D8C3A5] rounded-xl mt-3 h-[700px] ">
      <section className=''>
        <div className='flex justify-center relative mt-6 items-center'>
          <div className=' absolute top-5'>
              <h1 className=' text-3xl underline underline-offset-4 font-semibold'>🍿 D S R W 🍿</h1>

          </div>
            <div onClick={handleConnect}   className='  absolute top-5 right-5 border-2 border-red-500 shadow-lg shadow-red p-4 rounded-xl hover:bg-red-500 hover:text-white hover:border-dashed hover:border-2 hover:border-white hove:transition-transform duration-300 '> 
                <button className=' font-semibold text-lg'>{walletAddress?walletAddress?.slice(0,4)+"..."+walletAddress?.slice(39,42):"Connect Wallet"}</button>
            </div>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 relative top-20">
          <header>
            <div className='border-2 m-3 p-4 border-red-600 rounded-xl text-lg'>
              <h1 className="text-4xl font-bold text-black mb-4">
                Discover and Sell Exclusive Recipes.
              </h1>
              <p className="mt-4 w-full text-black">
                Join our culinary marketplace where chefs and food lovers can buy and sell unique, handcrafted recipes.
                Whether you're looking to try something new or share your creations with the world, this is the perfect place for you!
              </p>
            </div>
          </header>

          <div className="mt-8 sm:flex sm:items-center sm:justify-between">
            <div className="block sm:hidden">
              <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                <span className="text-sm font-medium">Filters & Sorting</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 rtl:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Get Started</h2>

            <div className="hidden sm:flex sm:gap-4">
                {toogle==false? (

                    walletAddress && 

                      <div className="relative">
  
                          <button onClick={() => settoogle((prev) => !prev)}
   className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900">
                                  Get Started
                          </button>
                      </div>

                    
                ):(
                    <div className='flex justify-between '> 

                            <div className="relative">

                            <Link  to='/login' className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900">
                                Login
                                </Link>
                            </div>
                        <div className="relative ml-10">

                            <Link to="/register"  className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900">
                                Register
                            </Link>
                        </div>
                    </div>
                )

                }
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
