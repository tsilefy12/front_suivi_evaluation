import { Container } from "@mui/material";
import React from "react";
import ValidationPrevisionMission from "../../../../components/validation/valdationPrevisionMission/ValidatioPrevisionMission";
import BackOfficeLayout from "../../../../layouts/backOffice";

const ValidationMissions = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl" sx={{ backgroundColor: "#fff" }}>
        <ValidationPrevisionMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default ValidationMissions;
