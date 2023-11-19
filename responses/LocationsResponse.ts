 interface MetaData {
    count: number;
    links: {
      self: string;
      next: string;
      last: string;
    };
  }
  
  interface GeoCode {
    latitude: number;
    longitude: number;
  }
  
  interface Address {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    stateCode: string;
    regionCode: string;
  }
  
  interface Analytics {
    travelers: {
      score: number;
    };
  }
  
  interface Location {
    type: string;
    subType: string;
    name: string;
    detailedName: string;
    id: string;
    self: {
      href: string;
      methods: string[];
    };
    timeZoneOffset: string;
    iataCode: string;
    geoCode: GeoCode;
    address: Address;
    analytics: Analytics;
  }
  
  export interface LocationsResponse {
    meta: MetaData;
    data: Location[];
  }
  
