import { AxiosResponse  } from "axios";
import apiInstance from "../utils/base"
import { Carrier, FlightOffersResponse } from "../responses/FlightOffersResponse";


interface FlightData {
  code: string;
  travelCode: string;
  duration: string;
  numberOfSeats: string;
  price: string;
  arrivalTime: string;
  arrivalCityCode: string;
  departureTime: string;
  departureCityCode: string;
  numberOfStops: string;
  validatingAirlineCodes: string;
}
interface GetFlightOffers {
  data : FlightData[];
  maxPrice: number;
  minPrice: number;
  journeyDurations: string[];
  carrieers : Carrier;
}

export async function getAmadeusFlightsOffers(query: {}): Promise<GetFlightOffers| undefined> {
    try {
      const response: AxiosResponse<FlightOffersResponse> = await apiInstance.get('v2/shopping/flight-offers', {
        params:{
        ...query,
        },
      });
  
      if (response.status === 200) {
        const data = response.data.data.map((e) => {
          const segments = e.itineraries?.[0]?.segments?.[0];
          return {
            code: segments?.carrierCode || "",
            travelCode: segments?.number || "",
            duration: e.itineraries?.[0]?.duration || "",
            numberOfSeats: e.numberOfBookableSeats || "",
            price: +e.price.total || 0,
            arrivalTime: segments?.arrival?.at || "",
            arrivalCityCode: segments?.arrival?.iataCode || "",
            departureTime: segments?.departure?.at || "",
            departureCityCode: segments?.departure?.iataCode || "",
            numberOfstops: segments?.numberOfStops || 0,
            validatingAirlineCodes: e.validatingAirlineCodes?.[0] || ""
          } as unknown as FlightData;
        });
        const prices = response.data.data.map((offer) => +offer.price.total);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const journeyDurations = response.data.data.flatMap(
          (offer) => offer.itineraries[0].duration
        );
        const carrieers = response.data.dictionaries?.carriers
        
        return {
          data,
          maxPrice,
          minPrice,
          journeyDurations,
          carrieers 
        }
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  
    return undefined;
  }