import React, { useState } from 'react'
import {  FaPlusCircle } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
 type propsType={
    handelShowCalendar:(e:boolean) => void,
    handelIsReturn:(e:boolean) => void,
    isReturn:boolean,
    startDate:Date,
    endDate:Date
 }
const Dates = ({handelShowCalendar,handelIsReturn,isReturn,startDate,endDate}:propsType) => {
    
  return (
    
    <div className=' mt-5 justify-between max-w-[460px] flex flex-row text-primery'>
                  <div className='bg-white w-[48%] h-24'>
                    <div className=' px-3 text-primeryLight text-sm bg-white'>Departure Date</div>
                    <button onClick={(e)=>{e.preventDefault();handelShowCalendar(true); handelIsReturn(false)}} className='w-full'>
                      <div className='flex flex-row justify-evenly max-w-[150px] items-center'>
                          <p className='text-[40px]'>{startDate.toDateString().split(" ")[2]}</p>
                          <div className='flex flex-col'>
                                <p>{startDate.toDateString().split(" ")[1]}</p>
                                <p>{startDate.toDateString().split(" ")[3]}</p>
                          </div>
                      </div>
                    </button>
                    </div>

                    {
                    isReturn&&<div className='bg-white w-[48%] h-24'>
                    <button  className='w-full'>
                        <div className='flex flex-row items-center justify-between'>
                            <div className=' px-3 text-primeryLight text-sm  bg-white'>Return Date</div>
                            <FaX onClick={(e)=>{ e.preventDefault();handelIsReturn(false);handelShowCalendar(false)}} className=' w-10 text-gray-300'/>
                        </div>
                    
                   
                      <div className='flex flex-row justify-evenly max-w-[150px] items-center'>
                          <p className='text-[40px]'>{endDate?endDate.toDateString().split(" ")[2]:startDate.toDateString().split(" ")[2]}</p>
                          <div className='flex flex-col'>
                                <p>{endDate?endDate.toDateString().split(" ")[1]:startDate.toDateString().split(" ")[1]}</p>
                                <p>{endDate?endDate.toDateString().split(" ")[3]:startDate.toDateString().split(" ")[3]}</p>
                          </div>
                      </div>
                    </button>
                    </div>
                    }

                    {
                    !isReturn&&<div className='bg-white hover:bg-gray-300 w-[48%] h-24'>
                    <button onClick={(e)=>{e.preventDefault();handelShowCalendar(true) ;handelIsReturn(true)}} className='w-full'>
                    <div className=' px-3 text-primeryLight text-sm w-fit '>Return Date</div>
                      <div className='flex flex-row justify-center text-sm sm:gap-5 mt-5 items-center'>
                            <FaPlusCircle className='text-xl text-gray-200'/>
                            <p className='text-primeryLight'>Add return date</p>    
                      </div>
                    </button>
                    </div>
                    }

                    

                  </div>
  )
}

export default Dates