import axios from "axios";

const axiosFirebase = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}api/firebase`,
  withCredentials: true,
});

export default axiosFirebase;
