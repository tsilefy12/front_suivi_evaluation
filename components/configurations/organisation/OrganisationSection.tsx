import React from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import OrganisationForm from "./OrganisationForm";
import ListOrganisation from "./table/ListOrganisation";

const OrganisationSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <OrganisationForm/>
        </Grid>
        <Grid item xs={12} md={8}>
          <ListOrganisation />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrganisationSection;
