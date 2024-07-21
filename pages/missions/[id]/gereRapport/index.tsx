import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import GereRapportDeMission from "../../../../components/gereRapportDeMission/GereRapportDeMission";

const GereRapport = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 4, paddingRight: 8 }}>
        <GereRapportDeMission />
      </div>
    </BackOfficeLayout>
  );
};

export default GereRapport;
