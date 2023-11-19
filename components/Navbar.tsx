import React from 'react'
import Container from './Container'
import logoEn from '../assets/logoEn.png'
import Image from 'next/image'
const navBar = () => {
  return (
    <Container customeStyle='bg-primery'>
    <div className='py-8 bg-primery  text-white flex flex-row justify-between'>
        <div>
           <Image width={200} height={35} src={logoEn} alt='logo'/>
        </div>
        <div className='flex flex-col md:flex-row text-sm md:text-base'>
            <select className=' mx-0 mb-2 md:mb-0 md:mx-3 border-none p-0  w-24 px-2 h-8 rounded-lg transition duration-300 hover:bg-primeryLight outline-none bg-transparent'>
                <option className='bg-white text-black' >SAR</option>
                <option className='bg-white text-black' >USD</option>
            </select>
            <button className=' w-20 px-2 h-8 rounded-lg transition duration-300 hover:bg-primeryLight outline-none bg-transparent'>
                        العربية
            </button>
        </div>
        <div className='flex flex-col md:flex-row text-sm md:text-base'>
            <button className=' mx-0 mb-2 md:mb-0 md:mx-3 px-3 md:px-7 py-2   bg-primeryLight ' >
                Corporate
            </button>
            <button className='px-3 md:px-7 py-2  text-primeryLight bg-white '>
                Log In
            </button>
        </div>
    </div>
    </Container>
  )
}

export default navBar