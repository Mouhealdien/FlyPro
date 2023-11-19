import Image from 'next/image'
import React from 'react'
import google from '../assets/google_new.png'
import app from '../assets/apple_new.png'
import phone2 from '../assets/phone2.png'
import Container from './Container'
const AppSection = () => {
  return (
    <Container customeStyle='bg-[#e7f0fe]'>
    <div className='mt-72 relative  '>
      <div className='flex py-40 bg-[#e7f0fe] flex-row'>
        <div className=' absolute left-20 bottom-[580px]  lg:bottom-48 xl:bottom-36 lg:right-50'>
          <Image src={phone2} alt='phone' width={500} className=' w-[280px] lg:w-[220px] xl:w-[280px]'/>
        </div>
        
      <div className=' flex flex-col lg:flex-row '>
            <div className=' h-[350px] lg:w-[800px] lg:h-auto xl:w-[800px] '/>
            <div className='flex flex-col'>
              <h2 className=' mb-8 text-3xl lg:text-4xl text-primery  '> Book Flights Anytime, Anywhere with the Convenience of Our Downloadable App</h2>
              <div className=' flex flex-col  lg:flex-row'>
                  <a><Image width={350} src={google} alt='google'/></a>
                  
                <a><Image width={350}  src={app} alt='app'/></a>
              </div>
            </div>
        </div>
    </div>
    </div>
    </Container>
  )
}

export default AppSection