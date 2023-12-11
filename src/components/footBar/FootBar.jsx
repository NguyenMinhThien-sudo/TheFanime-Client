import "./footBar.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const FootBar = () => {
  return (
    <div className="footBar">
      <span className="logo">TheFANIME</span>
      <div className="footTitleBox">
        <span className="footTitle2">
          TheFanime là một kho giải trí bất tận cung cấp những bộ phim hay và
          chất lượng nhất luôn sẵn sàng phục vụ các bạn.
        </span>
        <span className="footTitle2">
          Mọi nội dung đều được sưu tầm và nhúng vào website tương tự như công
          cụ tìm kiếm Google.
        </span>
        <span className="footTitle2">Mọi chi tiết xin liên hệ:</span>
        <a className="footTitle2">Quản trị viên: Nguyễn Minh Thiện</a>
        <a className="footTitle2">Sđt: 0354134240</a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          className="footTitle1"
          rel="noreferrer"
        >
          Facebook: https://www.facebook.com/
        </a>
        <a
          href="https://www.youtube.com/channel/UCzMLylfpyker5rRdydelRVg"
          target="_blank"
          className="footTitle1"
          rel="noreferrer"
        >
          Youtube: https://www.youtube.com/channel/UCzMLylfpyker5rRdydelRVg
        </a>
        <span className="footTitle">Copyright © 2023 TheFANIME</span>
      </div>
      <div className="footIcons">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <FacebookIcon className="footIcon facebook" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCzMLylfpyker5rRdydelRVg"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <YouTubeIcon className="footIcon youtube" />
        </a>
      </div>
    </div>
  );
};

export default FootBar;
