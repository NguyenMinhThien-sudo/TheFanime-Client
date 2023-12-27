import { useNavigate } from "react-router-dom";
import "./paypalCheckout.scss";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import { endpointApi } from "../../Endpoint";

const PaypalCheckout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const notify = () => {
    toast.success(
      "🦄 Đăng ký thành công! Giờ đây bạn đã là thành viên VIP của TheFANIME, bạn sẽ được đưa đến trang đăng nhập, vui lòng đăng nhập lại tận hưởng đặc quyền VIP nào.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  const handleLoginAgain = () => {
    setTimeout(() => {
      dispatch(logout());
      navigate("/login");
    }, 7000);
  };

  //Update vip
  const updateUserVipStatus = async (userId) => {
    try {
      const response = await fetch(
        `${endpointApi}/api/users/updateVip/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            vipStatus: true,
          }),
        }
      );

      if (response.ok) {
        console.log("User VIP status updated successfully");
      } else {
        console.error("Failed to update user VIP status");
      }
    } catch (error) {
      console.error("Error updating user VIP status:", error.message);
    }
  };

  const createOrder = async () => {
    return await fetch(`${endpointApi}/api/paypal/payment/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          decription: "VIP Member",
          cost: "5.00",
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = async (data) => {
    return await fetch(
      `${endpointApi}/api/paypal/payment/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then((response) => {
        console.log("Thanh toán thành công!");
        return response.json();
      })
      .then((json) => {
        console.log(json);
        if (json && json.status === "COMPLETED") {
          updateUserVipStatus(user._id);
          notify();
          handleLoginAgain();
        }
      });
  };
  return (
    <div className="paypalBtnCheckout">
      <h1 style={{ textAlign: "center", padding: "15px" }}>ĐĂNG KÝ VIP</h1>
      <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
      <h4 style={{ textAlign: "center", color: "#049edf" }}>TheFANIME</h4>
      <h4
        style={{
          textAlign: "center",
          color: "#ff0066",
          textDecoration: "underline",
          fontSize: "13px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Trở về
      </h4>
      <ToastContainer />
    </div>
  );
};

export default PaypalCheckout;
