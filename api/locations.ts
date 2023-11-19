import { AxiosResponse  } from "axios";
import apiInstance from "../utils/base"
import {LocationsResponse} from '../responses/LocationsResponse'
export async function getAmadeusLocations(keyword: string): Promise<LocationsResponse | undefined> {
    try {
      const response: AxiosResponse<LocationsResponse> = await apiInstance.get('v1/reference-data/locations', {
        params:{
        subType: 'AIRPORT,CITY',
        keyword,
        'page[limit]': 10,
        'page[offset]': 0,
        sort: 'analytics.travelers.score',
        view: 'FULL',},
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error: ${response.status} - ${response.data}`);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  
    return undefined;
  }