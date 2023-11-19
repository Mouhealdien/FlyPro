import { StaticImageData  } from 'next/image';
import  Image  from 'next/image';
import blockquote from '../assets/blockquote.png'
import React from 'react'
type propsType={
    text:string;
    image:StaticImageData;
}
const TestimonialsCard = ({text,image}:propsType) => {
  return (
    <div className=' max-w-xl lg:max-w-[360px]  mb-28 lg:mb-0  '>
    <div className="w-full bg-gray-100  relative flex flex-col items-center  cursor-pointer  border border-gray-200 lg:h-[300px] xl:h-[250px]  py-6 px-5 ">
        <div className="text-primery  flex flex-row items-start justify-around">
        <p className="xl:w-80 text-base leading-normal text-center px-9 ">{text}</p>
           
            <Image src={blockquote} alt='blockquote'/>
            
        </div>
       
        <div className="text-primery  absolute bottom-0 right-7 -mb-6">
            <div className=' bg-gray-100 w-12 h-12  rotate-45'>

            </div>
        </div>
    </div>
    <div className='relative'>
        <div className=" absolute bottom-0 top-9 right-7">
            <Image src={image} alt="compnay" className="w-12 h-12" />
        
        </div>
    </div>
</div>
  )
}

export default TestimonialsCard