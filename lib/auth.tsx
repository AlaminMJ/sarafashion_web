import { api } from "./api";

export async function login(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signup(name: string, email: string, password: string) {
  try {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const response = await api.post("/auth/verify-token", {
      token,
    });
    return response.data; // Assuming the server returns the payload if the token is valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

// Client-side functions
export function setClientCookie(token: string) {
  document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict; ${
    process.env.NODE_ENV === "production" ? "Secure;" : ""
  }`;
}

export function removeClientCookie() {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
