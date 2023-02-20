import {
  Box,
  Button,
  Card,
  Container,
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
import Edit from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const ListMissions = () => {
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        {/* <Stack direction="row" spacing={2}> */}
        <Link href="/missions/add">
          <Button color="primary" variant="contained" startIcon={<Add />}>
            Créer
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Missions
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
            Liste des Missions
          </Typography>
          <TextField
            variant="outlined"
            id="search"
            name="search"
            placeholder="Recherche"
            size="small"
          />
        </Stack>
        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinkContainer>
                    <Stack direction="row">
                      <Typography sx={{ mb: 2 }} variant="h6" color="GrayText">
                        REF REF_MISSION_001
                      </Typography>
                      <Grid sx={{ ml: 3, mt: -0.5 }}>
                        <Button startIcon={<Edit />} sx={{ mb: 2 }} />
                        <Button
                          startIcon={<CancelIcon />}
                          color="warning"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                    </Stack>
                    <Typography color="GrayText" mb={2}>
                      Description de la mission de la mission description de la
                      mssion
                    </Typography>
                    <Grid container spacing={1} my={1}>
                      <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                          <Typography variant="body1" color="secondary">
                            Responsable :
                          </Typography>
                          <Typography variant="body1" color="gray">
                            Andry Blame
                          </Typography>
                        </InfoItems>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} my={1}>
                      <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                          <Typography variant="body1" color="secondary">
                            Gestionnaire :
                          </Typography>
                          <Typography variant="body1" color="gray">
                            Andry Blame
                          </Typography>
                        </InfoItems>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Stack direction="row" spacing={2}>
                      <Link href="/missions/id/gereEtat">
                        <Box>
                          <Button variant="text" color="info">
                            Gérer Etat de prévision
                          </Button>
                        </Box>
                      </Link>
                      <Link href="/missions/id/bilan">
                        <Box>
                          <Button variant="text" color="info">
                            Voir le Bilan
                          </Button>
                        </Box>
                      </Link>
                    </Stack>
                    <Link href="/missions/id/gereRapport">
                      <Box>
                        <Button variant="text" color="info">
                          Gérer Rapport
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
                    <Stack direction="row">
                      <Typography sx={{ mb: 2 }} variant="h6" color="GrayText">
                        REF REF_MISSION_001
                      </Typography>
                      <Grid sx={{ ml: 3, mt: -0.5 }}>
                        <Button startIcon={<Edit />} sx={{ mb: 2 }} />
                        <Button
                          startIcon={<CancelIcon />}
                          color="warning"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                    </Stack>
                    <Typography color="GrayText" mb={2}>
                      Description de la mission de la mission description de la
                      mssion
                    </Typography>
                    <Grid container spacing={1} my={1}>
                      <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                          <Typography variant="body1" color="secondary">
                            Responsable :
                          </Typography>
                          <Typography variant="body1" color="gray">
                            Andry Blame
                          </Typography>
                        </InfoItems>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} my={1}>
                      <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                          <Typography variant="body1" color="secondary">
                            Gestionnaire :
                          </Typography>
                          <Typography variant="body1" color="gray">
                            Andry Blame
                          </Typography>
                        </InfoItems>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Stack direction="row" spacing={2}>
                      <Link href="/missions/id/gereEtat">
                        <Box>
                          <Button variant="text" color="info">
                            Gérer Etat de prévision
                          </Button>
                        </Box>
                      </Link>
                      <Link href="/missions/id/bilan">
                        <Box>
                          <Button variant="text" color="info">
                            Voir le Bilan
                          </Button>
                        </Box>
                      </Link>
                    </Stack>
                    <Link href="/missions/id/gereRapport">
                      <Box>
                        <Button variant="text" color="info">
                          Gérer Rapport
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
                    <Stack direction="row">
                      <Typography sx={{ mb: 2 }} variant="h6" color="GrayText">
                        REF REF_MISSION_001
                      </Typography>
                      <Grid sx={{ ml: 3, mt: -0.5 }}>
                        <Button startIcon={<Edit />} sx={{ mb: 2 }} />
                        <Button
                          startIcon={<CancelIcon />}
                          color="warning"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                    </Stack>
                    <Typography color="GrayText" mb={2}>
                      Description de la mission de la mission description de la
                      mssion
                    </Typography>
                    <Grid container spacing={1} my={1}>
                      <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                          <Typography variant="body1" color="secondary">
                            Responsable :
                          </Typography>
                          <Typography variant="body1" color="gray">
                            Andry Blame
                          </Typography>
                        </InfoItems>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} my={1}>
                      <Grid item xs={12} md={12}>
                        <InfoItems direction="row" spacing={2}>
                          <Typography variant="body1" color="secondary">
                            Gestionnaire :
                          </Typography>
                          <Typography variant="body1" color="gray">
                            Andry Blame
                          </Typography>
                        </InfoItems>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Stack direction="row" spacing={2}>
                      <Link href="/missions/id/gereEtat">
                        <Box>
                          <Button variant="text" color="info">
                            Gérer Etat de prévision
                          </Button>
                        </Box>
                      </Link>
                      <Link href="/missions/id/bilan">
                        <Box>
                          <Button variant="text" color="info">
                            Voir le Bilan
                          </Button>
                        </Box>
                      </Link>
                    </Stack>
                    <Link href="/missions/id/gereRapport">
                      <Box>
                        <Button variant="text" color="info">
                          Gérer Rapport
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
    </Container>
  );
};

export default ListMissions;

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
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));
export const InfoItems = styled(Stack)(({ theme }) => ({}));
