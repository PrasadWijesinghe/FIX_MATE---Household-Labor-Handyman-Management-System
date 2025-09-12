import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {

    const[menu,setMenu] = useState("home");

  return (
    <div>
        <div className='navbar'>
            <img src={assets.logo} alt="logo" className='logo' />
            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={menu==="home" ? "active" : ""}>HOME</li>
                <li onClick={() => setMenu("about")} className={menu==="about" ? "active" : ""}>ABOUT</li>
                <li onClick={() => setMenu("services")} className={menu==="services" ? "active" : ""}>SERVICES</li>
                <li onClick={() => setMenu("store")} className={menu==="store" ? "active" : ""}>STORE</li>
                <li onClick={() => setMenu("contact")} className={menu==="contact" ? "active" : ""}>CONTACT</li>

            </ul>
            <div className="navbar-right">
                <button>GET STARTED</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar