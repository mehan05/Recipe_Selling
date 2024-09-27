import { Routes,Route } from 'react-router-dom'
import './App.css'
import AddRecepie from './components/AddRecepie/AddRecepie'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/header/Header'
function App() {

  return (
      <div className='font-Fredoka'>
          <Header/>
        <Routes>
          
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/add-recipe' element={<AddRecepie/>} />
        </Routes>

          
          <div>
            <h1>Hello</h1>
          </div>
    </div>
  )
}

export default App
