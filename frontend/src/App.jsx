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

function App() {

  return (
      <div className='font-Fredoka'>
          <Header/>
        <Routes>
          
          <Route path='/dashboard' element={<Dashboard/>} />
              <Route path="dashboard/product/:id" element={<RecipeDetails />} />
          <Route path='/add-recipe' element={<AddRecepie/>} />
          <Route path='/auth-page' element={<MainPageAuth/>} />
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
          <Route/>
        </Routes>

      
    </div>
  )
}

export default App
