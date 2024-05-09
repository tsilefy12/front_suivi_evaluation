import React from "react";
import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../layouts/backOffice";
import useBasePath from "../hooks/useBasePath";
import HomePage from "../components/home";
import Dashboard from "../components/dashboard";

const Home: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <Dashboard />
      </Container>
    </BackOfficeLayout>
  );
};

export default Home;
