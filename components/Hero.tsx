import React from 'react'
import Container from './Container'
import Image from 'next/image'
import phone from '../assets/phone.png'
const Hero = () => {
  return (
    <Container>
        <div className='flex flex-col lg:flex-row justify-center items-center py-20 '>
            <div className=' max-w-xl '>
                <h2 className=' text-3xl lg:text-4xl font-bold text-primery'>
                Seamless Corporate Travel Experience
                </h2>
                <p className='text-primery mt-8'>FlyAkeed’s solution offers comprehensive travel services and innovative solutions for corporates and their employees to help them achieve the ultimate booking experience when traveling for work.</p>
            </div>

            <div>
               <Image src={phone} alt='phone' className=' max-w-[400px] md:max-w-[500px] ' width={500} height={500}/>
            </div>
        </div>
    </Container>
  )
}

export default Hero