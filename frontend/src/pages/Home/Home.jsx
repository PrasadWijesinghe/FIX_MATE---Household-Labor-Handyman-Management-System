import React from 'react'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Products from '../../components/Products/Products'
import Steps from '../../components/Steps/Steps'
import Services from '../../components/Services/Services'
import Seller from '../../components/Seller/Seller'
import Store from '../../components/Store/Store'

function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <Products/>
      <Steps/>
      <Services/>
      <Seller/>
      <Store/>
    </div>
  )
}

export default Home
