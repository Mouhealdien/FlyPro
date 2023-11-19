import AppSection from "../components/AppSection"
import BookSection from "../components/BookSection"
import Companies from "../components/Companies"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import NavBar from "../components/Navbar"
import Testimonials from "../components/Testimonials"

export default function Home() {
  
  return (
    <div className="" >
      
      <NavBar/>
      <BookSection/>
      <Hero/>
      <Companies/>
      <Testimonials/>
      <AppSection/>
      <Footer/>
    </div>
  )
}
