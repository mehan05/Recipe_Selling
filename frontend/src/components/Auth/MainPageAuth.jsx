import React from 'react'
import Login from './Login'
import Register from './Register'

const MainPageAuth = () => {
  return (
    <div className='flex justify-center items-center mt-10 '>
        <div className='w-[600px] border-2 border-red-500 shadow-md shadow-red-500 p-9 rounded-xl '>
            <Login/>
            <Register/>
        </div>
    </div>
  )
}

export default MainPageAuth