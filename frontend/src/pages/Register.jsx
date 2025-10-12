import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios'

const Register = () => {

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      // First try to register
      const { data } = await axios.post(
        backendUrl + '/api/auth/register',
        { name, email, password },
        { withCredentials: true }
      );
      
      if (data.success) {
        // If registration is successful, attempt to log in automatically
        try {
          const loginData = await axios.post(
            backendUrl + '/api/auth/login',
            { email, password },
            { withCredentials: true }
          );
          
          if (loginData.data.success) {
            // Store the token
            localStorage.setItem('token', loginData.data.token);
            // Update login state
            setIsLoggedin(true);
            // Get user data
            await getUserData();
            toast.success('Registration successful!');
            navigate('/');
          }
        } catch (loginError) {
          console.error('Auto-login failed:', loginError);
          toast.success('Registration successful! Please log in.');
          navigate('/signup');
        }
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2 ">FixMate</h1>
            <p className="text-center text-gray-600 mb-6">Join us today and start your journey!</p>
            <form className="space-y-4" onSubmit={onSubmitHandler}>
              {state === 'Sign Up' && (
              <div>
                <label className="block text-gray-700">Username</label>
                <input
                type="text"
                onChange={e => setName(e.target.value)}
                value={name}
                name='fullName'
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your username" />
              </div>
              )}

              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" 
                onChange={e => setEmail(e.target.value)}
                value={email}  
                name='email'
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your email" />
              </div>

              <div>
                <label className="block text-gray-700">Password</label>
                <input type="password"               
                name='password'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your password" />
              </div>

              <div>
                <label className="block text-gray-700">Confrirm Password</label>
                <input type="password"               
                name='confirmPassword'
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your password" />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
            </form>
            <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign in</a></p>
          </div>
        </div>
  )
}

export default Register
