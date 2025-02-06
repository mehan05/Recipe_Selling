import { useContext, useEffect } from "react";
import MyContext from "../context/ContextAPI";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = ({ searchQuery }) => {
  const { RecipeDetails, setRecipeDetails } = useContext(MyContext);
  const navigate = useNavigate();

  const removeDuplicates = (array) => {
    return array.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.name === item.name && t.price === item.price)
    );
  };

  const setActiveCardFunc = (id) => {
    navigate(`product/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://recipe-sell.onrender.com/images"
        );
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

  const filteredRecipes = RecipeDetails.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      {filteredRecipes && filteredRecipes.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {filteredRecipes.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveCardFunc(item.id)}
              className="cursor-pointer"
            >
              <a
                href="#"
                className="block overflow-hidden border-2 border-red-500 rounded-xl shadow-lg transition-shadow duration-200 hover:shadow-xl"
              >
                <img
                  src={`https://recipe-sell.onrender.com${item.image?.filePath}`}
                  alt={item.image?.name || "Default Image"}
                  className="rounded-xl object-cover w-full h-60 transition-transform duration-200 transform hover:scale-105 will-change-transform"
                />
                <div className="relative bg-white mt-2 rounded-lg pt-1 p-3">
                  <p>
                    <span className="tracking-wider p-1 block text-gray-900 font-semibold">
                      {item.name}
                    </span>
                    <span className="tracking-wider p-1 text-gray-900">
                      ₹{item.price}
                    </span>
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
  );
};

export default Products;
