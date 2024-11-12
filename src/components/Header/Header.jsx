import React, { useEffect, useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, useNavigate } from "react-router-dom";
import NavbarLogo2 from "/navbarLogo2.png";
import API from "../../api";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate = useNavigate();

  const handleViewAllService = () => {
    Navigate("/services");
  };

  const handleLogin = () => {
    if (isLoggedIn) {
      localStorage.clear();
      Navigate("/login");
    } else {
      Navigate("/login");
    }
  };

  const fetchData = async () => {
    try {
      const data = await API.getService()
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <section className="h-wrapper" style={{ background: "#131110" }}>
      <div className="flexCenter innerWidth paddings h-container">
        <Link to="/">
          <img
            src={NavbarLogo2}
            alt=""
            width={120}
            height={80}
            style={{ marginRight: "10px", textDecoration: "none" }}
          />
        </Link>

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <a type="submit" onClick={handleViewAllService}>
              Service
            </a>
            <button className="button" onClick={handleLogin}>
              {localStorage.getItem("email") ? "Logout" : "Login"}
            </button>
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
