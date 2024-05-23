import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import AddNewBudgetInitial from "../../../../../components/budgetInitial/add/AddNewBudgetInitial";

const AddBudgetInitial = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <AddNewBudgetInitial />
      </Container>
    </BackOfficeLayout>
  );
};

export default AddBudgetInitial;
