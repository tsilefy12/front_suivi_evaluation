import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListBudgetEngage from "../../../components/budgetEngage/ListBudgetsEngage";

const BudgetEngage = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 4, paddingRight: 8 }}>
        <ListBudgetEngage />
      </div>
    </BackOfficeLayout>
  );
};

export default BudgetEngage;
