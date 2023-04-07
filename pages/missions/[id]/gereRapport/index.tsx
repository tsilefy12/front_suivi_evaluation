import { Container } from "@mui/material";
import React from "react";
import GereRapportDeMission from "../../../../components/gereRapportDeMission/GereRapportDeMission";
import BackOfficeLayout from "../../../../layouts/backOffice";

const GereRapport = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <GereRapportDeMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default GereRapport;
