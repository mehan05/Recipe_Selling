import { Routes,Route } from 'react-router-dom'
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

function App() {
    const {currentUser,setCurrentUser} = useContext(MyContext);
  return (
      <div className='font-Fredoka'>
          <Header/>
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
                  <Route path="user/dashboard/product/:id" element={<RecipeDetails />} />

                  <Route path='user/add-recipe' element={<AddRecepie/>} />
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
