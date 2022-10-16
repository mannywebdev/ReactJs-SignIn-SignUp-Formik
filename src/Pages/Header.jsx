// Header.js
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-scroll";
import SmallScreensNavbar from "./SmallScreenNavbar";
import { useWindowWidthAndHeight } from "../Components/WindowSize";

const Header = () => {
  const [width, height] = useWindowWidthAndHeight();
  console.log(height);
  return (
    <header>
      <div className="header-inner">
        <Link to="Home" smooth={true} className="logo nav-link">
          Hartley Lab
        </Link>

        {width > 1000 ? (
          <Navbar navClass="nav-big" linkClassName="nav-big-link" />
        ) : (
          <SmallScreensNavbar
            navClass="nav-small"
            linkClassName="nav-small-link"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
