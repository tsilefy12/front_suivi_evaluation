import React from "react";
import Container from "@mui/material/Container";
import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import PostAnalyticForm from "./PostAnalyticForm";
import ListPosatAnalytic from "./table/ListPostAnalytic";

const PostAnalyticSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <PostAnalyticForm/>
        </Grid>
        <Grid item xs={12} md={8}>
          <ListPosatAnalytic />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostAnalyticSection;
