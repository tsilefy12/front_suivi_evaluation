import { Container } from "@mui/material";
import React from "react";
import ValidationRapportMission from "../../../../components/validation/validationRapportDeMission/ValidationRapportDeMission";
import BackOfficeLayout from "../../../../layouts/backOffice";

const ValidationMissions = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl" sx={{ backgroundColor: "#fff" }}>
        <ValidationRapportMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default ValidationMissions;
