import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import ValidationPrevisionMission from "../../../../components/validation/valdationPrevisionMission/ValidatioPrevisionMission";

const ValidationMissions = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl" >
        <ValidationPrevisionMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default ValidationMissions;
