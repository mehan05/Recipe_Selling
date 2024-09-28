import React, { useState } from 'react'
import MyContext from './ContextAPI';

const ContextProvider = ({children}) => {
    const[RecipeDetails,setRecipeDetails] = useState([]);

  return (

    <MyContext.Provider value={{RecipeDetails,setRecipeDetails}}>
        {children}
    </MyContext.Provider>

  )
}

export default ContextProvider