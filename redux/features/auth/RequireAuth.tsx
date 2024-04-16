import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";

const RequireAuth = ({ children }: any) => {
  const isLogedIn = useAppSelector((state: any) => state.auth.isLogedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLogedIn) window.location.href = "/login";
  }, [isLogedIn]);
  if (isLogedIn) return children;
  return null;
};

export default RequireAuth;
