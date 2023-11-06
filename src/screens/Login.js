import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import Axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://graceful-nightgown-wasp.cyclic.app/api/login").then(
      (response) => {
        if (response.data.loggedIn == true) {
          setLoginStatus(response.data.user[0].userName);
        }
      }
    );
  }, []);

  const login = () => {
    Axios.post("https://graceful-nightgown-wasp.cyclic.app/api/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].userName);
        navigate("/lessons");
      }
    });
  };

  return (
    <div class="login-page">
      <div class="form">
        <h2 style={{ marginBottom: 30 }}>Login</h2>
        <div class="login-form">
          <h1>{loginStatus}</h1>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={login}>login</button>
          <p class="message">
            Not registered?
            <a
              onClick={() => {
                navigate(`/register`);
              }}
              style={{ cursor: "pointer" }}
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
