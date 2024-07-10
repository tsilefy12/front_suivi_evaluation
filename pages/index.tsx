import React from "react";
import { Container } from "@mui/material";
import type { NextPage } from "next";
import useBasePath from "../hooks/useBasePath";
import Dashboard from "./dashboard";
import Header from "../components/dashboards/Header";

const Home: NextPage = () => {
  const basePath = useBasePath();
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
};

export default Home;
