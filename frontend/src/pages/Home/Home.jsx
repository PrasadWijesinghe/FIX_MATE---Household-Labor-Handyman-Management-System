import React from 'react'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Products from '../../components/Products/Products'
import Steps from '../../components/Steps/Steps'

function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Products/>
      <Steps/>
    </div>
  )
}

export default Home
