import React, { useState } from 'react';
import Products from '../products/Products';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };



  return (
    <div className='bg-[#D8C3A5] rounded-xl mt-3'>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>

            <div className='border-2 m-3 p-4 border-red-600 rounded-xl text-lg'>
              <p className="mt-4 w-full text-black">
                Welcome to DSRW, a vibrant community where food lovers can discover and share delicious recipes from around the world. Explore a diverse collection of dishes, connect with fellow culinary enthusiasts, and contribute your own creations. Join us in celebrating the joy of cooking and savoring new flavors!
              </p>
            </div>
           
          </header>

          <div className="mt-4">
          <h2 className="text-xl mb-3 pt-6 font-bold text-gray-900 sm:text-3xl">Search Recipes</h2>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for recipes..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-red-600"
            />
          </div>
         

          <h2 className="text-xl  pt-6 font-bold text-gray-900 sm:text-3xl">Top Recipes</h2>

          
          

          <Products searchQuery={searchQuery} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
