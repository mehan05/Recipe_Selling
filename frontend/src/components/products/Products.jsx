import {useContext,useEffect, useState} from 'react';
import product from "/spiderman-3.jpeg"
import MyContext from '../context/ContextAPI';
import axios from 'axios';
const Products = () => {
  const { RecipeDetails, setRecipeDetails } = useContext(MyContext);
  // console.log(RecipeDetails[0].image);
  console.log(RecipeDetails);

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        
        const response = await axios.get("http://localhost:3000/images");
        setRecipeDetails((prev)=>[...prev,response.data.imagesData]);
        console.log(response)

      } catch (error) {
          console.log(error);
      }
    }
    fetchData();
  },[])

  // useEffect(() => {
    
  //   RecipeDetails && RecipeDetails.map((items)=>{
  //     console.log(items.data)
  //   })
  // }, [RecipeDetails]);

  return (
    <div>
    {RecipeDetails && RecipeDetails.length > 0 ? (
      RecipeDetails.map((innerArray, outerIndex) =>
        innerArray.map((item, index) => (
          <ul key={`${outerIndex}-${index}`} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <a href="#" className="group block overflow-hidden border-2 border-red-500 rounded-xl p-2">
                {
                  console.log(`http://localhost:3000${item.image?.filePath}`)
                }
                <img
                  src={`http://localhost:3000${item.image?.filePath}`}
                  alt={item.image?.name || "Default Image"}
                  className="rounded-xl object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
                <div className="relative bg-white mt-2 rounded-lg pt-1">
                  <p>
                    <span className="tracking-wider p-1 block text-gray-900">{item.name}</span>
                    <span className="tracking-wider p-1 text-gray-900">₹{item.price}</span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        ))
      )
    ) : (
      <p>No recipes available</p>
    )}
  </div>
  );
};

export default Products;
