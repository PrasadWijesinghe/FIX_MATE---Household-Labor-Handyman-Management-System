import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
     <div className='header'>
        <div className="header-contents">
            <p>One platform, all the home services you need</p>
            <h2>Your Trusted <br /> Tasker for Every <br /> Task</h2>
            <button>Book A Service</button>
            <img src={assets.hero_img} alt="hero" className='hero-img' />
        </div>

         
      
    </div>
  )
}

export default Header
