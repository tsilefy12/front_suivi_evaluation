import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import GereRapportDeMission from "../../../../components/gereRapportDeMission/GereRapportDeMission";

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
