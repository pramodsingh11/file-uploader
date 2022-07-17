import React from "react";
import GoogleFram from "../images/googlefram.png";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const LoginPage = (props) => {
  const history = useNavigate();

  const handleLogin = (res) => {
    localStorage.setItem("userName", res.profileObj.name);
    history("upload-file")
  };
  const handleFailure = (res) => {
    console.log("falure", res);
  };

 
  const handleGoogleLogin=()=>{
    function start() {
      gapi.client.init({
        clientId: "64739650280-771rgth47tp11tj18p0s3q1omokja9cp.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }
  return (
    <>
      <div className="cover">
        <div className="tabLanding">
          <div style={{ margin: "5%", marginTop: "5%" }}>
            <img src={GoogleFram} alt="PaymeIndia" />
          </div>

          <div>
            {/* <div
                onClick={() => {
                  history("/upload-file");
                }}
                className="googletext"
              > */}{" "}
          </div>
          <div
            style={{
              borderRadius: "20px",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            <GoogleLogin
              onClick={handleGoogleLogin}
              className="googletext"
              clientId="64739650280-771rgth47tp11tj18p0s3q1omokja9cp.apps.googleusercontent.com"
              buttonText="Sign up with google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
            {/* </div> */}
          </div>

          <p style={{ cursor: "pointer", fontWeight: 500 }}>
            Not a Gmail User ?
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
