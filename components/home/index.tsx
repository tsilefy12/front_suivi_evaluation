import React from "react";
import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import useBasePath from "../../hooks/useBasePath";
import BackOfficeLayout from "../../layouts/backOffice";
import DashboardMission from "./Missions/DashboardMission";

const DashboardM: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <DashboardMission />
    </BackOfficeLayout>
  );
};

export default DashboardM;
