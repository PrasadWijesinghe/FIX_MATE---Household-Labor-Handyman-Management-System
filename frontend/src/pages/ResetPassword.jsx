import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const inputRefs = React.useRef([])

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      if (data.success) setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onsubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message)
      if (data.success) navigate('/')
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-2">

      {!isEmailSent &&
        <form onSubmit={onSubmitEmail} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">FixMate</h1>
          <p className="text-center text-gray-600 mb-6">Enter your registered email</p>
          <div className="mb-4">
            <input
              type='email'
              placeholder='Type Email Here'
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Submit</button>
        </form>
      }

      {!isOtpSubmitted && isEmailSent &&
        <form onSubmit={onsubmitOTP} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">Reset Password OTP</h1>
          <p className="text-center text-gray-600 mb-6">Enter the 6-digit code sent to your email</p>
          <div className="flex justify-between mb-4" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                type='text'
                maxLength='1'
                key={index}
                required
                className="w-12 h-12 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-center text-lg"
                ref={e => inputRefs.current[index] = e}
                onInput={e => handleInput(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Submit</button>
        </form>
      }

      {isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitNewPassword} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">Enter New Password</h1>
          <p className="text-center text-gray-600 mb-6">Please enter your new password</p>
          <div className="mb-4">
            <input
              type='password'
              placeholder='Type your password here'
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Submit</button>
        </form>
      }

    </div>
  )
}

export default ResetPassword
