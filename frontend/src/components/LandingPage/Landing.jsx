import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    const[toogle,settoogle] = useState(false);
    console.log(toogle  )
    const handleGetStarted = ()=>{

    }
  return (
    <div className="bg-[#D8C3A5] rounded-xl mt-3 h-[650px] ">
      <section className=''>
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
