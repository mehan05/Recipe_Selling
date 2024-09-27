import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className=' m-5 border-2 border-[#8E8D8A] rounded-lg'>
      <App  className = " bg-[#8E8D8A]"/>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
