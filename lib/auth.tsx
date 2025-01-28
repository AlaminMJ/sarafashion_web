import { api } from "./api";
import { HttpMethod } from "./api";

interface AuthCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: AuthCredentials) => {
  try {
    const response = await api({
      method: HttpMethod.POST,
      url: "/auth/login",
      body: credentials,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signup = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api<any, { data: { token: string } }>({
      method: HttpMethod.POST,
      url: "/auth/signup",
      body: credentials,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api({
      method: HttpMethod.POST,
      url: "/auth/logout",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await api({
      method: HttpMethod.POST,
      url: "/auth/verify-token",
      token,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
// Client-side functions
export function setClientCookie(token: string) {
  document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict; ${
    process.env.NODE_ENV === "production" ? "Secure;" : ""
  }`;
}

export function removeClientCookie() {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
