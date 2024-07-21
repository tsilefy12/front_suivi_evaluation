import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListPlanFinancement from "../../../components/planFinancement";

const PlanFinancement = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListPlanFinancement />
      </div>
    </BackOfficeLayout>
  );
};

export default PlanFinancement;
