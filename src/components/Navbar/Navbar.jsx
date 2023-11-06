import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [loginStatus, setLoginStatus] = useState();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      Axios.get("https://graceful-nightgown-wasp.cyclic.app/api/login").then(
        (response) => {
          if (response.data.loggedIn == true) {
            setLoginStatus(response.data.user[0].userName);
            isInitialMount.current = false;
          } else {
            setLoginStatus(false);
          }
        }
      );
    }
  });

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img
          src={images.logo}
          alt="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/home`);
          }}
        />
      </div>
      <ul className="app__navbar-links">
        {["home", "lessons", "info", "recognition"].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <Link to={`${item}`}>
              <a>{item}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="app__navbar-links2">
        <li
          className="app__flex p-text"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {loginStatus ? (
            <Link to={`/userpage/${loginStatus}`}>
              <a>{loginStatus}</a>
            </Link>
          ) : (
            <Link to={`login`}>
              <a>Login</a>
            </Link>
          )}
        </li>
      </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {["home", "lessons", "info", "recognition"].map((item) => (
                <li key={item}>
                  <Link to={`${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                {loginStatus ? (
                  <Link to={`/userpage/${loginStatus}`}>
                    <a>{loginStatus}</a>
                  </Link>
                ) : (
                  <Link to={`login`}>
                    <a>Login</a>
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
