import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Dates from './Dates';

import 'react-day-picker/dist/style.css';
import InputNumber from './InputNumber';
import PositionType from './PositionType';
import LocationAutoComplete from './LocationAutoComplete';
import { useRouter } from 'next/router';

type Inputs = {
  originLocationCode: string
  destinationLocationCode: string
  departureDate:string
  returnDate:string
  adults:number
  children:number
  infants:number

}
type propsType={
  handelShowCalendar:(e:boolean)=>void;
  handelIsReturn:(e:boolean)=>void
  isReturn:boolean
  startDate:Date;
  endDate:Date
  locations:{}[]
  handelLocation:(e:string)=>void
}
const FlightsForm = ({ handelLocation,handelShowCalendar,handelIsReturn,isReturn,startDate,endDate ,locations}:propsType) => {
  
    const router=useRouter();
    const [fromValue, setFromValue] = useState("");

  	const [toValue, setToValue] = useState("");
    const [positionType,setPositionType]=useState("")

    
   const handelFrom=(val:string)=>{
    setFromValue(val)
   }

   const handelTo=(val:string)=>{
    setToValue(val)
   }
   

    const handelReturn=(e:boolean)=>{
      handelIsReturn(e);
  }
  const handelShow=(e:boolean)=>{
    handelShowCalendar(e);
}
const handelPositionType=(e:string)=>{
  setPositionType(e)
}

    const {
      control,
      handleSubmit,
      watch,
      setValue, getValues,
      formState: { errors },
    } = useForm<Inputs>(
      {
        defaultValues: {
          adults:1,
          children:0,
          infants:0,
          
        },
      }
    )
    const onSubmit: SubmitHandler<Inputs> = (data) =>{ 
      const ddate=startDate.toLocaleDateString();
      const rdate=endDate?.toLocaleDateString();
      //const sdate=ddate.split("/")[2]+"-"+ddate.split("/")[0]+"-"+ddate.split("/")[1]
      const sdate=startDate.toISOString().substring(0, 4)+"-"+startDate.toISOString().substring(5, 7)+"-"+(parseInt(startDate.toISOString().substring(8, 10),10)+1).toString()
      let edate=undefined
      if(endDate){
        //edate=rdate.split("/")[2]+"-"+rdate.split("/")[0]+"-"+rdate.split("/")[1]
        edate=endDate.toISOString().substring(0, 4)+"-"+endDate.toISOString().substring(5, 7)+"-"+(parseInt(endDate.toISOString().substring(8, 10),10)<10?"0":"")+(parseInt(endDate.toISOString().substring(8, 10),10)+1).toString()
      }
      
      const submitData = { ...data, departureDate:sdate,originLocationCode:fromValue, destinationLocationCode:toValue  }
      if(!submitData.originLocationCode||!submitData.destinationLocationCode){
        toast.error('invalid City.', {
          style: {
           
            padding: '16px',
            color: 'white',
            backgroundColor:"rgba(255, 0, 0, 0.73)"
          },
          iconTheme: {
            primary: 'white',
            secondary: '#db3434',
          },
        });
        return
      }
      if (edate) {
        submitData['returnDate']=edate;
      }
      console.log(submitData)
      router.push({
    pathname: '/flights',
    query: submitData})

    
    }

    const handleSwapValues = (e) => {
      e.preventDefault();
      setFromValue(toValue);
      setToValue(fromValue)
    };





    
  return (<>
   
   <form onSubmit={handleSubmit(onSubmit)}>
                <div className=' relative mt-5 max-w-[460px]'>

              <>
                <Controller
                        name="originLocationCode"
                        control={control}
                        render={({ field }) => (
                        <div className=' bg-white'>
                          <div   className=' justify-center px-3 text-pink bg-white'>from</div>
                          <div className='flex flex-row'>
                            <LocationAutoComplete handelFrom={handelFrom} zi={1} handelLocation={handelLocation} locations={locations}/>
                            <p className='mr-3'>{fromValue}</p>
                          </div>
                        </div>
						      	)}
						      />
                    
                    <div className=' border border-gray-100 shadow-sm absolute right-3 p-1 '>
                        <button onClick={handleSwapValues} className='  '><FaArrowRightArrowLeft className=' text-pink   rotate-90'/></button>
                    </div>

                  <Controller
                    name="destinationLocationCode"
                    control={control}
                    render={({ field }) => (
                          <div className=' bg-white -z-10' >
                            <div   className=' px-3 text-pink bg-white'>To</div>
                            <div className='flex flex-row'>
                              <LocationAutoComplete handelTo={handelTo} handelLocation={handelLocation} locations={locations}/>
                              <p className='mr-3'>{toValue}</p>
                            </div>
                          </div>
							        )}
						      />

                  <Dates startDate={startDate} endDate={endDate}  isReturn={isReturn} handelIsReturn={handelReturn}  handelShowCalendar={handelShow}/>
                  
                  </>
                  
                
                  <div className='flex flex-row mt-5 bg-white py-2 '>
                    <div className='w-[33.3%]' >
                      <Controller
                            name="adults"
                            control={control}
                            
                            render={({ field }) => (
                            <InputNumber
                            total={watch("adults")+watch("infants")+watch("children")}
                            max={9}
                            min={1}
                            isInfant={true}
                            infant={watch("infants")}
                            onNumChange={(num) =>
                              {field.onChange(num)
                                
                              }
                            }
                            label={"Adult"}
                            />
                        )}
                      />
                    </div>

                    <div className='w-[33.3%] border border-t-0 border-b-0 border-l-gray-100 border-r-gray-100 '>
                      <Controller
                            name="children"
                            control={control}
                           
                            render={({ field }) => (
                            <InputNumber
                            total={watch("adults")+watch("infants")+watch("children")}
                            max={9}
                            min={0}
                            
                            onNumChange={(num) =>
                              {field.onChange(num)
                                
                              }
                            }
                            label={"Child"}
                            />
                        )}
                      />

                  
                    </div>

                    <div className='w-[33.3%]'>
                      <Controller
                            name="infants"
                            control={control}
                           
                            render={({ field }) => (
                            <InputNumber
                            total={watch("adults")+watch("infants")+watch("children")}
                            max={9}
                            min={0}
                            onNumChange={(num) =>
                              field.onChange(num)
                              
                            }
                            isInfant={true}
                            infant={watch("infants")}
                            adult={getValues("adults")}
                            label={"Infant"}
                            />
                        )}
                      />
                    </div>
                        
                  </div>
                  
                </div>
                <PositionType handelPositionType={handelPositionType}/>
                <div className='bg-primeryLight max-w-[460px] text-center text-xl rounded-sm text-white py-4 mt-6 '>
                <button  type='submit'>Search Flight</button>
                </div>
                      
                </form>

                
              
                           
                  
                            <Toaster/>
 
   </>
  )
}

export default FlightsForm