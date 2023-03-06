import React from "react";
import Container from "@mui/material/Container";
import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import DeviseForm from "./DeviseForm";
import ListDevise from "./table/ListDevise";

const DeviseSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <DeviseForm />
        </Grid>
        <Grid item xs={12} md={8}>
          <ListDevise />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeviseSection;
