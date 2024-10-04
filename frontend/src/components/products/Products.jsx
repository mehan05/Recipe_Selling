import { useContext, useEffect } from 'react';
import MyContext from '../context/ContextAPI';
import axios from 'axios';

const Products = () => {
  const { RecipeDetails, setRecipeDetails,activeCard,setactiveCard } = useContext(MyContext);
  console.log(RecipeDetails)

  const removeDuplicates = (array) => {
    return array.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.name === item.name && t.price === item.price
      ))
    );
  };

  const setActiveCardFunc = (index)=>{
      
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/images");
        const newData = response.data.imagesData.flat();
        const combinedData = [...RecipeDetails, ...newData];
        const uniqueData = removeDuplicates(combinedData);
        setRecipeDetails(uniqueData);
        
      } catch (error) {
        console.log(error);
      }
    };  
    fetchData();
  }, []);
  console.log(RecipeDetails)
  return (
    <div>
      {RecipeDetails && RecipeDetails.length > 0 ? (
        RecipeDetails.map((item, index) => (
          <ul key={index} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li >
              <a href="#" className="group block overflow-hidden border-2 border-red-500 rounded-xl p-2">
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
      ) : (
        <p>No recipes available</p>
      )}
    </div>
  );
};

export default Products;
