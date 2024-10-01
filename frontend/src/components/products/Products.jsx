import {useContext,useEffect, useState} from 'react';
import product from "/spiderman-3.jpeg"
import MyContext from '../context/ContextAPI';
import axios from 'axios';
const Products = () => {
  const { RecipeDetails, setRecipeDetails } = useContext(MyContext);

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        
        const response = await axios.get("http:localhost:3000/images");
        setRecipeDetails((prev)=>[...prev,response.data]);
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
      RecipeDetails.map((items, val) => (
        <ul key={val} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <a href="#" className="group block overflow-hidden border-2 border-red-500 rounded-xl p-2">
              <img
                src={items.image || product}
                alt="Product Image"
                className="rounded-xl object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
              />
              <div className="relative bg-white mt-2 rounded-lg pt-1">
                <p>
                  <span className="sr-only">Regular Price</span>
                  <span className="tracking-wider p-1 block text-gray-900">{items.name}</span>
                  <span className="tracking-wider p-1 text-gray-900">₹{items.price}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      ))
    ) : (
      <p>No recipes available</p>
    )}
  </div>
  );
};

export default Products;
