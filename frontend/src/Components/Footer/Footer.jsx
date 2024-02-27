import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const footerStyle = {
  //position: "absolute",
  bottom: "0",
  width: "100%",
  borderTop: "1px solid gray",
  marginTop: "2px",
  marginBottom: "3px",
};

const Footer = () => {
  return (
    <footer className="" style={footerStyle}>
      <div className="container d-flex justify-content-between align-items-center">
        <span className="flexSpan">&copy;2023 MebelCity</span>
        <span className="flexSpan">
          Следете нe
          <a href="#fb">
            <FacebookIcon style={{ color: "blue" }} />
          </a>
          <a href="#ig">
            <InstagramIcon style={{ color: "#833AB4" }} />{" "}
          </a>
          <a href="#yt">
            <YouTubeIcon style={{ color: "red" }} />{" "}
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
