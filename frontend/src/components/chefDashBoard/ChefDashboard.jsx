import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ChefDashboard = () => {

   const [myRecipe, setMyRecipe] = useState([]);
    const navigate = useNavigate();
    const[chefAccount, setChefAccount] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRecipes = myRecipe.filter((recipe) => {
    
        return recipe.name && typeof recipe.name === 'string'
            ? recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
            : false; 
    });

    const setActiveCardFunc = (id) => {
        navigate(`product/${id}`);
      };
    

    useEffect(() => {
        const FetchingRecipe = async () => {
            try {
                const fetchAddress = async () => {
                    if (!window.ethereum) {
                        return null;
                    }

                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer1 = await provider.getSigner();
                    const signer = await signer1.getAddress();

                    return signer;
                };

                const signer = await fetchAddress();

                if(window.ethereum) {
                        window.ethereum.on("accountsChanged", (account) => {
                                setChefAccount(account[0]);
                                console.log("accont changed",account);
                        })
                }

                if (!signer) {
                    return;
                }

                const response = await axios.post("http://localhost:3000/chef-recipe", {
                    signer
                });

                const recipesData = Array.isArray(response.data) ? response.data : [response.data]; 
                setMyRecipe(recipesData);
            } catch (error) {
                console.error("Error fetching recipe data:", error);
            }
        };

        FetchingRecipe();
    }, [chefAccount]);

    console.log("myRecipe", myRecipe);

  return (
    <div className='bg-[#D8C3A5] rounded-xl mt-3'>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header>
  
              <div className='border-2 m-3  flex justify-center items-center p-4 border-red-600 rounded-xl text-lg'>
                <p className="mt-4 text-center text-3xl w-full text-black">
                        Chef DashBoard
                </p>
              </div>
              <p className='text-3xl font-semibold m-4'>Add Recipe:</p>
              <div className='flex justify-center w-full '>

                <Link to="/chef/dashboard_2/add-recipe">
                
                <div className='border-2 m-3  flex justify-center items-center p-2 w-[500px] hover:bg-red-600 hover:text-whitehover:transition-transform duration-500 hover:scale-105 hover:cursor-pointer hover:border-white hover:border-3 border-red-600 rounded-xl text-lg'>
                    <p className="mt-4 text-center text-xl hover:text-white  text-black">
                            Add New Recipe
                    </p>
                </div>
                </Link>
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
           
             <div className='flex flex-col items-center'>
      {filteredRecipes && filteredRecipes.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {filteredRecipes.map((item, index) => (
            <li key={index} onClick={() => setActiveCardFunc(item.id)} className="cursor-pointer">
              <a href="#" className="block overflow-hidden border-2 border-red-500 rounded-xl shadow-lg transition-shadow duration-200 hover:shadow-xl">
                <img
                  src={`http://localhost:3000${item.image?.filePath}`}
                  alt={item.image?.name || "Default Image"}
                  className="rounded-xl object-cover w-full h-60 transition-transform duration-200 transform hover:scale-105 will-change-transform"
                />
                <div className="relative bg-white mt-2 rounded-lg pt-1 p-3">
                  <p>
                    <span className="tracking-wider p-1 block text-gray-900 font-semibold">{item.name}</span>
                    <span className="tracking-wider p-1 text-gray-900">₹{item.price}</span>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes available</p>
      )}
    </div>
            
            
  
          </div>
        </section>
      </div>
  )
}

export default ChefDashboard