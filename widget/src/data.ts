export const SERVER_URL = import.meta.env.DEV
  ? "http://localhost:8000"
  : "https://stockviz.onrender.com";
export const CLIENT_URL = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://stockviz.vercel.app";
