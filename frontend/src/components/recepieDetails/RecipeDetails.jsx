import React,{useContext} from 'react'
import MyContext from '../context/ContextAPI';
const RecipeDetails = () => {
    const { RecipeDetails, setRecipeDetails,activeCard,setactiveCard } = useContext(MyContext);
    console.log(RecipeDetails)
  return (
    <div className='flex justify-center m-4  '>
        
        <div className='border-2 bg-[#d8c3a5] border-red-500 shadow-md shadow-red-500 p-5 rounded-lg min-w-[1000px] min-h-[600px]'>
                {
                    RecipeDetails&&RecipeDetails.length>0?(
                                RecipeDetails.map((innerArr,key_1)=>(
                                    <div className='m-5 flex' key={key_1}>
                                        {
                                              [innerArr].map((item,key_2)=>(                                                    
                                                <div  key={key_2} className='max-w-[300px] max-h-[500px] mt-8'>
                                                        <img className='object-cover  rounded-xl  border-red-500 shadow-md shadow-red-500  w-full h-full transition-transform duration-300 ease-in-out hover:scale-105'  src={`http://localhost:3000${item.image?.filePath}`}alt={item.image?.name || "Default Image"} />
                                                </div>
                                           
                                            ))

                                        }

                                    </div>
                                    
                                ))
                                      
                    ):(
                        <p>No data</p>
                    )
                }
               
        </div>
        
    </div>
  )
}

export default RecipeDetails