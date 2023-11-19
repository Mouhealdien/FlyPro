import React, { ChangeEventHandler, useRef, useState } from 'react';

import {  isValid, parse,isBefore } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker, SelectSingleEventHandler, } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { FaX } from 'react-icons/fa6';

type propsType={
    handelDate:(e:Date)=>void
}
export default function DatePickerDialog({handelDate}:propsType) {
  
    const d=new Date();
    const day=d.toDateString().split(" ")[2]
    const month=d.toDateString().split(" ")[1]
    const year=d.toDateString().split(" ")[3]
    const todayDate=day + " "+ month+ " "+ year;


    const currentDate= new Date(d.getFullYear(),d.getMonth(),d.getDate());
    const [selected, setSelected] = useState<Date>();
    const [inputValue, setInputValue] = useState<string>(todayDate);
    const [isPopperOpen, setIsPopperOpen] = useState(false);

   
  const popperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const popper = usePopper(inputRef.current, popperElement, {
    placement: 'bottom-start'
  });



  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleInputClick = () => {
    setIsPopperOpen(!isPopperOpen);
  };

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    setSelected(date);
    handelDate(date)

    
    if (date) {
        setSelected(date);
        const day=date?.toDateString().split(" ")[2]
        const month=date?.toDateString().split(" ")[1]
        const year=date?.toDateString().split(" ")[3]
      setInputValue(day + " "+ month+ " "+ year);
    
    } 

    handleInputClick()
    // else {
    //     setInputValue(day + " "+ month+ " "+ year);
    //   }
  };

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
    <div>
      <div ref={popperRef}>
        <input
          size={12}
          type="text"
          className='text-primery outline-none'
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          ref={inputRef}
          readOnly
        />
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            
            fallbackFocus: inputRef.current || undefined
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet bg-white"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
            
          >
            <div className='bg-white py-3 flex flex-row justify-end '>
                <FaX onClick={()=> {handleInputClick()}} className='mx-5'/>
            </div>
            <DayPicker
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
              modifiersStyles={modifiersStyles}
              modifiers={{ disabled: isDayDisabled }}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
}