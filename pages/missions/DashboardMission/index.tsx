import React from "react";
import { Container } from "@mui/material";
import type { NextPage } from "next";
import DashboardM from "../../../components/home";
import useBasePath from "../../../hooks/useBasePath";

const Home: NextPage = () => {
  const basePath = useBasePath();
  return (
    <>
      <DashboardM />
    </>
  );
};

export default Home;
