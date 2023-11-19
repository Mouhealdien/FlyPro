import React, { useEffect, useState  } from 'react';
import { addDays, format, isAfter, isBefore  } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { FaX } from 'react-icons/fa6';

type propsType = {
  isReturn: boolean;
  setStartDate:(e:Date | undefined)=>void,
  setEndtDate:(e:Date | undefined)=>void,
  handelShowCalendar:(e:boolean)=>void
};

const Calendar = ({ isReturn,setEndtDate,setStartDate,handelShowCalendar }: propsType) => {
    const date= new Date();
    const day = date.getDate();
    const month = date.getMonth() ;
    const year = date.getFullYear();
    const [selectedDay, setSelectedDay] = useState<Date>(date);

    
    
    const currentDate= new Date(year,month,day);

    const defaultSelected: DateRange = {
        from: selectedDay,
        to: addDays(selectedDay, 4)
      };
      const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
      
      useEffect(()=>{
        setRange( {
            from: selectedDay,
            to: undefined
          })

      },[selectedDay])
   
    setStartDate(range?.from);
        setEndtDate(range?.to)
    
      const handleDayClick = (day) => {
       
        if (!range.from || (range.from && range.to)) {
         
          setRange({
            from: day,
            to: undefined,
          });
        } else {
          
          if (isBefore(day, range.from)) {
           
            setRange({
              from: day,
              to: range.from,
            });
          } else {
            setRange((prevRange) => ({
              ...prevRange,
              to: day,
            }));
          }
        }
      };
      
    

      let footer = <p>Please pick the first day.</p>;
      if (range?.from) {
        if (!range.to) {
          footer = <p>You have selected 1 day</p>;
        } else if (range.to) {
          footer = 
            <p>You have selected {(range.to.getDate()- range.from.getDate())+1} days</p>
            
          
        }

        const modifiersStyles = {
            
           
              selected: {
                backgroundColor: '#196dfb', 
                color: 'white', 
                
              },
          };

        const isDayDisabled = (day) => {
            return isBefore(day, currentDate);
          };

     
  return (
    
        <div className='bg-white  max-w-[300px] py-4 '>
                  <div className=' bg-white max-w-[300px] flex flex-row justify-around items-center'>
                    <p className='text-lg'>Choose Departure Date</p>
                    <button onClick={()=>{handelShowCalendar(false)}}> <FaX className='text-gray-200 text-lg'/></button>
                </div>
                  {isReturn&&<DayPicker
            mode="range"
            modifiers={{ disabled: isDayDisabled }}
            defaultMonth={currentDate}
            selected={range}
            footer={footer}
            onDayClick={handleDayClick}
            modifiersStyles={modifiersStyles}
        
        />
         
        }

        {!isReturn&&<DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            modifiersStyles={modifiersStyles}
            modifiers={{ disabled: isDayDisabled }}
        
        />
         
        }
    </div>
         
      
  
  )
}
};

export default Calendar;