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
import { SectionNavigation } from "../ListGrants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const DetailGrantsEnCours = () => {
  return (
<Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation direction="row" justifyContent="space-between" sx={{mb:2}}>
        <Link href="/contracts">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details du contrats
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                GRANT :
              </Typography>
              <Typography variant="body1" color="gray">
                XXX-XXX-XXX
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Bailleur :
              </Typography>
              <Typography variant="body1" color="gray">
                nom de Bailleur
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Nom du Projet en Anglais :
              </Typography>
              <Typography variant="body1" color="gray">
                Value
              </Typography>
            </InfoItems>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Nom du Projet en Français :
              </Typography>
              <Typography variant="body1" color="gray">
                Value
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Responsable :
              </Typography>
              <Typography variant="body1" color="gray">
                Responsable1, Responsable2,...
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Date de Debut :
              </Typography>
              <Typography variant="body1" color="gray">
                dd/MM/YYYY
              </Typography>
            </InfoItems>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Date de fin :
              </Typography>
              <Typography variant="body1" color="gray">
                dd/MM/yyyy
              </Typography>
            </InfoItems>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Durée :
              </Typography>
              <Typography variant="body1" color="gray">
                x ans, xxmois et xxxjours 
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Montant en devise :
              </Typography>
              <Typography variant="body1" color="gray">
                10000$
              </Typography>
            </InfoItems>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Montant en MGA :
              </Typography>
              <Typography variant="body1" color="gray">
                40 000 000 ar
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailGrantsEnCours;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
