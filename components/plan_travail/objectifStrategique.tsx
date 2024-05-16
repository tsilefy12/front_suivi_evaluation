import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Dialog,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { Fragment } from "react";
import Add from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import ObjectifStrategiqueForm from "./add/addPlanTravail";
import useFetchPlanTravaile from "./hooks/useFetchPlanTravail";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePlanTravail, editPlanTravail } from "../../redux/features/planTravail";
import { PlanTravailItem } from "../../redux/features/planTravail/planTravail.interface";
import { idID } from "@mui/material/locale";

const ListObjectifStrategique = ({ row, handleClickEdit, handleClickDelete }: any) => {
  const [open, setOpen] = React.useState(false);
  const fetchPlanTravail = useFetchPlanTravaile();
  const { planTravaillist, isEditing } = useAppSelector(state => state.planTravail)
  const confirm = useConfirm()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [getId, setGetId] = React.useState("");

  React.useEffect(() => {
    fetchPlanTravail();
  }, [router.query])
  //  console.log("liste :", planTravaillist)
  const handleClickOpen = () => {
    setOpen(true);
    setGetId("")
  };

  const handleClose = () => {
    setOpen(false);
  };

  handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le plan de travail",
      description: "Voulez-vous vraiment supprimer ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deletePlanTravail({ id }));
        fetchPlanTravail();
      })
      .catch(() => { });
  };
  const [getSelectId, setGetSelectedId]: any = React.useState(null)
  handleClickEdit = async (id: any) => {
    dispatch(editPlanTravail({ id }))
    handleClickOpen()
    setAnchorEl(id)
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event: any, id: string) => {
    setAnchorEl(event);
    setGetSelectedId(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setGetSelectedId(null);
  };

  // console.log("id selected :", getSelectId)
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
          plan de travail
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
            Liste de plan de travail
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <Link href={`/plan_travail/resume`}>
              <Button color="primary" variant="text" startIcon={<Add />}>
                Résumé des sites
              </Button>
            </Link>
            <TextField
              variant="outlined"
              id="search"
              name="search"
              placeholder="Recherche"
              size="small"
            />
          </Stack>
        </Stack>
        <ValueDetail>
          <FormLabel>Année : {new Date().getFullYear()}</FormLabel>
        </ValueDetail>
        <Grid container spacing={2} mt={2}>
          {planTravaillist.slice().map((row: PlanTravailItem, index: any) => (
            <Grid key={row.id!} item xs={12} md={6} lg={4}>
              <LinkContainer>
                <Stack direction={"row"} spacing={4}>
                  <Typography color="GrayText" mb={1} variant="h6">
                    {row.title} : {row.description}
                  </Typography>
                  <Typography>
                    <IconButton onClick={(event: any) =>handleMenuClick(event.currentTarget, row.id!)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClickEdit(getSelectId);
                          handleMenuClose();
                        }}
                      >
                        <EditIcon color="primary" />
                        Modifier
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClickDelete(getSelectId);
                          handleMenuClose();
                        }}
                      >
                        <DeleteIcon color="warning" />
                        Supprimer
                      </MenuItem>
                    </Menu>
                  </Typography>
                </Stack>
                <Link href={`/plan_travail/${row.id}/tachesEtObjectifs`}>
                  <Box>
                    <Button
                      variant="text"
                      color="info"
                      startIcon={<SettingsIcon />}
                    >
                      Tâches et objectifs
                    </Button>
                  </Box>
                </Link>
                <Link href={`/plan_travail/${row.id}/site`}>
                  <Button variant="outlined" color="accent" startIcon={<Add />}>
                    Site
                  </Button>
                </Link>
              </LinkContainer>
            </Grid>
          ))}
        </Grid>
      </SectionDetails>
      <Dialog open={open} onClose={handleClose}>
        <ObjectifStrategiqueForm handleClose={handleClose} getId={getId} />
      </Dialog>
    </Container>
  );
};

export default ListObjectifStrategique;

export const SectionNavigation = styled(Stack)(({ }) => ({}));
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
