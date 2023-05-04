import { Container } from "@mui/material";
import React from "react";
// import PrevisionDeMission from "../../../../components/previsionMissions/Prevision";
import BackOfficeLayout from "../../../../layouts/backOffice";
import PrevisionDeMission from "../../../../components/previsionMissions/Prevision";

const PrevisionMissions = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <PrevisionDeMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default PrevisionMissions;
