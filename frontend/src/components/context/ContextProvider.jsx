import React, { useState } from 'react'
import MyContext from './ContextAPI';

const ContextProvider = ({children}) => {
    const[RecipeDetails,setRecipeDetails] = useState([]);
    const[activeCard,setactiveCard] = useState();
    const[currentUser,setCurrentUser] = useState("");

  return (

    <MyContext.Provider value={{RecipeDetails,setRecipeDetails,activeCard,setactiveCard,currentUser,setCurrentUser}}>
        {children}
    </MyContext.Provider>

  )
}

export default ContextProvider