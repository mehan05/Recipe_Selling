import React, {  useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/ContextAPI';
const Login = () => {
  const {setCurrentUser} = useContext(MyContext)
  const [address,setAddress] = useState('');
  const [username,setUsername] = useState('');
  const navigate =  useNavigate();
  const api = axios.create({
    baseURL:"http://localhost:3000",
    headers:{
      "Content-Type":"application/json"
    }
  });
  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      const response = await api.post('/login',{
        username,
        address
      })
      console.log(response);
      if(response.status==200)
      {
        alert("Login Successful");
        console.log("alert")
        
        navigate("") 
      }
      else if(response.status==202)
      {
        navigate("/chef/dashboard");
      }
      else if(response.status==203)
      {
        navigate("/user/dashboard");
      }
      
    } catch (error) {
       
      if (error.response) {
         if (error.status==404) {
          alert('User not found. Please register!');
          navigate("/register")
          return;
        } 
        else{

          console.log(`Error Status: ${error.response.status}`);
          return;
        }
      } else if (error.request) {
        console.log("No response received", error.request);
        alert('Server did not respond. Please try again later.');
      } 
     
      else {
        console.log('Error', error.message);
        alert('An error occurred. Please try again.');
      }        
    }
  }
  return (
    <div>
           <div className='bg-[#D8C3A5] rounded-xl mt-3'>
      <section>
        <div className="mx-auto max-w-screen-md px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

            <div className='flex justify-center'>
                <h1 className=' font-semibold text-2xl'>Login</h1>

            </div>


          <form className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md" onSubmit={handleLogin}>
            <div className="mb-5">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                onChange={(e)=>setAddress(e.target.value)}
                type="text"
                id="address"
                value={address}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Wallet Address"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900">
                UserName
              </label>
              <input
              onChange={(e)=>setUsername(e.target.value)}
                type="text"
                id="Username"
                value={username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

          
            <button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Login 
            </button>
          </form>
        </div>
      </section>
    </div>
    </div>
  )
}

export default Login