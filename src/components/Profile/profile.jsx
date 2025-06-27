import "./profile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("img/profile-pic.png");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
  const { auth, setCommonError, setCommonWarning, setCommonSuccess } =
    useAuth();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}myprofile`,
          { token: auth.token }
        );

        if (res.data.status === 200) {
          const userData = res.data.data;
          setName(userData.name || "");
          setEmail(userData.email || "");
          if (userData.profile) {
            setProfileImage(`${publicURL}${userData.profile}`);
          }
        } else if (res.data.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching data:", res.data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch profile.");
      }
    };

    fetchData();
  }, [auth.token, navigate]);

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("token", auth.token);
      formData.append("name", name);
      formData.append("email", email);
      if (imageFile) {
        formData.append("profile_image", imageFile);
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        setCommonSuccess("Profile updated successfully!");
      } else if (response.data.status === 401) {
        navigate("/login");
      } else {
        setCommonError(response.data.message || "Error updating profile");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("An error occurred while updating the profile.");
    }
  };

  if (!auth.token) return null;

  return (
    <div className="section-content">
      <div className="row">
        {/* Left Profile Card */}
        <div className="col-md-12 col-lg-4 col-xl-4">
          <div className="tm-sc-nav-tabs-profile nav-tab-btn-button button-rounded">
            <div
              className="card shadow-sm text-center"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                background: "#fff",
                height: "100%",
              }}
            >
              <form onSubmit={formSubmit}>
                <div className="position-relative">
                  <img
                    id="profileImage"
                    src={profileImage}
                    alt="Profile"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <label
                      htmlFor="uploadProfilePic"
                      className="btn btn-light"
                      style={{
                        borderRadius: "50%",
                        padding: "8px",
                        border: "2px solid #fff",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="fas fa-camera"
                        style={{ fontSize: "20px", color: "#505050" }}
                      ></i>
                    </label>
                    <input
                      type="file"
                      id="uploadProfilePic"
                      accept="image/*"
                      className="form-control mb-2"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div
                  className="p-3 card1"
                  style={{ borderTop: "2px solid #e0e0e0" }}
                >
                  <div className="mb-2 text-start">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control mb-2"
                      style={{ fontSize: "14px" }}
                    />
                    {error && (
                      <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
                    )}
                  </div>

                  <button
                    className="btn btn-sm"
                    type="submit"
                    style={{
                      backgroundColor: "#e6d4ff",
                      color: "#111111",
                      width: "100%",
                      fontWeight: 500,
                      borderRadius: "8px",
                      padding: "8px 16px",
                    }}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Logo and Address */}
        <div className="col-md-12 col-lg-8 col-xl-8">
          <div className="tm-sc-nav-tabs-profile nav-tab-btn-button button-rounded">
            <div
              className="row d-flex justify-content-center align-items-center"
              style={{ height: "65vh" }}
            >
              <div className="col-md-5 text-center">
                {auth?.user?.org_profile ? (
                  <img
                    src={publicURL + auth.user.org_profile}
                    alt="Logo"
                    className="img-fluid"
                  />
                ) : (
                  <p>Loading logo...</p>
                )}
              </div>

              <div className="col-md-7 text-start">
                <div className="address-container">
                  {auth?.user ? (
                    <>
                      <span class="strong">
                        <strong>Organisation Details:</strong>
                      </span>
                      <p>
                        <strong>Organisation Name:</strong> {auth.user.org_name}
                      </p>
                      <p>
                        <strong>Organiser Name:</strong> {auth.user.orgnsr_name}
                      </p>
                      <p>
                        <strong>Email:</strong> {auth.user.org_email}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {auth.user.org_mobile}
                      </p>
                    </>
                  ) : (
                    <p>Loading organisation details...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
