import React from 'react'
import Container from './Container'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'

type propsType ={

    adults:number,
    departureDate:string
    originLocationCode:string
    destinationLocationCode:string
}
const Navbar2 = ({adults,departureDate,originLocationCode,destinationLocationCode}:propsType) => {
  return (
    <Container customeStyle='bg-blue-950'>
    <div className='py-5 mb-5  bg-blue-950 text-white flex flex-row items-center justify-between'>
        <div>
           <Link href={'/'}>
            <FaArrowLeft/>
           </Link>
        </div>
        <div className='flex flex-col md:flex-row justify-between text-sm md:text-base'>
            <div className=' mx-0 mb-2 md:mb-0 md:mx-3 flex flex-col items-center  w-24 px-2 h-8 rounded-lg transition duration-300 outline-none bg-transparent'>
            <p>{originLocationCode} - {destinationLocationCode}</p>
                <p className='text-primeryLight'>{adults} Adults </p>
            </div>
            <div className='  px-2 h-8 rounded-lg flex flex-col items-center  transition duration-300  outline-none bg-transparent'>
                        <p >{departureDate} </p>
                        <p className=' text-primeryLight'>Departure</p>
            </div>
        </div>
        <div className='max-w-[250px]'>
            
            <button className='px-3 md:px-7 py-2  text-white hover:border-primeryLight border transition duration-300 border-white  bg-transparent '>
                Change Search
            </button>
        </div>
    </div>
    </Container>
  )
}

export default Navbar2