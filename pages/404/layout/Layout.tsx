import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  const theme = useTheme();

  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
