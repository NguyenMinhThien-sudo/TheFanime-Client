import { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../authContext/AuthContext";
import { login } from "../../authContext/apiCalls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }, dispatch);
      if (response && response.status === 200) {
        response();
      } else {
        setError("Sai tài khoản hoặc mật khẩu");
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
          <h1>Đăng Nhập</h1>
          {error && (
            <p className="error" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && (
            <p className="error" style={{ color: "red" }}>
              {error}
            </p>
          )}
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="loginButton"
            style={{ backgroundColor: "rgb(255, 0, 102)" }}
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <span>
            Bạn mới sử dụng The Fanime?{" "}
            <b onClick={() => navigate("/register")}>Đăng ký ngay!</b>
          </span>
          <span
            onClick={() => navigate("/forgotPassword")}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Quên mật khẩu!
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
