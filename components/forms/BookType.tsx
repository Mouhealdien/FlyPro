import React, { useState } from 'react'
import { FaBed , FaPlane } from 'react-icons/fa';
type propsType={
    handelBookType:(e:string)=>void
}
const BookType = ({handelBookType}:propsType) => {
    const [type,setType]=useState("flight");

    const handelType=(e:string)=>{
        setType(e);
        handelBookType(e);
    }

  return (
    <div className=' md:flex md:items-center justify-center  bg-white max-w-[460px] rounded-3xl py-2 px-2' >
                <button onClick={()=>{handelType("flight")}} className={`flex justify-center w-full px-16 py-1 transition duration-500   ${type=="flight"?'bg-primeryLight text-white':'bg-white text-gray-300'} rounded-3xl md:w-auto md:mx-2 focus:outline-none`}>
                    <FaPlane className='w-6 h-6'/>

                    <span className=" mx-2">
                    Flights
                    </span>
                </button>

                <button onClick={()=>{handelType("hotel")}} className={`flex justify-center w-full px-16 py-1 transition duration-500   ${type=="hotel"?'bg-primeryLight text-white':'bg-white text-gray-300'} rounded-3xl md:w-auto md:mx-2 focus:outline-none`}>
                    <FaBed className='w-6 h-6'/>
                    <span className="mx-2">
                        Hotels
                    </span>
                </button>
            </div>
  )
}

export default BookType