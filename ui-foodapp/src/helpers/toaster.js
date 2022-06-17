import {  toast } from 'react-toastify';

const successToast = (message)=>{
    toast.success(`🦄${message}` , {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
  });
}

const errorToast = (message)=>{
    toast.error(`🦄${message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export default {successToast,errorToast}