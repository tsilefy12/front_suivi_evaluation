import React from "react";
import Container from "@mui/material/Container";
import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import TypeForm from "./TypeForm";
import ListType from "./table/ListType";

const TypeSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <TypeForm/>
        </Grid>
        <Grid item xs={12} md={8}>
          <ListType />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TypeSection;
