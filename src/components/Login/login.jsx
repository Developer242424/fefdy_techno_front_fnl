import { useState, useEffect } from "react";
import "./login.css";

import Logo from "../../defaults/img/logo.png";
import test1 from "../../defaults/img/test (1).gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    console.log("Error...." + error);
    if (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}login`,
        formData
      );
      const { data, token } = res.data;
      // console.log(res.data);
      if (res.data.status === 400) {
        setError(res.data.message);
        return;
      }
      if (res.data.status === 500) {
        setError(res.data.message);
        return;
      }
      login(data, token, 1);
      // navigate("/");
      window.location.href = "/";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div id="wrapper" className="clearfix">
      <section className="top">
        <div className="main-content-area">
          <div className="login-container">
            <div className="login-form">
              <form onSubmit={handleSubmit} className="login-form-inner">
                <div className="logo">
                  <img
                    src={Logo}
                    className="logo-default logo-2x retina"
                    alt="Dolphin Logo"
                  />
                </div>
                <h1>Login</h1>
                <div className="login-form-group">
                  <label htmlFor="username">
                    User Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="User Name"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="login-form-group">
                  <label htmlFor="password">
                    Password <span className="required-star">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="login-form-group single-row">
                  {/* <div className="custom-check">
                    <input
                      autoComplete="off"
                      type="checkbox"
                      id="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>

                  <a href="#" className="link forgot-link">
                    Forgot Password ?
                  </a> */}
                </div>

                <button type="submit" className="rounded-button login-cta">
                  Submit
                </button>
              </form>
            </div>

            <div className="onboarding">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide color-1">
                    <div className="slide-image">
                      <img src={test1} loading="lazy" alt="" />
                    </div>
                    <div className="slide-content">
                      <h2>Fefdy Techno</h2>
                      <p>
                        Consistent quality and experience across all platforms
                        and devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
