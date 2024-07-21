import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../layouts/backOffice";
import ListObjectifStrategique from "../../components/plan_travail/objectifStrategique";

const PlanTravail = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListObjectifStrategique />
      </div>
    </BackOfficeLayout>
  );
};

export default PlanTravail;
