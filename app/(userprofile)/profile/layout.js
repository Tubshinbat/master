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

  return <>{children}</>;
}
