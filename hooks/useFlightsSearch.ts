import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAmadeusFlightsOffers } from '../api/flightsOffers';
import { changeTime } from '../utils/common';

const useFlightOffers = () => {
const router = useRouter();
  const query = router.query;

  const [flightsOffer, setFlightsOffer] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [mindur, setMindur] = useState(null);
  const [maxdur, setMAxdur] = useState(null);
  const queryData = query;
  const [values, setValues] = useState(null);
  const [durationValues, setdurationValues] = useState(null);
  
  const [filters, setFilters] = useState({
    nostops: true,
    stops: false,
    Time1: true,
    Time2: true,
    Time3: true,
    Time4: true,
    Available: true,
    cheapest: false,
    carriers: [],
  });

  

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (Object.keys(query).length === 0) return;

        const {
          data,
          minPrice,
          maxPrice,
          journeyDurations,
          carrieers: fetchedCarriers,
        } = await getAmadeusFlightsOffers(query);

        if (isMounted) {
          setCarriers(
            Object.entries(fetchedCarriers).map(([code, name]) => ({ code, name }))
          );

          setFilters((prevFilters: any) => ({
            ...prevFilters,
            carriers: Object.entries(fetchedCarriers).reduce(
              (v, [code]) => ({ ...v, [code]: true }),
              {}
            ),
          }));

          setValues([minPrice, maxPrice]);
          setMaxPrice(maxPrice);
          setMinPrice(minPrice);
          
          const time = changeTime(journeyDurations);
          setMindur(time[0]);
          setMAxdur(time[1]);
          setdurationValues(time);

          setFlightsOffer(data);
        }
      } catch (err) {
        console.error(err);
      }
    };


    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { flightsOffer, carriers, maxPrice, minPrice, mindur, maxdur, filters, setFilters, values, setValues, durationValues, setdurationValues, queryData };
};

export default useFlightOffers;
