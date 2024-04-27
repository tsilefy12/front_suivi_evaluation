import React from "react";
import Container from "@mui/material/Container";
// import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import PostAnalyticForm from "./ProjectForm";
import ListPosatAnalytic from "./table/ListProject";
import { Grid } from "@mui/material";
import ProjectForm from "./ProjectForm";
import ListProject from "./table/ListProject";

const ProjectSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <ProjectForm/>
        </Grid>
        <Grid item xs={12} md={8}>
          <ListProject />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectSection;
