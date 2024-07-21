import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import ListBudgetInitial from "../../../../../components/budgetInitial/[idEdit]/list/ListBudgetsInitial";

const BudgetInitial = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListBudgetInitial />
      </div>
    </BackOfficeLayout>
  );
};

export default BudgetInitial;
