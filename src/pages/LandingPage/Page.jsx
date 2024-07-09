import React from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Abilities from './components/Abilities'
import SecurityStandards from './components/SecurityStandards'
import BackedBy from './components/BackedBy'
import FAQs from '../../components/FAQs'
import { Footer } from '../../components/Footer'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Abilities />
      <SecurityStandards />
      <BackedBy />
      <FAQs/>
      <Footer/>
    </div>
    // Header
    // Hero Section
    // Abilities
    // Security
    // BackedBy
    // FAQ
    // Footer
  )
}

export default LandingPage