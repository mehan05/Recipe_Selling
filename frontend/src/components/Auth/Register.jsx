import React from 'react';

const Register = () => {
  return (
    <div className='bg-[#D8C3A5] rounded-xl mt-3'>
      <section>
        <div className="mx-auto max-w-screen-md px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

            <div className='flex justify-center'>
                <h1 className=' font-semibold text-2xl'>Register</h1>

            </div>


          <form className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-5">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Wallet Address"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900">
                UserName
              </label>
              <input
                type="text"
                id="Username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <div className='flex '>

                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            required
                            />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                            Are you a Chef
                        </label>
                    </div>
                    <div className="flex items-start mb-5 ml-40">

                        <div className="flex items-center h-5">
                            <input
                            id="remember"
                            type="checkbox"
                            className="w-4 h-4 border  border-gray-300 rounded bg-gray-50 focus:ring-7 focus:ring-red-700"
                            required
                            />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                                 Are you a User
                        </label>
                    </div>
            </div>
            <button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
