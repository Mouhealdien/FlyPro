interface FlightOffer {
    type: string;
    id: string;
    source: string;
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;
    numberOfBookableSeats: number;
    itineraries: {
      duration: string;
      segments: {
        departure: {
          iataCode: string;
          terminal?: string;
          at: string;
        };
        arrival: {
          iataCode: string;
          terminal?: string;
          at: string;
        };
        carrierCode: string;
        number: string;
        aircraft: {
          code: string;
        };
        operating: {
          carrierCode: string;
        };
        duration: string;
        id: string;
        numberOfStops: number;
        blacklistedInEU: boolean;
      }[];
    }[];
    price: {
      currency: string;
      total: string;
      base: string;
      fees: {
        amount: string;
        type: string;
      }[];
      grandTotal: string;
    };
    pricingOptions: {
      fareType: string[];
      includedCheckedBagsOnly: boolean;
    };
    validatingAirlineCodes: string[];
    travelerPricings: {
      travelerId: string;
      fareOption: string;
      travelerType: string;
      price: {
        currency: string;
        total: string;
        base: string;
      };
      fareDetailsBySegment: {
        segmentId: string;
        cabin: string;
        fareBasis: string;
        class: string;
        includedCheckedBags: {
          weight: number;
          weightUnit: string;
        };
      }[];
    }[];
  }
  
  interface Location {
    cityCode: string;
    countryCode: string;
  }
  
  interface Aircraft {
    [code: string]: string;
  }
  
  interface Currency {
    [code: string]: string;
  }
  
  export interface Carrier {
    [code: string]: string;
  }
  
  export interface FlightOffersResponse {
    meta: {
      count: number;
      links: {
        self: string;
      };
    };
    data: FlightOffer[];
    dictionaries: {
      locations: {
        [code: string]: Location;
      };
      aircraft: Aircraft;
      currencies: Currency;
      carriers: Carrier;
    };
  }