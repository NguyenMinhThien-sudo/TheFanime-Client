import { useNavigate } from "react-router-dom";
import FootBar from "../../components/footBar/FootBar";
import Narbar from "../../components/narbar/Narbar";
import "./personal.scss";

const Personal = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Narbar />
      <div className="personal">
        <div className="personalBox">
          <span className="backBtn" onClick={() => navigate("/")}>
            {"< "}Quay lại
          </span>
          <h1>THÔNG TIN CÁ NHÂN</h1>
          <div className="personalImg">
            <img
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://nld.mediacdn.vn/291774122806476800/2022/6/14/photo-1-16551706603492139259985.jpg"
              }
              alt=""
            />
          </div>
          <div className="personalBody">
            <div className="personalItem">
              <label>Tên thành viên: </label>
              <span>{user.username || ""}</span>
            </div>
            <div className="personalItem">
              <label>Địa chỉ email: </label>
              <span>{user.email || ""}</span>
            </div>
            <div className="personalItem">
              <label>Loại thành viên: </label>
              <span>{user.vip ? "VIP" : "Thường"}</span>
            </div>
          </div>
        </div>
      </div>
      <FootBar />
    </>
  );
};

export default Personal;
