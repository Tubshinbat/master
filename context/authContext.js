"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./notificationContext";
import axios from "axios-base";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies(["nodetoken"]);
  const { setError, setAlert, setContentLoad } = useNotificationContext();
  const [user, setUser] = useState(null);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const checkToken = (token) => {
    axios
      .post("members/checktoken", {
        withCredentials: true,
        headers: { Cookie: `nodetoken=${token}` },
      })
      .then((result) => {
        if (!user) {
          setUser(result.data.user);
        }
      })
      .catch((error) => {
        logOut();
      });
  };

  const logOut = () => {
    axios.get("members/logout").catch((error) => {});
    setCode(false);
    setUser(null);
    setIsPassword(false);
    setIsRedirect(false);
    removeCookie("nodetoken");
  };

  const loginUser = (data) => {
    setContentLoad(true);
    axios
      .post("members/login", data)
      .then((result) => {
        setUser(result.data.user);
        setAlert("Амжилттай нэвтэрлээ");
        setContentLoad(false);
      })
      .catch((error) => {
        setError(error);
        setContentLoad(false);
      });
  };

  const userRegister = (formData) => {
    setContentLoad(true);
    axios
      .post("members/register", formData)
      .then((result) => {
        setAlert("Бүртгэл амжилттай хийгдлээ");
        setContentLoad(false);
        setIsRedirect(true);
      })
      .catch((error) => {
        setError(error);
        setContentLoad(false);
        setIsRedirect(false);
      });
  };

  const getUser = () => {
    if (!user && cookies.nodetoken) {
      setContentLoad(true);
      axios
        .get(`members/userdata`, {
          withCredentials: true,
          headers: { Cookie: `nodetoken=${cookies.nodetoken}` },
        })
        .then((res) => {
          setUser(res.data.data);
          setContentLoad(false);
        })
        .catch((error) => {
          setError(error);
          setContentLoad(false);
        });
    }
  };

  const checkUser = async () => {
    const token = cookies.nodetoken;
    if (!token) {
      setError("Уучлаарай нэвтэрч орно уу");
      return false;
    }

    try {
      const result = await axios.get(`users/userdata`, {
        withCredentials: true,
        headers: { Cookie: `nodetoken=${token}` },
      });

      return true;
    } catch {
      return false;
    }
  };

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
