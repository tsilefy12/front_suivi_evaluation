import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import ListBudgetInitial from "../../../../../components/budgetInitial/[id]/list/ListBudgetsInitial";

const BudgetInitial = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <ListBudgetInitial />
      </Container>
    </BackOfficeLayout>
  );
};

export default BudgetInitial;
