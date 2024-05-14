import axios from "axios";

export const axiosService = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
