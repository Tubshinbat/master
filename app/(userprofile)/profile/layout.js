"use client";
import { useAuthContext } from "context/authContext";
import { useNotificationContext } from "context/notificationContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function RootLayout({ children }) {
  const { user, memberCheck, logOut } = useAuthContext();
  const { contentLoad, setContentLoad } = useNotificationContext();
  const [cookies, removeCookie] = useCookies(["nodetoken"]);

  useEffect(() => {
    setContentLoad(true);
    const checkData = async () => {
      await memberCheck(cookies.nodetoken);
      setContentLoad(false);
    };
    checkData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setContentLoad(false);
    const checkData = async () => {
      const result = await memberCheck(cookies.nodetoken);
      if (!user) {
        logOut();
        redirect("/login");
      }
    };

    if (!cookies.nodetoken || !user) redirect("/login");

    if (cookies.nodetoken) checkData().catch((error) => console.log(error));
    else {
      logOut();
      redirect("/login");
    }
  }, [cookies, cookies.nodetoken, user]);

  return <>{children}</>;
}
