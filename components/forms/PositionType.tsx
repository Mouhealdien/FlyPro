import { useState } from "react";
import React  from 'react'
type propsType={
    handelPositionType:(e:string)=>void
}
const PositionType = ({handelPositionType}:propsType) => {
    const [type,setType]=useState("oneway");

    const handelType=(e:string)=>{
        setType(e);
        handelPositionType(e);
    }
  return (
    <div className=' mt-5 md:flex md:items-center justify-center px-0 bg-white max-w-[460px] ' >
            <button onClick={()=>handelType("ECONOMY")} className={` w-full px-10 py-4 transition duration-500   ${type=="oneway"?'bg-primeryLight text-white':'bg-white text-gray-300'}   focus:outline-none`}>
                Economy
            </button>

            <button onClick={()=>handelType("BUSINESS")} className={` w-full px-10 py-4 transition duration-500   ${type=="roundtrip"?'bg-primeryLight text-white':'bg-white text-gray-300'}   focus:outline-none`}>
                Business
            </button>

            <button onClick={()=>handelType("FIRST")} className={` w-full px-10 py-4 transition duration-500   ${type=="multicity"?'bg-primeryLight text-white':'bg-white text-gray-300'}   focus:outline-none`} >    
                First Class
            </button>
        </div>
  )
}

export default PositionType