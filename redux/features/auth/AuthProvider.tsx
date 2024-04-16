import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { axios } from "../../../axios";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { logout, relogedConnectedUser } from "./authSlice";

const AuthProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  /**
   * Check if the user is connected
   * If yes then reload the user data
   */
  useEffect(() => {
    addAxiosResponseInterceptor();
    fetchConnectedUser();
  }, []);

  const addAxiosResponseInterceptor = () => {
    axios.interceptors.response.use(
      function (response: any) {
        return response;
      },
      async function (error: any) {
        if (error.response.status === 401 || error.response.status === 403) {
          await dispatch(logout({}));
          // router.push("/login");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  };

  const fetchConnectedUser = async () => {
    try {
      // verify if the user is connected
      const accessToken = localStorage.getItem("at");
      if (!accessToken) {
        setLoading(false);
        return;
      }
      // if the user is connected then reload the user data
      await dispatch(relogedConnectedUser()).unwrap();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return <>{children}</>;
};

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ transform: "" }} />
    </Box>
  );
};

export default AuthProvider;
