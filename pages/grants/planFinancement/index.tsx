import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListPlanFinancement from "../../../components/planFinancement";

const PlanFinancement = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <ListPlanFinancement />
      </Container>
    </BackOfficeLayout>
  );
};

export default PlanFinancement;
