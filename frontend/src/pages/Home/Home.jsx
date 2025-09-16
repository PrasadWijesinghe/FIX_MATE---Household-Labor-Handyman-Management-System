import React from 'react'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Products from '../../components/Products/Products'
import Steps from '../../components/Steps/Steps'
import Services from '../../components/Services/Services'
import Seller from '../../components/Seller/Seller'
import Store from '../../components/Store/Store'
import Testimonial from '../../components/Testimonial/Testimonial'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'

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
      <About/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home
