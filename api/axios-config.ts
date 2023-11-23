import axios from "axios";

export const LOGINAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// API.interceptors.request.use(
//   (req) => {
//     let token = cookieStorage.getItem("bms-auth");
//     if (token) {
//       token = JSON.parse(token)?.access_token;
//       req.headers.Authorization = `bearer ${token}`;
//     }
//     return req;
//   },
//   (error) => {
//     toast.error("something went wrong");
//     Promise.reject(error);
//   }
// );
