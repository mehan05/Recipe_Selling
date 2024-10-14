import { Routes,Route, useLocation } from 'react-router-dom'
import './App.css'
import AddRecepie from './components/AddRecepie/AddRecepie'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import RecipeDetails from './components/recepieDetails/RecipeDetails'
import MainPageAuth from './components/Auth/MainPageAuth'
import Landing from './components/LandingPage/Landing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { useContext } from 'react'
import MyContext from './components/context/ContextAPI'
import MyRecipe from './components/my-recipe/MyRecipe'

function App() {
    const {currentUser,setCurrentUser} = useContext(MyContext);
    setCurrentUser(localStorage.getItem("currentUser"));
    console.log("current user from app.jsx",currentUser)
    const location = useLocation();
    console.log("location:",location.pathname)
  return (
      <div className='font-Fredoka '>
        {!(location.pathname==="/" || location.pathname==="/login" ||location.pathname==="/register")&& <Header/>}
         
        <Routes>
          {
            currentUser==='chef'?(
                <>
                
                  <Route path='chef/dashboard' element={<Dashboard/>} />
                  <Route path="chef/dashboard/product/:id" element={<RecipeDetails />} />
                  <Route path='chef/add-recipe' element={<AddRecepie/>} />
                </>
            ):(
              <>
              
              <Route path='user/dashboard' element={<Dashboard/>} />
                  <Route path='/user/my-recipe' element={<MyRecipe/>} />
                  <Route path="user/dashboard/product/:id" element={<RecipeDetails />} />
                  <Route path="user/my-recipe/product/:id" element={<RecipeDetails />} />

              </>
            )
          }
          <Route path='/auth-page' element={<MainPageAuth/>} />
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
        </Routes>

      
    </div>
  )
}

export default App
