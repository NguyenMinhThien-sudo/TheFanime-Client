import "./resetPassword.scss";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { endpointApi } from "../../Endpoint";

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state.email;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const response = await axios.post(
        `${endpointApi}/api/users/reset-password`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        setSuccess("Đổi mật khẩu thành công.");
        setError(null);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError("Đã xảy ra lỗi khi đổi mật khẩu.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
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
          <h1>Đặt Lại Mật Khẩu</h1>
          {success && (
            <p style={{ color: "#1bca39", fontSize: "13px" }}>{success}</p>
          )}
          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
          <input
            type="password"
            placeholder="Mật khẩu mới"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="resetBtn" onClick={handleResetPassword}>
            Đặt lại mật khẩu
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

export default ResetPassword;
