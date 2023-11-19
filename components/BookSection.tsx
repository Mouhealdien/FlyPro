import React, { useEffect, useState } from 'react'
import FlightsForm from './forms/FlightsForm';
import BookType from './forms/BookType';
import Container from './Container';
import Calendar from './forms/Calendar';
import 'react-day-picker/dist/style.css';
import MultiCityForm from './forms/MultiCityForm';
import TripType from './forms/TripType';
import {getAmadeusLocations} from '../api/locations'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Image from 'next/image';
import company from "../assets/company.png"
import { FaChair } from 'react-icons/fa6';
const BookSection = () => {


    const [bookType,setBookType]=useState("flight");
    const [showCalendar,setShowCalendar]=useState<boolean>(false)
    const [isReturn,setIsReturn] = useState<boolean>(false);
    const [positionType,setPositionType]=useState("")
    const [tripType,setTripType]=useState<string>("oneway");
    const [startDate,setStartDate]=useState<Date>(new Date());
    const [endDate,setEndtDate]=useState<Date>();
    const [locations, setLocations]=useState<any>([])
    const [keyWord,setKeyword]=useState("new");

    useEffect(()=>{
   

      const fetchData = async () => {
    if (keyWord.length > 0) {
      getAmadeusLocations(keyWord).then(console.log)
    const response = await getAmadeusLocations(keyWord);
    const arr=  response?.data.map((o)=>{
            if(o.subType=="CITY"){
              return{
                id:o.id,
                type:o.subType,
                name:o.address.cityName,
                iataCode:o.iataCode
              }
              
            }
            else{
              return{
                id:o.id,
                type:o.subType,
                name:o.address.cityName,
                iataCode:o.iataCode,
                airPortName:o.name,
                country:o.address.countryName
              }
              
            }
      })
    setLocations(arr);
    }
      }
      fetchData();

    },[keyWord])

    const handelShowCalendar=(e:boolean)=>{
        setShowCalendar(e);
    }
    const handelIsReturn=(e:boolean)=>{
      setIsReturn(e);
  }

    const handelBookType=(e:string)=>{
        setBookType(e)
    }

    const handelPositionType=(e:string)=>{
      setPositionType(e)
    }


    const handelTripType=(e:string)=>{
      setTripType(e)
  }


  


  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results)
    setKeyword(string)
    console.log(locations)

    
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    //console.log(item)

    console.log(locations)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }




  const formatResult = (item) => {
    return (
      <>
        {item.type=="CITY"?
          <div className='flex text-xs flex-row items-center justify-between'>
            <div className='flex flex-col' >
                <p >{item.name}</p>
                <p >all Airports</p>
            </div>
            <p className='text-lg pr-2'>{item.iataCode}</p>
          </div>
          :
          <div className=' pl-4 text-xs flex flex-row items-center justify-between'>
              <div className='flex  flex-col' >
                <p>{item.airPortName}</p>
                <p>{item.name} , {item.country}</p>
            </div>
            <p className='text-lg pr-2'>{item.iataCode}</p>
          </div>
          }
      </>
    )
  }

  const handelLocation=(k:string)=>{
      setKeyword(k);
  }
  
    
  return (
    <Container  customeStyle='bg-[#e7f0fe]'>
    <div className=" relative flex items-start  flex-row gap-2 md:flex-row bg-[#e7f0fe] py-7">
      <div>
            <BookType handelBookType={handelBookType} />
            {bookType=="flight"&&<TripType handelTripType={handelTripType} />}
            {(tripType=="oneway"||tripType=="roundtrip")&&<FlightsForm handelLocation={handelLocation} locations={locations} handelIsReturn={handelIsReturn} startDate={startDate} endDate={endDate} handelShowCalendar={handelShowCalendar} isReturn={isReturn}/>  }

            {tripType=="multicity"&&bookType=="flight" && <MultiCityForm  handelPositionType={ handelPositionType}    />}
            
      </div>   
            
      {showCalendar&&
            <Calendar handelShowCalendar={handelShowCalendar} setStartDate={setStartDate} setEndtDate={setEndtDate} isReturn={isReturn}/>
            }
          
               
              
    </div>


            
    
    </Container>
    
    
  )
}

export default BookSection