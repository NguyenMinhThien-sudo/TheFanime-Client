import "./forgotPassword.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { endpointApi } from "../../Endpoint";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${endpointApi}/api/users/forgot-password`,
        { email }
      );

      if (response.status === 200) {
        setSuccess(
          "Kiểm tra email thành công, bạn có thể tạo mật khẩu mới sau 3 giây nữa."
        );
        setError(null);
        setTimeout(() => {
          navigate("/resetPassword", { state: { email } });
        }, 3000);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      setError("Email này không tồn tại!");
      setSuccess(null);
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <span className="logo">TheFANIME</span>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Quên Mật Khẩu</h1>
          {success && (
            <p style={{ color: "#1bca39", fontSize: "13px" }}>{success}</p>
          )}
          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
          <input
            type="email"
            placeholder="Email kiểm tra"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="forgotBtn" onClick={handleForgotPassword}>
            Gửi yêu cầu
          </button>
          <span
            onClick={() => navigate("/login")}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            Trở về
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
