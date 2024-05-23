import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListBudgetEngage from "../../../components/budgetEngage/ListBudgetsEngage";

const PlanFinancement = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <ListBudgetEngage />
      </Container>
    </BackOfficeLayout>
  );
};

export default PlanFinancement;
