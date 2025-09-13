import React from 'react'

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-2">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2 ">FixMate</h1>
        <p className="text-center text-gray-600 mb-6">Welcome back! Sign in to your account</p>
        
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Email Address</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between text-sm mt-1 mb-2">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2">Sign In</button>
        </form>
        <p className="text-center text-gray-600 mt-4 text-sm">Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up here</a></p>
        
      </div>
    </div>
  )
}

export default SignUp
