import { useState } from 'react'
import React  from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
type propsType={
    max:number
    min:number
	label: string;
    onNumChange:(e:number)=>void;
    adult?:number
    infant?:number
    isInfant?:boolean
    total:number

}
const InputNumber = ({label,onNumChange,max,min,adult,total,infant,isInfant}:propsType) => {
    const [numValue,setNumValue]=useState<number>(min);
 
    const increase=()=>{
        
        if(total<max){
        if(adult){
            if(numValue+1<=max && adult>numValue){
                setNumValue(numValue+1) 
                onNumChange(numValue+1)
            }
            else{
                toast.error('number of infents cant be larger than number of adults.', {
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
            }
            
        }
        else{
            if(numValue+1<=max ){
                setNumValue(numValue+1) 
                onNumChange(numValue+1)
            }
        }
        
    }
    
    }
    
    const decrease =() =>{
        
        if(numValue-1>=min){
            if(infant&&infant<0){}
            else{
                setNumValue(numValue-1)
                onNumChange(numValue-1)
            }
        }
       
    }
    
 
  return (
    <div className='bg-white py-3'>
    <div className='flex flex-row justify-center gap-1 m-auto items-end text-primery'>
        <div className='flex flex-col items-center mx-6  justify-center'>
            <h4 className=' mr-4 text-[13px] '>{label}</h4>
            <input  onChange={(e)=>{setNumValue(+e.target.value); }} max={9} readOnly value={numValue} type='number' className='w-9 focus:ring-0 or focus:ring-transparent h-10 text-[35px] outline-none m-0  border-none p-0   '/>
        </div> 
        
         <div className='felx flex-col text-pink'>
                <FaAngleUp onClick={()=>increase()} className='w-6 h-6'/>
                <FaAngleDown onClick={()=>decrease()} className='w-6 h-6'/>
        </div>
    </div> 
    <Toaster/>
    </div>
    
    
   
  )
}

export default InputNumber