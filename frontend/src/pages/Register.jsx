import React from 'react'

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2 ">FixMate</h1>
            <p className="text-center text-gray-600 mb-6">Join us today and start your journey!</p>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Username</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your username" />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your password" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
            </form>
            <p className="text-center text-gray-600 mt-4">Already have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign in</a></p>
          </div>
        </div>
  )
}

export default Register
