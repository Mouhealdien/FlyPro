import { useRouter } from "next/router";
import NavBar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import { getAmadeusFlightsOffers } from "../api/flightsOffers";
import { FaArrowRight, FaChair, FaLeaf } from "react-icons/fa6";
import Image from "next/image";
import company from "../assets/company.png";
import Navbar2 from "../components/Navbar2";
import Container from "../components/Container";
import { Range, getTrackBackground } from "react-range";
import { changeTime, checkDurationRange, checkTimeRange, convertToHoursAndMinutes } from "../utils/common";
import useFlightOffers from "../hooks/useFlightsSearch";
const flights = () => {

  const { flightsOffer,queryData, carriers, maxPrice, minPrice, mindur, maxdur, filters, setFilters, values, setValues, durationValues, setdurationValues} = useFlightOffers();

  const handleCheckboxChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const filteredData = flightsOffer?.filter((flightItem) => {
    const filtersAndFunctions = [
      [filters.nostops, (item) => !filters.nostops || item?.numberOfstops === 0],
      [filters.stops, (item) => !filters.stops || item?.numberOfstops > 0],
      [
        [filters.Time1, filters.Time2, filters.Time3, filters.Time4],
        (item) => {
          const shouldInclude = [[filters.Time1, 0, 4], [filters.Time2, 5, 11], [filters.Time3, 12+0, 12+4], [filters.Time4, 12+5, 12+11]].some(
            ([filter, startHour, endHour]) => filter && checkTimeRange((item?.departureTime), startHour as number, endHour as number)
          );
          return  shouldInclude;
        },
      ],
      [filters.Available, () => !filters.Available || true],
      [values, (item) => !values || (item?.price >= values[0] && item?.price <= values[1])],
      [durationValues, (item) => !durationValues || checkDurationRange(item?.duration, durationValues)],
      [filters.cheapest, (item) => +item.price === minPrice],
      [filters.carriers, (item) => Object.entries(filters.carriers).filter( ([k, v]) => !!v ).some( ([carrierCode]) => carrierCode === item.code ) ]
    ];
    return filtersAndFunctions.filter(([e]) => e).every(([_, condition]) =>  condition(flightItem));
  });


  const STEP = 50;
  const durStep = 1;
  const MIN = minPrice ? minPrice : 0;
  const MAX = maxPrice ? maxPrice : 100;

  

  return (
    <div>
      <NavBar />
      <Navbar2
        adults={+ (queryData?.adults || '0')}
        departureDate={queryData?.departureDate as string}
        originLocationCode={queryData?.originLocationCode as string}
        destinationLocationCode={queryData?.destinationLocationCode as string}
      />
      <Container>
        <div className="flex flex-col lg:flex-row">
          <div className=" w-full lg:w-[40%]">
            <div className="border-b-gray-200 w-[200px]  border-b-2 mb-5">
              <div className="flex items-center me-4">
                <input
                  id="green-checkbox"
                  checked={filters.nostops}
                  onChange={() => handleCheckboxChange("nostops")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Direct Flights
                </label>
              </div>

              <div className="flex items-center mt-2 me-4 mb-2">
                <input
                  id="green-checkbox"
                  checked={filters.stops}
                  onChange={() => handleCheckboxChange("stops")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  non Direct Flights
                </label>
              </div>
            </div>
            <h2 className="text-primeryLight mb-5">Duration</h2>
            {maxdur && mindur && durationValues && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width:"300px"
                }}
              >
                <Range
                  values={durationValues}
                  step={durStep}
                  min={mindur}
                  max={maxdur + 1}
                  onChange={(values) => {
                    setdurationValues(values);
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: "5px",
                          width: "100%",
                          borderRadius: "4px",
                          background: getTrackBackground({
                            values: durationValues,
                            colors: ["#ccc", "#548BF4", "#ccc"],
                            min: mindur,
                            max: maxdur,
                          }),
                          alignSelf: "center",
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "15px",
                        width: "15px",
                        borderRadius: "100%",
                        backgroundColor: "#196dfb",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0px 2px 6px #AAA",
                      }}
                    ></div>
                  )}
                />
                <output style={{ marginTop: "30px" }} id="output">
                  {convertToHoursAndMinutes(durationValues[0])} -{" "}
                  {convertToHoursAndMinutes(durationValues[1])}
                </output>
              </div>
            )}
            <h2 className="text-primeryLight mb-5 border-t-2 border-t-gray-200 w-[200px]">Airlines</h2>
            {carriers?.map((e) => {
              return (
                <div key={Math.random()} className="flex items-center mt-2 me-4">
                  <input
                    id="green-checkbox"
                    type="checkbox"
                    checked={filters.carriers[e.code]}
                    onChange={(y) =>
                      setFilters((x) => ({
                        ...x,
                        carriers: { ...x.carriers, [e.code]: y.target.checked },
                      }))
                    }
                    className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {e.name}
                  </label>
                </div>
              );
            })}

            <div className="border-b-gray-200 w-[200px]  border-b-2 mb-5  border-t-2 pt-5 mt-5">
              <h2 className="text-primeryLight mb-5">departureTime</h2>

              <div className="flex items-center mt-2 me-4">
                <input
                  id="green-checkbox"
                  checked={filters.Time1}
                  onChange={() => handleCheckboxChange("Time1")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  12:00 MN - 4:59 AM
                </label>
              </div>

              <div className="flex items-center mt-2 me-4 mb-2">
                <input
                  id="green-checkbox"
                  checked={filters.Time2}
                  onChange={() => handleCheckboxChange("Time2")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  5:00 AM - 11:59 AM
                </label>
              </div>
              <div className="flex items-center mt-2 me-4">
                <input
                  id="green-checkbox"
                  checked={filters.Time3}
                  onChange={() => handleCheckboxChange("Time3")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  12:00 NN - 4:59 PM
                </label>
              </div>

              <div className="flex items-center mt-2 me-4 mb-2">
                <input
                  id="green-checkbox"
                  checked={filters.Time4}
                  onChange={() => handleCheckboxChange("Time4")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  05:00 PM - 11:59 PM
                </label>
              </div>
            </div>

            <div className="border-b-gray-200 w-[200px]  border-b-2 mb-5   pt-5 mt-5">
              <h2 className="text-primeryLight mb-5">Flights</h2>

              <div className="flex items-center mt-2 me-4">
                <input
                  id="green-checkbox"
                  checked={filters.Available}
                  onChange={() => handleCheckboxChange("Available")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Available
                </label>
              </div>

              <div className="flex items-center mt-2 me-4 mb-2">
                <input
                  id="green-checkbox"
                  checked={filters.cheapest}
                  onChange={() => handleCheckboxChange("cheapest")}
                  type="checkbox"
                  className="w-6 h-6 text-[#99cc66] bg-gray-100 border-gray-300 rounded focus:ring-0  foucs:outline-none   "
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Cheapest
                </label>
              </div>
            </div>
            
            <h2 className="text-primeryLight mb-5">Price</h2>
            {minPrice && maxPrice && values && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width:"300px"
                }}
              >
                <Range
                  values={values}
                  step={STEP}
                  min={minPrice}
                  max={maxPrice + 1}
                  onChange={(values) => {
                    setValues(values);
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: "5px",
                          width: "100%",
                          borderRadius: "4px",
                          background: getTrackBackground({
                            values,
                            colors: ["#ccc", "#548BF4", "#ccc"],
                            min: MIN,
                            max: MAX,
                          }),
                          alignSelf: "center",
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "15px",
                        width: "15px",
                        borderRadius: "100%",
                        backgroundColor: "#196dfb",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0px 2px 6px #AAA",
                      }}
                    ></div>
                  )}
                />
                <output className=" text-primeryLight" style={{ marginTop: "30px" }} id="output">
                  {values ? values[0]?.toFixed(1) : 0}$ -{" "}
                  {values ? values[1]?.toFixed(1) : 10}$
                </output>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[60%] flex flex-col gap-10">
            {filteredData?.map((e) => {
              return (
                <div key={Math.random()} className=" bg-white flex flex-row items-center border-gray-200 border  shadow-lg py-7  ">
                  <div className=" flex flex-row items-center justify-around  w-full">
                    <div className="flex flex-col text-start">
                      <Image
                        className="  border-red-900 border rounded-full"
                        width={50}
                        height={50}
                        src={company}
                        alt=""
                      />

                      <p>
                        {e.code}
                        {e.travelCode}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-primery text-3xl">
                        {new Date(e.departureTime).getUTCHours() +
                          ":" +
                          new Date(e.departureTime).getUTCMinutes()}{" "}
                        <FaArrowRight className="inline text-gray-400 text-lg" />{" "}
                        {new Date(e.arrivalTime).getUTCHours() +
                          ":" +
                          new Date(e.arrivalTime).getUTCMinutes()}{" "}
                      </p>
                      <div className="text-primery text-lg flex flex-row gap-5  lg:gap-16 ">
                        <span>{e.departureCityCode}</span>
                        <span>{e.arrivalCityCode}</span>
                      </div>
                      <p className="text-gray-500">
                        {e.duration.slice(2).toLowerCase()}{" "}
                        {e.numberOfStops
                          ? e.numberOfStops + " stops"
                          : "Direct Flights"}{" "}
                      </p>
                      <p className="text-gray-500">
                        {e.code}
                        {e.travelCode}
                      </p>
                    </div>

                    <div>
                      <FaChair className="w-10 h-10 inline text-primery" />
                      <p className="inline text-sm px-1 py-0.5 bg-primery text-white rounded-full">
                        {e.numberOfSeats}
                      </p>
                      <p className="text-sm text-primery ">Available</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 px-5 border-l-gray-200 border-l-2  border-dotted">
                    <h2 className="text-3xl text-primeryLight"> {e.price} $</h2>
                    <button className="bg-primeryLight py-2 border-none w-48 text-white">
                      {" "}
                      Select
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default flights;
