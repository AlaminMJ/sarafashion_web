import { config } from "./config";

/**
 * Interface for API responses.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

/**
 * Enum for HTTP methods.
 */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

/**
 * Interface for API request options.
 */
export interface ApiRequestOptions<T> {
  method: HttpMethod;
  url: string;
  body?: T;
  token?: string | undefined;
}

// Base URL for API requests
const BASE_URL = config.apiUrl;

/**
 * Helper function to create request headers.
 */
const createHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Cookie"] = `token=${token}`;
  }
  return headers;
};

/**
 * Helper function to handle API responses.
 */
const handleResponse = async <R,>(
  response: Response
): Promise<ApiResponse<R | null>> => {
  return await response.json();
};

/**
 * Main function to make HTTP requests to the API.
 */
export const api = async <T, R>({
  method,
  url,
  body,
  token,
}: ApiRequestOptions<T>): Promise<ApiResponse<R | null>> => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: createHeaders(token),
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
      credentials: "include",
    });
    const res = await handleResponse<R>(response);
    return res;
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
