import axios from "axios";

const SECRET_TOKEN = process.env.VUE_APP_MAPBOX_SECRET_TOKEN;
const PUBLIC_TOKEN = process.env.VUE_APP_MAPBOX_PUBLIC_TOKEN;

// Create a new instance of axios with custom configurations
const axiosInstance = axios.create({
  baseURL: "https://api.mapbox.com", // Set your base URL
  timeout: 5000, // Set a timeout (in milliseconds) for requests
  headers: {
    "Content-Type": "application/json", // Set the default Content-Type header
  },
});

// add token to axios header
axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${PUBLIC_TOKEN}`;

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// Function to make a GET request
async function get(url: string) {
  try {
    const response = await axiosInstance.get(url);
    return response.data ? response.data : response;
  } catch (error) {
    console.log(error);
  }
}

// Function to make a POST request
async function post(url: string, data: any) {
  try {
    // modify url to include ?access_token=PUBLIC_TOKEN
    const response = await axiosInstance.post(
      `${url}?access_token=${PUBLIC_TOKEN}`,
      data
    );
    return response.data ? response.data : response;
  } catch (error) {
    console.log(error);
  }
}

// Export the axios instance and service functions
export { SECRET_TOKEN, PUBLIC_TOKEN, axiosInstance, get, post };
