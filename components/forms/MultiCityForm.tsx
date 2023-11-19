import React, { useState } from 'react'
import Trip from './Trip';
import { FaCirclePlus } from 'react-icons/fa6';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputNumber from './InputNumber';
import PositionType from './PositionType';
type Inputs = {
    dates:{}[]
    adult:number
    child:number
    infant:number
  }
type propsType={
    handelPositionType:(e:string)=>void
}
const MultiCityForm = ({ handelPositionType}:propsType) => {

    const [trips, setTrips] = useState([{
        from:"",
        to:"",
        date:""
  
      }]);
  let id=1;
    const handleAddTrip = (newTrip) => {
    
      
      const newTrips = [...trips, newTrip];
      setTrips(newTrips);
    };
  
    const updateArray=(i,ob)=>{
      trips[i]=ob
  
    }
  
    const deleteElement=(index)=>{
      
      const newTrips=trips.filter((e,i)=>i!=index)
      setTrips(newTrips)

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
            adult:1,
            child:0,
            infant:0
          },
        }
      )
      const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

      console.log(trips)
    
  return (
    <div>
      
        {trips.map((trip, index) => (
                          <Trip
                            key={index}
                            tripsArray={trips}
                            index={index}
                            updateArray={updateArray}
                            deleteElement={deleteElement}
                          />
                        ))}
                
                {trips.length<5&&<div className='max-w-[460px] text-center mt-5 bg-white'>
                    <button onClick={handleAddTrip} className=''>
                        <div className='bg-white   py-6 justify-center items-center gap-4 flex flex-row max-w-[460px]'>
                          
                                <FaCirclePlus className='text-pink w-6 h-6'/>
                                <p className='text-primeryLight'>Add flight</p>
                          </div>
                    </button>
                  </div>}
                  <form onSubmit={handleSubmit(onSubmit)}> 
                  <div className='flex flex-row mt-5 bg-white py-2 '>
                    <div className='w-[33.3%]' >
                      <Controller
                            name="adult"
                            control={control}
                            
                            render={({ field }) => (
                            <InputNumber
                            total={watch("adult")+watch("infant")+watch("child")}
                            max={9}
                            min={1}
                            isInfant={true}
                            infant={watch("infant")}
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
                            name="child"
                            control={control}
                           
                            render={({ field }) => (
                            <InputNumber
                            total={watch("adult")+watch("infant")+watch("child")}
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
                            name="infant"
                            control={control}
                           
                            render={({ field }) => (
                            <InputNumber
                            total={watch("adult")+watch("infant")+watch("child")}
                            max={9}
                            min={0}
                            onNumChange={(num) =>
                              field.onChange(num)
                              
                            }
                            isInfant={true}
                            infant={watch("infant")}
                            adult={getValues("adult")}
                            label={"Infant"}
                            />
                        )}
                      />
                    </div>
                        
                  </div>
                  <PositionType handelPositionType={handelPositionType}/>
                  <div className='bg-primeryLight max-w-[460px] text-center text-xl rounded-sm text-white py-4 mt-6 '>
                  <button  type='submit'>Search Flight</button>
                  </div>
                  </form>
                  
                </div>
                 
    
  )
}

export default MultiCityForm