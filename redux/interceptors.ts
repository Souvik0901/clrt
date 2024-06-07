import axios from "axios";
import Cookies from "js-cookie";
import { SERVICE_URL } from "@/utils/endpoint";



export const axiosInstance = axios.create({
    baseURL: `${SERVICE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
});

const onLogoutUser = async()=>{
  try {
    const response = await axios.post(`${SERVICE_URL}logout`, {token:Cookies.get('token')});
    // console.log(response); 
    Cookies.remove('token');
    if (typeof window !== 'undefined') {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}`;
    }
  } catch (error:any) {
    console.log(error);
  }
}

axiosInstance.interceptors.request.use(async(config)=>{
    const accessToken = await Cookies.get("token");  
    config.headers.authorization = accessToken ? `${accessToken}` : "";
    return config;
});

axiosInstance.interceptors.response.use(async function (response) {
  if (
    response.status == 200 &&
    response.data &&
    [401, 402, 403].includes(response.data.code)
  ) {
    await onLogoutUser();
  }
  return response;
});

