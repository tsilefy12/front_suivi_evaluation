import { Container } from "@mui/material";
import React from "react";
import PrevisionDeMission from "../../../components/previsionMissions/Prevision";
import BackOfficeLayout from "../../../layouts/backOffice";

const PrevisionMissions = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl" sx={{ backgroundColor: "#fff" }}>
        <PrevisionDeMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default PrevisionMissions;
