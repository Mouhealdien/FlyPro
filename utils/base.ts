import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = 'https://test.api.amadeus.com/';
const clientId = 'w1ANQZv5ZAyIe1KE2JUk6Re7vr4NignS';
const clientSecret = 'GG1GlX4H3NJro90t';

let x=false;
// Create an Axios instance with baseURL
const apiInstance: AxiosInstance = axios.create({
  baseURL,
 
});

// Function to refresh the access token

async function refreshAccessToken(): Promise<string | undefined> {
   
    if(x) return
    x=true;
  try {
    const response: AxiosResponse<{ access_token: string }> = await apiInstance.post('v1/security/oauth2/token',`grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      } 
    
    );

    if (response.status === 200) {
      return response.data.access_token;
    } else {
      console.error(`Error refreshing token: ${response.status} - ${response.data}`);
    }
  } catch (error) {
    console.error('An error occurred while refreshing token:', error.message);
  }

  return undefined;
}

// Request interceptor to attach the access token to requests
apiInstance.interceptors.request.use(async (config) => {
  const accessToken = await refreshAccessToken();

  if (accessToken) {
    apiInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Authorization=`Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor to handle 401 errors
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Attempt to refresh the token and retry the original request
      const accessToken = await refreshAccessToken();

      if (accessToken) {
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axios.request(error.config);
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance