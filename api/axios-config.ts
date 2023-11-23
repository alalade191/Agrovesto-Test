import axios from "axios";

export const LOGINAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
