//Navbar.js
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { signout } from "../store/slices/user";

const Navbar = ({ navClass, linkClassName }) => (
  <NavComponent navClass={navClass} linkClassName={linkClassName} />
);

export const NavComponent = ({ navClass, linkClassName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(signout());
    navigate("/signin");
  };
  return (
    <nav className={navClass}>
      {["Projects", "About", "Contact"].map((section) => (
        <Link to={section} smooth={true} className={linkClassName}>
          {section}
        </Link>
      ))}
      <span className={linkClassName} onClick={handleClick}>
        Logout
      </span>
    </nav>
  );
};
export default Navbar;
