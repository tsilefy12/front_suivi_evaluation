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
        {/* <Stack direction="row" spacing={2}> */}
        {/* <Link href="/missions/add"> */}
          <Button onClick={handleClickOpen} color="primary" variant="contained" startIcon={<Add />}>
            Créer
          </Button>
        {/* </Link> */}
        <Typography variant="h4" color="GrayText">
          Objectif strategique
        </Typography>
        {/* </Stack> */}
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
        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      1. Promouvoir l’exploitation durable et équitable des
                      espèces
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      2. Réduire le taux de déforestation dans les sites de
                      conservation
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      3. Restaurer les habitats dégradés dans toutes les sites
                      de conservation
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
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <ValueDetail>
          <KeyValue keyName="Année" value={"2022"} />
        </ValueDetail>
        <Grid container spacing={1} mt={1} >
          <Grid item xs={12} md={2} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      1. Promouvoir l’exploitation durable et équitable des
                      espèces
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      2. Réduire le taux de déforestation dans les sites de
                      conservation
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      3. Restaurer les habitats dégradés dans toutes les sites
                      de conservation
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
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <ValueDetail>
          <KeyValue keyName="Année" value={"2021"} />
        </ValueDetail>
        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      1. Promouvoir l’exploitation durable et équitable des
                      espèces
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      2. Réduire le taux de déforestation dans les sites de
                      conservation
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
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Typography color="GrayText" mb={2}>
                      3. Restaurer les habitats dégradés dans toutes les sites
                      de conservation
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
              </Grid>
            </Card>
          </Grid>
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
const LinkContainer = styled(Box)(({ theme }) => ({
  padding: 10,
  borderRadius: 20,
  background: "#fff",
}));
// export const InfoItems = styled(Stack)(({ theme }) => ({}));

const ValueDetail = styled(Stack)(({ theme }) => ({
  // width: "43px",
  height: "28px",
  padding: 10,
}));
