import axios from "axios";

// Create an Axios instance
export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure credentials (cookies) are sent
});
