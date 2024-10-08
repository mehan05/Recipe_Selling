import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyContext from '../context/ContextAPI';

const Register = () => {
  const{walletAddress,setWalletAddress} = useContext(MyContext)
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [isChef, setIsChef] = useState("");
  const [isUser, setIsUser] = useState("");
  const navigate = useNavigate();
  const {currentUser,setCurrentUser} = useContext(MyContext)
  console.log("Address from register",walletAddress)
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          window.location.reload(); 
        }
      });
    } else {
      console.error('MetaMask is not installed');
    }
  }, [setWalletAddress]);
    console.log("current User",currentUser)
  
  const handleRegister = async (e) => {
    e.preventDefault();
    if(isUser=="" && isChef=="" )
    {
      alert("please specify that you are a chef or user.");
      return;
    }
    try {
      const response = await api.post('/register', {
        username,
        walletAddress,
        isChef,
        isUser,
      });

      if (response.status === 201) {
        alert('Registration successful');
        navigate('/login'); 
      } 
      else if (response.status === 202) {
        alert('User already registered Please Login');
        navigate('/login'); 
      }
      else if(response.status===203){
        setCurrentUser("chef");
        localStorage.setItem('currentUser',"chef")
            navigate("/chef/dashboard");
          }
          else if(response.status===204){
            setCurrentUser("user");
            localStorage.setItem('currentUser',"user");
            navigate("/user/dashboard");
      }
      else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className='bg-[#D8C3A5] rounded-xl mt-3'>
      <section>
        <div className="mx-auto max-w-screen-md px-4 py-8 sm:px-6 sm:py-12 lg:px-8 h-[700px]">
          <div className='flex justify-center'>
            <h1 className=' font-semibold text-2xl'>Register</h1>
          </div>

          <form className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-lg shadow-md" onSubmit={handleRegister}>
            <div className="mb-5">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                defaultValue={walletAddress}
                type="text"
                id="address"
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Wallet Address"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                id="Username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <div className='flex'>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                  name='position'
                    id="chef"
                    type="radio"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    checked={isChef}
                    onChange={() => setIsChef(!isChef)} 
                  />
                </div>
                <label htmlFor="chef" className="ml-2 text-sm font-medium text-gray-900">
                  Are you a Chef
                </label>
              </div>

              <div className="flex items-start mb-5 ml-40">
                <div className="flex items-center h-5">
                  <input
                  name='position'
                    id="user"
                    type="radio"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-7 focus:ring-red-700"
                    checked={isUser}
                    onChange={() => setIsUser(!isUser)} 
                  />
                </div>
                <label htmlFor="user" className="ml-2 text-sm font-medium text-gray-900">
                  Are you a User
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
