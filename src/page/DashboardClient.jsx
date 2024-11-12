import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Companies from '../components/Companies/Companies'
import OurService from '../components/OurService/OurService'
import Value from '../components/Value/Value'
import Contact from '../components/Contact/Contact'
import Testimonial from '../components/Testimonial/Testimonial'
import GetStarted from '../components/GetStarted/GetStarted'
import Footer from '../components/Footer/Footer'

const DashboardClient = () => {
  return (
    <>
    <Header/>
    <Hero />
    <Companies/>
    <OurService/>
    <Value/>
    <Contact/>
    <Testimonial/>
    {/* <GetStarted/> */}
    <Footer/>
    </>
  )
}

export default DashboardClient