import React from "react";
import type { NextPage } from "next";
import BackOfficeLayout from "../../layouts/backOffice";
import DashboardMission from "../../components/home/Missions/DashboardMission";

const Home: NextPage = () => {
  return (
    <BackOfficeLayout>
      <DashboardMission />
    </BackOfficeLayout>
  );
};

export default Home;
