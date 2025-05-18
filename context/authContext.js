"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./notificationContext";
import axios from "axios-base";
import { useCookies } from "react-cookie";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies(["nodetoken"]);
  const { setError, setAlert, setContentLoad } = useNotificationContext();
  const [user, setUser] = useState(null);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.post("/members/check", null, {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data.user);
      } catch (e) {
        setUser(null);
      } finally {
        setIsChecking(false); // ❗энэ нь байхгүй state байж болно
      }
    };
    checkToken();
  }, []);

  const logOut = async () => {
    removeCookie("nodetoken");
    await axios.get("members/logout").catch((error) => {});
    setUser(null);
    setIsPassword(false);
    setIsRedirect(false);
  };

  const loginUser = (data) => {
    setContentLoad(true);
    axios
      .post("members/login", data)
      .then((result) => {
        setUser(result.data.user);
        setAlert("Амжилттай нэвтэрлээ");
        setContentLoad(false);
        router.push("/profile");
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

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        userRegister,
        setIsRedirect,
        isRedirect,

        user,
        setUser,
        logOut,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
