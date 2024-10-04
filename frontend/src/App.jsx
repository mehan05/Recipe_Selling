import { Routes,Route } from 'react-router-dom'
import './App.css'
import { Link } from 'react-router-dom'
import AddRecepie from './components/AddRecepie/AddRecepie'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
import RecipeDetails from './components/recepieDetails/RecipeDetails'
function App() {

  return (
      <div className='font-Fredoka'>
          <Header/>
            <Link to="recipe-details">Recipe Details</Link>
        <Routes>
          
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/add-recipe' element={<AddRecepie/>} />
          <Route path='/recipe-details' element={<RecipeDetails/>} />
        </Routes>

          
      
    </div>
  )
}

export default App
