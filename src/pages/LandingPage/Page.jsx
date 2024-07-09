import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Abilities from './components/Abilities'
import SecurityStandards from './components/SecurityStandards'
import BackedBy from './components/BackedBy'
import FAQs from '../../components/FAQs'
import { Footer } from '../../components/Footer'
import { useState } from 'react'
import Dialog from '../../components/Dialog'
import { joinWaitlist } from '../../types/home.content'
import JoinWaitlist from '../../components/JoinWaitlist'
import StillHaveQuestions from '../../components/StillHaveQuestions'

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header setOpen={setOpen}/>
      <HeroSection setOpen={setOpen} />
      <Abilities />
      <SecurityStandards />
      <BackedBy />
      <FAQs/>
      <section className="footer-gradient-container relative mt-[20rem]">
      <StillHaveQuestions setOpen={setOpen} />
      <div>
        <Footer />
      </div>
    </section>
      
      {open ? (
				<div className="">
					<Dialog
						data={joinWaitlist}
						open={open}
						setOpen={setOpen}
						width={'max-w-[500px]'}
					>
						<JoinWaitlist setOpen={setOpen} />
					</Dialog>
				</div>
			) : null}
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