
import { toast } from 'react-toastify';

export const messageSuccess = (message) => 
toast(`🚀 ${message}`, {
position: "bottom-right",
autoClose: 4000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

export const messageError = (message) => 
toast.warn(`${message}`, {
position: "bottom-right",
autoClose: 4000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

