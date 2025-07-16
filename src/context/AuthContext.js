import { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  const [commonError, setCommonError] = useState(null);
  const [commonWarning, setCommonWarning] = useState(null);
  const [commonSuccess, setCommonSuccess] = useState(null);

  useEffect(() => {
    if (commonError) {
      // toast.error(commonError, {
      //   position: "top-right",
      //   autoClose: 3000, // in milliseconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: commonError,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // console.log(commonError);
      setTimeout(() => {
        setCommonError(null);
      }, 2000);
    }
    if (commonWarning) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: commonWarning,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // console.log(commonError);
      setTimeout(() => {
        setCommonWarning(null);
      }, 2000);
    }
    if (commonSuccess) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: commonSuccess,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // console.log(commonError);
      setTimeout(() => {
        setCommonSuccess(null);
      }, 2000);
    }
  }, [commonError, commonWarning, commonSuccess]);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("authData");
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    } catch (err) {
      setCommonError("Failed to parse auth data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (auth.user && auth.token) {
        localStorage.setItem("authData", JSON.stringify(auth));
      } else {
        localStorage.removeItem("authData");
      }
    } catch (err) {
      setCommonError("Error saving auth data.");
    }
  }, [auth]);

  const login = (userData, token) => {
    setAuth({ user: userData, token });
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("authData");
    // localStorage.clear();
    navigate("/login");
  };

  // console.log("Auth Datas::::", auth);

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        isLoading,
        setCommonError,
        setCommonWarning,
        setCommonSuccess,
      }}
    >
      <ToastContainer />
      {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
