import React from 'react'
import company from '../assets/company.png'
import TestimonialsCard from './TestimonialsCard'
import Container from './Container'
const Testimonials = () => {
    const test=[
        {
        text:"FlyAkeed made my life easier. We used to work with agents in the past but with FlyAkeed, I can get notified with requests with approval instead of waiting 1-2 days for confirmation that they can travel.",
        image:company
        },
        {
        text:"In the past, everything was done by papers and we had to contact agents through email. The process used to take too long and there was no way to monitor, but with FlyAkeed, everything is seamless and transparent",
        image:company
        },
        {
        text:"In the past, everything was done by papers and we had to contact agents through email. The process used to take too long and there was no way to monitor, but with FlyAkeed, everything is seamless and transparent",
        image:company
        }
]
  return (
    <Container>
    <div className='py-20'>
        <h1 className=' text-4xl text-primery text-center font-bold mb-20  '>Testimonials</h1>
        <div className='flex flex-col items-center  lg:flex-row justify-center  gap-5  '>
            {
                test.map((t)=>{
                    return(
                        <TestimonialsCard key={Math.random()} image={t.image} text={t.text}/>
                    )

                })
            }
        </div>
    </div>
    </Container>
  )
}

export default Testimonials