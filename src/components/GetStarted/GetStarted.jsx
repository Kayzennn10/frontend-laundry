import React from "react";
import "./GetStarted.css";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleNavigateGetStarted = () => {
    navigate("/login");
  }
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with Spotlessness</span>
          <span className="secondaryText">
            Subscribe and find super attractive price quotes from us.
            <br />
            Find your service soon
          </span>
          <button className="button" href>
            <a type="submit" onClick={handleNavigateGetStarted}>Get Started</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
