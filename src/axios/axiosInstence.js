import axios from "axios";
import { Navigate } from "react-router-dom";
// const baseUrl = import.meta.env.VITE_BASE_URL;
const refreshToken = localStorage.getItem("refresh_token");
// console.log(refreshToken);

const axiosInstencs = axios.create({
  baseURL: "https://skillswap-backend-65xf.onrender.com",
  // baseURL : baseUrl,
});

axiosInstencs.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 404) {
      
      axiosInstencs.post('/refresh-token',{token:refreshToken}).then((res)=>{
        // console.log(res.data);
        localStorage.setItem("access_token",res.data.accessToken)
        localStorage.setItem("refresh_token",res.data.refreshToken)
        window.location.reload()
      }).catch((err)=>{
        console.log(err);
        // localStorage.clear()
        
        
      })
      
      
    
    }
    console.log(error.response.status,"axiosintencs error");
    
    return Promise.reject(error);
  }
);
export default axiosInstencs;
