import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';


type  propsType={
    locations:{}[]
    handelLocation:(e:string)=>void
    zi?:number
    handelFrom?:(e:string)=>void
    handelTo?:(e:string)=>void
} 

const LocationAutoComplete = ({locations,handelLocation,zi,handelFrom,handelTo}:propsType) => {


    const handleOnSearch = (string, results) => {

        handelLocation(string)
        if(string==""){
            console.log("hh")
        if(zi){
            handelFrom(string)
        }
        else
       handelTo(string)
      }
        
        
      }
    
      const handleOnHover = (result) => {

        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        if(zi){
            handelFrom(item.iataCode)
        }
        else
       handelTo(item.iataCode)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }


      const formatResult = (item) => {
        return (
          <div className=' hover:text-white '>
            {item.type=="CITY"?
              <div className=' flex text-xs flex-row items-center justify-between'>
                <div className='flex flex-col' >
                    <p >{item.name}</p>
                    <p >all Airports</p>
                </div>
                <p className='text-lg pr-2'>{item.iataCode}</p>
              </div>
              :
              <div className='  ml-4 text-xs flex flex-row items-center justify-between'>
                  <div className='flex  flex-col' >
                    <p>{item.airPortName}</p>
                    <p>{item.name} , {item.country}</p>
                </div>
                <p className='text-lg pr-2'>{item.iataCode}</p>
              </div>
              }
          </div>
        )
      }

    
  return (
    <div className='w-[100%]'>
    <ReactSearchAutocomplete
    items={locations}
    onSearch={handleOnSearch}
    onHover={handleOnHover}
    onSelect={handleOnSelect}
    onFocus={handleOnFocus}
    showClear={false}
    showIcon={false}
    styling={{borderRadius:"0", boxShadow:"none",iconColor:"white",hoverBackgroundColor:"#196dfb", border:"none",fontSize:"20px" , zIndex:zi   }}
    placeholder='City Or Airport'
    formatResult={formatResult}
    
    
  />
  </div>
  )
}

export default LocationAutoComplete