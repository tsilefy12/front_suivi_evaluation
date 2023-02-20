import {
  Button,
  Container,
  styled,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { SectionNavigation } from "../../../planTravail/objectifStrategique";

const GereEtat = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
      </SectionNavigation>
      <DetailsContainer>
        <Typography variant="h4" color="GrayText">
          Etat de prévision
        </Typography>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Elaboré par :
              </Typography>
              <Typography variant="body1" color="gray">
                Nom du responsable
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Vérifié financièrement par :
              </Typography>
              <Typography variant="body1" color="gray">
                Nom du responsable
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Vérifié techniquement par :
              </Typography>
              <Typography variant="body1" color="gray">
                Nom du responsable
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Payé par :
              </Typography>
              <Typography variant="body1" color="gray">
                Nom du responsable
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default GereEtat;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

