
import { io } from 'socket.io-client';
// const baseUrl = import.meta.env.VITE_BASE_URL;

const socket = io("https://skillswap-backend-65xf.onrender.com");

export default socket;
