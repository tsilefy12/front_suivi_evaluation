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
import useFetchPlanTravaile from "./hooks/useFetchPlanTravail";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import { PlanTravailItem } from "../../redux/features/planTravail/planTravail.interface";

const ListObjectifStrategique = () => {
  const [open, setOpen] = React.useState(false);
  const fetchPlanTravail = useFetchPlanTravaile();
  const { planTravaillist } = useAppSelector((state) =>state.planTravail)
  const confirm = useConfirm()
  const router = useRouter()

  React.useEffect(() =>{
    fetchPlanTravail();
  }, [router.query])
//  console.log("liste :", planTravaillist)
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
         direction={{ xs: 'column', sm: 'row' }}
         spacing={{ xs: 1, sm: 2, md: 4 }}
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
          {planTravaillist.map((row: any) => (
            <Grid key={row.id} item xs={12} md={6} lg={4}>
              <LinkContainer>
                <Typography color="GrayText" mb={2} variant="h6">
                {row.title} : {row.description}
                </Typography>
                <Link href={`/plan_travail/${row.id}/tachesCles`}>
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
                <Link href={`/plan_travail/${row.id}/objectifGenerale`}>
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
        <ObjectifStrategiqueForm handleClose={handleClose}/>
      </Dialog>
    </Container>
  );
};

export default ListObjectifStrategique;

export const SectionNavigation = styled(Stack)(({}) => ({}));
const SectionDetails = styled(Box)(({ theme }) => ({
  padding: "16px 32px",
  marginBlock: 15,
  background: theme.palette.common.white,
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
}));

const ValueDetail = styled(Stack)(({ theme }) => ({
  height: "30px",
  padding: 10,
}));
const LinkContainer = styled("div")(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
  padding: "20px",
}));
