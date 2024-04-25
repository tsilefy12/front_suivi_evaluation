import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import ValidationRapportMission from "../../../../components/validation/validationRapportDeMission/ValidationRapportDeMission";
const ValidationMissions = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <ValidationRapportMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default ValidationMissions;
