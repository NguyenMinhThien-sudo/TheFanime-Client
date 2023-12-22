import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useWarningFavorite = () => {
  const favoriteWarn = () => {
    toast.warn("Chỉ thành viên VIP mới dùng được chức năng này!", {
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
    favoriteWarn,
  };
};

export default useWarningFavorite;
