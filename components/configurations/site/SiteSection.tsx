import React from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import SiteForm from "./SiteForm";
import ListSite from "../../plan_travail/organanisme/tachesEtObjectifs/[id]/site";
import ListeSites from "./table/ListSite";

const SiteSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <SiteForm/>
        </Grid>
        <Grid item xs={12} md={8} padding={4}>
          <ListeSites />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SiteSection;
