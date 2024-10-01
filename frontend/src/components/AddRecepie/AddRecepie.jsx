import React, { useContext, useState ,useEffect} from 'react';
import MyContext from '../context/ContextAPI';
import axios from "axios";
const AddRecepie = () => {
  // const { RecipeDetails, setRecipeDetails } = useContext(MyContext);
  const [imageFile, setImageFile] = useState();
  const [image, setPreview] = useState(null);

  // State variables for input fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [recipe, setRecipe] = useState('');
  const [dishType, setDishType] = useState('Indian'); 
  const[allergents,setAllergents] = useState([]);
  const[InputAllergent,setInputAllergent] = useState("");
  const [flagForRerender,setflagForRerender] = useState(0);
  
  // useEffect(() => {
  //   console.log("Updated RecipeDetails:", RecipeDetails);
  // }, [RecipeDetails]);


  const addAllergents = (e)=>{
    if(e.key==='Enter') 
      {
        if(InputAllergent.trim())
          {
            e.preventDefault();
            setAllergents([...allergents, InputAllergent.trim()]);
            setInputAllergent('')
          }

      }
  
  } 

  const deleteAllergents   = (val)=>{
    const index = allergents.indexOf(val);
    allergents.splice(index,1);
    setflagForRerender((prev)=>prev?0:1);
  }

  const displayImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Clicked")
    const formData = new FormData();
    formData.append('image',imageFile);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('recipe', recipe);
    formData.append('dishType', dishType);
    formData.append('allergents', JSON.stringify(allergents));

    const api = axios.create({
        baseURL:"http://localhost:3000",
        headers:{
          "Content-Type":"multipart/form-data"
        }
    })
    try {
      console.log("Sending request...");
      const response = await api.post('/upload', formData);
        // setRecipeDetails((prev)=>[...prev,response.data])
      // console.log(RecipeDetails)
      console.log("Response received:", response.data);
      console.log("Response Type received:", typeof(response.data));
      alert("Data Uploaded");
    } catch (error) {
      console.error("Error occurred:", error);
      alert("ERROR");
    }
  };

  return (
    <div className=' h-auto  border-2 mt-1 rounded-xl p-5 bg-[#D8C3A5] '>
      <div className='flex justify-center'>
        <h1 className='text-3xl mt-4 font-semibold underline-offset-3 underline'>Add Recipe</h1>
      </div>

      <div className='flex justify-around mt-3'>
        <div className='flex flex-col border-3 border-red-500 p-5 rounded-lg items-center mt-7'>
          <input
            type="file"
            accept='image/*'
            id='fileInput'
            className='hidden'
            onChange={displayImage}
          />
          {image ? (
            <img className="rounded-xl w-96 max-h-[500px]" src={image} alt="image description" />
          ) : (
            <label
              htmlFor='fileInput'
              className='border-[4px] border-dashed border-red-500 rounded-xl hover:-translate-y-5 duration-300 hover:border-[6px]'
            >
              <div className='w-96 h-96 flex items-center justify-center'>
                <span className='font-bold text-lg'>Upload Image</span>
              </div>
            </label>
          )}
        </div>

        <div className='flex justify-end m-10'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-[700px]'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input
              type="text"
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-2 rounded p-2'
            />

            <label htmlFor="price" className='font-semibold'>Price</label>
            <input
              type="number"
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='mt-2 rounded p-2'
            />

            <label htmlFor="description" className='font-semibold'>Description</label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-2 rounded p-2 resize-none h-20'
            />

            <label htmlFor="recipe" className='font-semibold'>Recipe</label>
            <textarea
              id='recipe'
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
              className='mt-2 rounded p-2 resize-none h-28'
            />


            <label htmlFor="recipe" className='font-semibold'>Allergnets</label>
            <input
              type='text'
              value={InputAllergent}
              onChange={(e)=>setInputAllergent(e.target.value)}
              onKeyDown={addAllergents}
              className='mt-2 rounded p-2'
            />
            {
              allergents.length>0 &&
            <div className='m-1 p-1'>
              {
                allergents.map((val,key)=>(
                  <div key={key} className=' rounded-lg inline-block border-2 border-red-500 bg-[#D8C3A5] p-2 m-1'>
                    <p>{val} <span className='cursor-pointer' onClick={()=>deleteAllergents(val)}>X</span> </p>
                  </div>

                ))
              }
            </div>
            }

            <label htmlFor="options" className='font-semibold'>Dish Type</label>
            <select
              name="options"
              id="options"
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
              className='mt-2 rounded p-2'
            >
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="French">French</option>
            </select>

            <button
              type='submit'
              className='cursor-pointer mt-7 p-3 bg-red-400 text-white hover:bg-red-500 transition-transform transform hover:scale-105 rounded-full'
            >
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecepie;
