import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useWarningToast = () => {
  const toastWarn = () => {
    toast.warn("Chỉ thành viên VIP mới xem được phim này!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return {
    ToastContainer,
    toastWarn,
  };
};

export default useWarningToast;
