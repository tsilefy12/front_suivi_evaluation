import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import PrevisionDeMission from "../../../../components/previsionMissions/Prevision";

const PrevisionMissions = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 4, paddingRight: 8 }}>
        <PrevisionDeMission />
      </div>
    </BackOfficeLayout>
  );
};

export default PrevisionMissions;
