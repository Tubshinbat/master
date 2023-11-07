"use client";
import HomeHeader from "components/Generals/Header";
import { useAuthContext } from "context/authContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function RootLayout({ children }) {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      redirect("/userprofile");
    }
  }, [user]);

  return <>{children}</>;
}
