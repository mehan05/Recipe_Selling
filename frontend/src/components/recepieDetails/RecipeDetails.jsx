import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/ContextAPI';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

const RecipeDetails = () => {
  const { currentUser,setCurrentUser } = useContext(MyContext);
  const [currData, setCurData] = useState(null);
  const[username,setUsername]  = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const[buyToogle,setBuyToogle] = useState(false);
  const[ButtonProductId,setButtonProductId] = useState("");
  const { id } = useParams();
  const[BuyerWalletAddress,setBuyerWalletAddress] = useState("");
  const[gettingChefAddressFromDB,setGettingChefAddressFromDB] = useState("");
  console.log(currData);

  const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await api.get(`/image/${id}`);
        setCurData(response.data);
        setGettingChefAddressFromDB(response.data[0]?.chefAddress);     
        setUsername(response.data[0]?.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFunc(); 
  }, [id]);

  useEffect(()=>{
    const checking = async()=>{
      await checkBought();

    }
    checking();
  },[buyToogle])

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const checkBought = async()=>{

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    try {
      const signerAddress = await signer.getAddress();
    const response = await axios.post("http://localhost:3000/checkBought",{
      signer:signerAddress,
      id
   
    });
    if(response.status===200)
    {
      setBuyToogle(true)
      setButtonProductId(response.data.id);
    }
    console.log("RecipeBought:",response.data);
  } 
  catch (error) {
      console.log(error)
      return;
  }


  }

  const handleChange = (field, value) => {
    setCurData((prevData) => {
      const newData = [...prevData];
      newData[0][field] = value; 
      return newData;
    });
  };

  const handleSave = async () => {
    try {
      console.log( currData[0]);
      await api.put(`/image/${id}`, currData[0],{
        headers:{
          "Content-Type":"application/json"
        }
      }); 
      setIsEditing(false);
      console.log('Updated successfully');
    } catch (error) {
      console.log('Error updating:', error);
    }
  };

  const fetchingUserAddress = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        setBuyerWalletAddress(accounts[0]);
      } else {
        alert('Please install MetaMask or use a Web3 browser');
      }
    } catch (error) {
      console.error('Error fetching wallet address:', error);
      alert('Could not fetch wallet address');
    }
  };  
  
  const handleBuy = async () => {
    await fetchingUserAddress();
    console.log(id);
    try {
      if (
        gettingChefAddressFromDB &&
        gettingChefAddressFromDB !== BuyerWalletAddress &&
        currData &&
        currData[0]?.price
      ) {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
  
        const amountInEther = ethers.parseEther(currData[0].price.toString());
        try {
            const signerAddress = await signer.getAddress();
          const response = await axios.post("http://localhost:3000/buy",{
            signer:signerAddress,
            username,
            id,
            price:currData[0].price.toString()
          });
          console.log("RecipeBought:",response.data);
        } 
        catch (error) {
            console.log(error)
            return;
        }

  
        alert('Please confirm the transaction in MetaMask');
  
        const tx = await signer.sendTransaction({
          to: gettingChefAddressFromDB,
          value: amountInEther,
        });
  
        await tx.wait();
   
        alert('Transaction Successful');
        checkBought();
      } else {
        alert('Problem with the addresses or missing price');
      }
    } catch (error) {
      console.error('Transaction error:', error);
      alert('Transaction failed: ' + (error.message || 'Unknown error occurred'));
    }
  };
  

  return (
    <div className='flex justify-center m-4'>
      <div className='border-2 bg-[#d8c3a5] border-red-500 shadow-md shadow-red-500 p-5 rounded-lg min-w-[1000px] mb-[-4]'>
        {currData ? (
          <div className='flex'>
            <div className='max-w-[300px] max-h-[500px] mt-8 mr-6'>
              <img
                className='object-cover rounded-xl border-red-500 shadow-md shadow-red-500 w-full h-full transition-transform duration-300 ease-in-out hover:scale-105'
                src={`http://localhost:3000${currData[0].image?.filePath}`}
                alt={currData[0].image?.name || "Default Image"}
              />
            </div>

            <div className='w-full flex-grow relative mt-10'>
              <div className='w-full flex flex-col    p-6 rounded-xl bg-[#f8f1e7]'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Name: 
                  {isEditing ? (
                    <input 
                      type="text"
                      value={currData[0].name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className='ml-2 border border-gray-300 rounded-lg p-1'
                    />
                  ) : (
                    currData[0].name
                  )}
                  <br />
                </h2>

                <p className='text-lg text-gray-700 mt-2'>
                  Price: ₹
                  {isEditing ? (
                    <input 
                      type="number"
                      value={currData[0].price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      className='ml-2 border border-gray-300 rounded-lg p-1'
                    />
                  ) : (
                    currData[0].price
                  )}
                </p>
                <p className='text-lg text-gray-700 mt-2'>
                 Chef Address: {currData[0].chefAddress}      
                </p>  

                </div>
                <div className='mb-4'>
                  <h3 className='font-semibold text-lg text-gray-900'>
                    Description:
                  </h3>
                  <textarea
                    className='mt-2 w-full h-40 border-2 border-gray-300 p-2 rounded-lg text-gray-700'
                    readOnly={!isEditing}
                    value={currData[0].description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                {currentUser==='chef'&&
                  <>
                  
                  <h3 className='font-semibold text-lg text-gray-900'>
                    Recipe:
                  </h3>
                  <textarea
                    className='mt-2 w-full h-40 border-2 border-gray-300 p-2 rounded-lg text-gray-700'
                    readOnly={!isEditing}
                    value={currData[0].recepie}
                    onChange={(e) => handleChange('recepie', e.target.value)}
                  />
                  </>
                }

                {currData[0].allergents && currData[0].allergents.length > 0 && (
                  <div className='mb-4'>
                    <h3 className='font-semibold text-lg text-gray-900'>
                      Allergents:
                    </h3>
                    <ul className='list-disc ml-5 mt-2'>
                      {currData[0].allergents.map((allergen, index) => (
                        <li key={index} className='text-gray-700'>
                          {isEditing ? (
                            <input 
                              type="text"
                              value={allergen}
                              onChange={(e) => {
                                const newAllergens = [...currData[0].allergents];
                                newAllergens[index] = e.target.value;
                                handleChange('allergents', newAllergens);
                              }}
                              className='border border-gray-300 rounded-lg p-1'
                            />
                          ) : (
                            allergen
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {currentUser==='chef'&&
                    <>
                    
                    <div className='flex justify-between mt-4'>
                      <div className='text-lg'>
                        <span className='font-semibold text-gray-900'>Income:</span>
                      
                          <p className='ml-2 text-gray-700'>{currData[0].Income}</p>
                      </div>
                      <div className='text-lg'>
                        <span className='font-semibold text-gray-900'>Bought:</span>
                      
                          <p className='ml-2 text-gray-700'>{currData[0].Bought}</p>
                      </div>
                    </div>
                    </>
                }

                { currentUser=='chef'?(

                <button 
                  className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg'
                  onClick={isEditing ? handleSave : handleEditToggle}
                > 
                  {isEditing ? 'Save Changes' : 'Edit'}
                </button>
                ):(
                <button 
                  className={buyToogle && ButtonProductId===id?"mt-4 bg-green-500 text-white px-4 py-2 rounded-lg":"mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"}
                  onClick={handleBuy}
                >
                  {buyToogle  && ButtonProductId===id?"Bought":"Buy"}
                 
                </button>

                )

                }
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
