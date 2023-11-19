import React, { useState } from 'react'
import { FaX } from 'react-icons/fa6'
import Select from 'react-select'
import DatePickerDialog from './DatePickerDialog'
type propsType={
    key:number
    index:number
    updateArray:(i:number,ob:any)=>void
    deleteElement:(i:number)=>void,
    tripsArray:{}[]
}
const Trip = ({key,index,updateArray,deleteElement,tripsArray}:propsType) => {
    const [from,setFrom]=useState("")
    const [to,setTo]=useState("")
    const [tripDate,setTripDate]=useState<Date>();
    const customStyles2 = {
        control: (provided, state) => ({
            ...provided,
            border: 'none', 
            boxShadow: 'none', 
            padding: '2px', 
            borderRadius: '0',
            
            
          }),
      indicatorSeparator: (provided, state) => ({
        ...provided,
        display: 'none',
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        display: 'none', 
      }),
      }

      const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

      const handelDate=(selectedDate)=>{
        setTripDate(selectedDate);
      }

      const handleFromChange = (selectedOption) => {
        setFrom(selectedOption.value);
        console.log(tripDate)
        updateArray(index,{
            from:selectedOption.value,
            to:to,
            date:tripDate
        })

      };
      const handleToChange = (selectedOption) => {
        setTo(selectedOption.value);
        updateArray(index,{
            from:from,
            to:selectedOption.value,
            date:tripDate
        })
      };

      const deleteElem=()=>{
        deleteElement(index);
      }
    

  return (
    <div className=' relative flex mt-10 flex-col justify-center items-center md:flex-row max-w-[460px] py-5 bg-white'>
                    {tripsArray.length>1&&<FaX onClick={deleteElem} className='absolute right-2 top-4'/>}
                    <div className='w-[33%]'>
                        
                              <div>
                                  <div className=' pt-2 px-3 text-pink bg-white'>From</div>
                                  <Select
                                 
                                  onChange={handleFromChange}
                                  placeholder={"select"}
                                  styles={customStyles2}
                                  options={options} />  
                              </div>
                          
                    </div>
                    <div className='w-[33%]'>
                      
                                <div>
                                  <div className=' px-3 pt-2 text-pink bg-white'>To</div>
                                  <Select 
                                  onChange={handleToChange}
                                      placeholder={"select"}
                                      styles={customStyles2}
                                      options={options} />
                                </div>
                           
                  </div>
                  
                    <div className='bg-white  w-[36%] '>
                    <div className='  text-primery pb-2 text-sm bg-white'>Date</div>
                    <DatePickerDialog handelDate={handelDate}/>
                    </div>
                    
                </div>
  )
}

export default Trip


