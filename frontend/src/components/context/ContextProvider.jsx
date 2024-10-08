import React, { useState ,useEffect} from 'react'
import MyContext from './ContextAPI';

const ContextProvider = ({children}) => {
    const[RecipeDetails,setRecipeDetails] = useState([]);
    const[activeCard,setactiveCard] = useState();
    const[currentUser,setCurrentUser] = useState("");
    const[walletAddress,setWalletAddress] = useState(()=>{
      return localStorage.getItem('walletAddress')||"";
    });

    useEffect(() => {
      // Update localStorage whenever walletAddress changes
      localStorage.setItem('walletAddress', walletAddress);
    }, [walletAddress])
  return (

    <MyContext.Provider value={{RecipeDetails,setRecipeDetails,activeCard,setactiveCard,currentUser,setCurrentUser,walletAddress,setWalletAddress}}>
        {children}
    </MyContext.Provider>

  )
}

export default ContextProvider