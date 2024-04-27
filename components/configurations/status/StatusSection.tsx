import React from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import StatusForm from "./StatusForm";
import ListStatus from "./table/ListStatus";

const StatusSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <StatusForm/>
        </Grid>
        <Grid item xs={12} md={8}>
          <ListStatus />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatusSection;
