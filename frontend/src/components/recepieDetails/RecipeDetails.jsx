import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/ContextAPI';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { currentUser,setCurrentUser } = useContext(MyContext);
  const [currData, setCurData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchFunc(); 
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

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

  const handleBuy = async()=>{
    console.log("Buyer clicked");
  }


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
              <div className='w-full flex flex-col border-2 border-red-500 shadow-lg shadow-red-500 p-6 rounded-xl bg-[#f8f1e7]'>
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
                      Allergens:
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
                  className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg'
                  onClick={handleBuy}
                >
                 Buy
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
