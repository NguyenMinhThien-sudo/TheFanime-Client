import { useRef, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleStart = async () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("http://localhost:8800/api/auth/register", {
        email,
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <span className="logo">TheFANIME</span>
          <Link to="/login">
            <button className="loginButton">Đăng Nhập</button>
          </Link>
        </div>
      </div>
      <div className="registerContainer">
        <h1>Kho phim và hoạt hình không giới hạn</h1>
        <h2>Mọi lúc mọi nơi - Giải trí thỏa hơi</h2>
        <p>Bạn đã sẵn sàng chưa?</p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Sẵn Sàng
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Bắt Đầu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
