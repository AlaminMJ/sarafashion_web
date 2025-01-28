// config.js
interface Config {
  apiUrl: string;
}

const env: { [key: string]: Config } = {
  development: {
    apiUrl: "http://localhost:5000/api/v1",
  },
  production: {
    apiUrl: "https://api.example.com",
  },
};

const environment = process.env.NODE_ENV || "development"; // Important!

export const config = env[environment];
