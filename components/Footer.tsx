import React, { Children } from 'react'
import Container from './Container'
import Image from 'next/image'
import logEn from '../assets/logoEn.png'
import Link from 'next/link'
import google from '../assets/google_new.png'
import app from '../assets/apple_new.png'
import logoAr from '../assets/logoAR.png'
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
    const footerData=[
        {
            title:"FlyAkeed",
            children:[
                {
                    name:"About us",
                    link:'/'
                },
                {
                    name:"FlyAkeed for Business",
                    link:'/'
                },
        ]
        },
        {
            title:"Support",
            children:[
                {
                    name:"Contact Us",
                    link:'/'
                },
                {
                    name:"FAQ",
                    link:'/'
                },
        ]
        },
        {
            title:"Legal",
            children:[
                {
                    name:"Terms and Conditions",
                    link:'/'
                },
                {
                    name:"Privacy Policy",
                    link:'/'
                },
        ]
        }
    ]

    const icons=[FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn ]
  return (
    <Container>
        <div className='py-8'>
            <div className='flex flex-col lg:flex-row justify-between'>
                <div className='mb-4'>
                    <Image width={135} height={35}  src={logoAr} alt='logo'/>
                </div>

                {
                    footerData.map((e)=>{
                        return(
                        <div className='mb-4'>
                            <h3 className='text-lg mb-3 '>{e.title}</h3>
                            <ul>
                                {
                                    e?.children?.map((c)=>{
                                        return(
                                            <Link href={c.link}>
                                            <li className='text-sm mb-3'>{c.name}</li>
                                            </Link>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        )
                    })
                }
                <div className='flex flex-col'>
                <h3 className='text-lg mb-3 '>Download</h3>
                
                    <Image className='mb-3' src={app} alt='app' width={150} height={20} />
                    <Image src={google} alt='google' width={150} height={20} />
                    
                </div>
                
            </div>
            <div className='flex flex-row justify-between items-center mt-12'>
                <p>Call us at: 920000091</p>
                <p>FlyAkeed © 2023 | All Rights Reserved</p>
                <div className='flex flex-row gap-5 justify-evenly'>
                    
                   <FaFacebookF className='w-[25px] h-[25px]'/>
                   <FaTwitter className='w-[25px] h-[25px]'/>
                   <FaInstagram className='w-[25px] h-[25px]'/>
                   <FaLinkedinIn className='w-[25px] h-[25px]'/>
                </div>
            </div>
        </div>
    </Container>
    
  )
}

export default Footer