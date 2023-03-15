import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Divider,
  Grid,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Add from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyValue from "../shared/keyValue";
import ObjectifStrategiqueForm from "./add/addPlanTravail";

const ListObjectifStrategique = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        <Button
          onClick={handleClickOpen}
          color="primary"
          variant="contained"
          startIcon={<Add />}
        >
          Créer
        </Button>
        <Typography variant="h4" color="GrayText">
          Objectif strategique
        </Typography>
      </SectionNavigation>
      <Divider />
      <SectionDetails>
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Liste des objectifs stratégiques
          </Typography>
          <TextField
            variant="outlined"
            id="search"
            name="search"
            placeholder="Recherche"
            size="small"
          />
        </Stack>
        <ValueDetail>
          <KeyValue keyName="Année" value={"2023"} />
        </ValueDetail>
        <Grid container spacing={2} mt={2}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} item xs={12} md={6} lg={4}>
              <LinkContainer>
                <Typography color="GrayText" mb={2} variant="h6">
                  1. Promouvoir l’exploitation durable et équitable des espèces
                </Typography>
                <Link href="/plan_travail/tacheCle">
                  <Box>
                    <Button
                      variant="text"
                      color="info"
                      startIcon={<SettingsIcon />}
                    >
                      Tâches clés
                    </Button>
                  </Box>
                </Link>
                <Link href="/plan_travail/objectifGenerale">
                  <Box>
                    <Button
                      variant="text"
                      color="info"
                      startIcon={<SettingsIcon />}
                    >
                      Objectifs générales
                    </Button>
                  </Box>
                </Link>
              </LinkContainer>
            </Grid>
          ))}
        </Grid>
        <ValueDetail>
          <KeyValue keyName="Année" value={"2022"} />
        </ValueDetail>
        <Grid container spacing={2} mt={2}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} item xs={12} md={6} lg={4}>
              <LinkContainer>
                <Typography color="GrayText" mb={2} variant="h6">
                  1. Promouvoir l’exploitation durable et équitable des espèces
                </Typography>
                <Link href="/plan_travail/tacheCle">
                  <Box>
                    <Button
                      variant="text"
                      color="info"
                      startIcon={<SettingsIcon />}
                    >
                      Tâches clés
                    </Button>
                  </Box>
                </Link>
                <Link href="/plan_travail/objectifGenerale">
                  <Box>
                    <Button
                      variant="text"
                      color="info"
                      startIcon={<SettingsIcon />}
                    >
                      Objectifs générales
                    </Button>
                  </Box>
                </Link>
              </LinkContainer>
            </Grid>
          ))}
        </Grid>
        <ValueDetail>
          <KeyValue keyName="Année" value={"2021  "} />
        </ValueDetail>
        <Grid container spacing={2} mt={2}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} item xs={12} md={6} lg={4}>
              <LinkContainer>
                <Typography color="GrayText" mb={2} variant="h6">
                  1. Promouvoir l’exploitation durable et équitable des espèces
                </Typography>
                <Link href="/plan_travail/tacheCle">
                  <Box>
                    <Button
                      variant="text"
                      color="info"
                      startIcon={<SettingsIcon />}
                    >
                      Tâches clés
                    </Button>
                  </Box>
                </Link>
                <Link href="/plan_travail/objectifGenerale">
                  <Box>
                    <Button
                      variant="text"
                      color="info"
                      startIcon={<SettingsIcon />}
                    >
                      Objectifs générales
                    </Button>
                  </Box>
                </Link>
              </LinkContainer>
            </Grid>
          ))}
        </Grid>
      </SectionDetails>
      <Dialog open={open} onClose={handleClose}>
        <ObjectifStrategiqueForm />
      </Dialog>
    </Container>
  );
};

export default ListObjectifStrategique;

export const SectionNavigation = styled(Stack)(({}) => ({}));
const SectionDetails = styled(Box)(({ theme }) => ({
  padding: 3,
  marginBlock: 15,
  background: theme.palette.common.white,
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}));

const ValueDetail = styled(Stack)(({ theme }) => ({
  height: "28px",
  padding: 10,
}));
const LinkContainer = styled("div")(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
  padding: "20px",
}));
