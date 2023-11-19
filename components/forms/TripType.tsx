import React from 'react'
import  { useState } from 'react'
type propsType={
    handelTripType:(e:string)=>void
}
const TripType = ({handelTripType}:propsType) => {
    const [type,setType]=useState("oneway");

    const handelType=(e:string)=>{
        setType(e);
        handelTripType(e);
    }
    return (
        <div className=' mt-5 md:flex md:items-center justify-center bg-white max-w-[460px] rounded-3xl py-2 px-2' >
            <button onClick={()=>handelType("oneway")} className={`flex justify-center w-full px-10 py-1 transition duration-500   ${type=="oneway"?'bg-primeryLight text-white':'bg-white text-gray-300'} rounded-3xl md:w-auto md:mx-1 focus:outline-none`}>
                OneWay
            </button>

            <button onClick={()=>handelType("roundtrip")} className={`flex justify-center w-full px-10 py-1 transition duration-500   ${type=="roundtrip"?'bg-primeryLight text-white':'bg-white text-gray-300'} rounded-3xl md:w-auto md:mx-1 focus:outline-none`}>
                RoundTrip
            </button>

            <button onClick={()=>handelType("multicity")} className={`flex justify-center w-full px-10 py-1 transition duration-500   ${type=="multicity"?'bg-primeryLight text-white':'bg-white text-gray-300'} rounded-3xl md:w-auto md:mx-1 focus:outline-none`} >    
                MultiCity
            </button>
        </div>
  )
}

export default TripType