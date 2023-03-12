import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: url + "/api",
});

export default axiosInstance;
