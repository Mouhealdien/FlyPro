import Image from 'next/image';
import React from 'react'
import company from '../assets/company.png'
import Container from './Container';
const Companies = () => {
    const Companies=[1,1,1,1,1,1];
  return (
    <Container>
    <div className='py-20'>
        <h3 className=' text-primery  text-center text-2xl'>
            Join the Elite Ranks of the Most Impressive Companies Trusting Us
        </h3>
        <div className='flex flex-col lg:flex-row items-center justify-around mt-5 '>
            {Companies.map(()=>{
                return(
                    <Image key={Math.random()} src={company} alt="company" width={150} height={150}/>
                )
            })}
        </div>
    </div>
    </Container>
  )
}

export default Companies