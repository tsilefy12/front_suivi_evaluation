import React from "react";
import Container from "@mui/material/Container";
import {  Grid } from "@mui/material";
import LineBudgetForm from "./LineBudgetForm";
import ListLineBudget from "./table/ListLineBudget";

const LineBudgetSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <LineBudgetForm/>
        </Grid>
        <Grid item xs={12} md={8}>
          <ListLineBudget />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LineBudgetSection;
