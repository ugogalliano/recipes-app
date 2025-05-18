import axios from "axios";
import { baseUrl } from "@/config/costants";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export { axiosInstance };
