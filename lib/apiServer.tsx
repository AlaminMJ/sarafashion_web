import { cookies } from "next/headers";
import { api } from "./api";

// Server-side function to make API requests with cookies
export const serverApiRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string,
  data: any = {} // Optional payload for POST/PUT
) => {
  try {
    const cookieStore = await cookies(); // Access cookies
    const token = cookieStore.get("token")?.value; // Get the token from cookies

    // Set the token in the headers for the server-side request
    const config = {
      method,
      url: endpoint,
      data, // Add data if provided
      headers: token ? { Cookie: `token=${token}` } : {},
    };

    // Make the API request
    const response = await api(config);
    return response.data; // Return the response data
  } catch (error: any) {
    console.error("Server API Error:", error.response || error.message);
    throw error.response?.data || error.message; // Rethrow the error
  }
};
