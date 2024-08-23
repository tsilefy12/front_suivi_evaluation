import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Button,
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
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePermitted } from "../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deletePlanTravail,
  editPlanTravail,
} from "../../redux/features/planTravail";
import { PlanTravailItem } from "../../redux/features/planTravail/planTravail.interface";
import ObjectifStrategiqueForm from "./add/addPlanTravail";
import useFetchPlanTravaile from "./hooks/useFetchPlanTravail";
import Moment from "react-moment";
import useFetchProject from "../GrantsEnCours/hooks/getProject";
import { Close } from "@mui/icons-material";
import { createCloture } from "../../redux/features/cloturePTA";

const ListObjectifStrategique = ({
  row,
  handleClickEdit,
  handleClickDelete,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [filtre, setFiltre] = React.useState("");
  const fetchPlanTravail = useFetchPlanTravaile();
  const { planTravaillist, isEditing } = useAppSelector(
    (state) => state.planTravail
  );
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [getId, setGetId] = React.useState("");
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state: any) => state.project);
  const { cloture } = useAppSelector((state: any) => state.cloturePTA);

  React.useEffect(() => {
    fetchPlanTravail();
    fetchProject();
  }, [router.query]);
  const handleClickOpen = () => {
    setOpen(true);
    setGetId("");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickCloture = (id: string) => {
    confirm({
      title: "Clôturer le plan de travail",
      description: "Etes-vous sûr de vouloir clôturer ce plan de travail ?",
      cancellationText: "Annuler",
      confirmationText: "Ok",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(
          createCloture({
            planTravaileId: id,
            dateCloture: new Date(),
          })
        );
        fetchPlanTravail();
      })
      .catch(() => {});
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
      .catch(() => {});
  };
  const validate = usePermitted();
  const [getSelectId, setGetSelectedId]: any = React.useState(null);
  handleClickEdit = async (id: any) => {
    dispatch(editPlanTravail({ id }));
    handleClickOpen();
    setAnchorEl(id);
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
  const [data, setData] = React.useState<any[]>([]);
  useEffect(() => {
    if (filtre === "") {
      setData(
        [
          ...planTravaillist.filter(
            (p) =>
              new Date(p.endDate as Date).getFullYear() ===
              new Date().getFullYear()
          ),
        ].reverse()
      );
    } else {
      const donnee = planTravaillist.filter(
        (item) =>
          new Date(item.endDate as Date).getFullYear() ===
            new Date().getFullYear() &&
          ` ${item.title} ${item.description} ${
            projectList.find((p: any) => p.id == item.projectId)?.title
          }`
            .toLowerCase()
            .includes(filtre.toLowerCase())
      );
      setData([...donnee].reverse());
    }
  }, [planTravaillist, filtre]);
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        {validate("Suivi pta", "C") && (
          <Button
            onClick={handleClickOpen}
            color="primary"
            variant="contained"
            startIcon={<Add />}
          >
            Créer
          </Button>
        )}
        <Typography variant="h4" color="GrayText">
          Plan de travail
        </Typography>
      </SectionNavigation>
      <Divider />
      <SectionDetails sx={{ height: "calc(100vh - 240px)", overflow: "auto" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Liste des plans de travail
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
              value={filtre}
              onChange={(e) => setFiltre(e.target.value)}
            />
          </Stack>
        </Stack>
        <ValueDetail>
          <FormLabel>Année : {new Date().getFullYear()}</FormLabel>
        </ValueDetail>
        <Grid container spacing={2}>
          {data.map((row: PlanTravailItem, index: any) => (
            <Grid key={row.id!} item xs={12} md={6} lg={4}>
              <LinkContainer sx={{ backgroundColor: "grey.300" }}>
                <Stack direction={"row"} spacing={4}>
                  <Stack direction={"column"}>
                    <Typography
                      color="info.main"
                      mb={1}
                      variant="h6"
                      align="center"
                    >
                      {row.title}
                    </Typography>
                    <Typography
                      color="GrayText"
                      mb={1}
                      variant="h6"
                      title={row.description}
                      sx={{
                        cursor:
                          row.description!.length > 100 ? "pointer" : "default",
                        "&:hover": {
                          color:
                            row.description!.length > 100
                              ? "primary.main"
                              : "GrayText",
                        },
                      }}
                    >
                      {row.description && row.description.length > 100
                        ? row.description?.slice(0, 30) + "..."
                        : row.description}
                    </Typography>
                    <Typography mb={1} color="GrayText" variant="h6">
                      Projet :{" "}
                      {
                        projectList.find((p: any) => p.id === row.projectId)
                          ?.title
                      }
                    </Typography>
                    <Typography mb={1} color="GrayText" variant="h6">
                      Date de début :{" "}
                      <Moment format="DD/MM/YYYY">{row.startDate}</Moment>
                    </Typography>
                    <Typography mb={1} color="GrayText" variant="h6">
                      Date de fin :{" "}
                      <Moment format="DD/MM/YYYY">{row.endDate}</Moment>
                    </Typography>
                  </Stack>
                  <Typography>
                    <IconButton
                      onClick={(event: any) =>
                        handleMenuClick(event.currentTarget, row.id!)
                      }
                      disabled={row.clotures
                        ?.map((c: any) => c.planTravaileId)
                        .includes(row.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {validate("Suivi pta", "U") && (
                        <MenuItem
                          onClick={() => {
                            handleClickEdit(getSelectId);
                            handleMenuClose();
                          }}
                        >
                          <EditIcon color="primary" />
                          Modifier
                        </MenuItem>
                      )}
                      {validate("Suivi pta", "D") && (
                        <MenuItem
                          onClick={() => {
                            handleClickDelete(getSelectId);
                            handleMenuClose();
                          }}
                        >
                          <DeleteIcon color="warning" />
                          Supprimer
                        </MenuItem>
                      )}
                    </Menu>
                  </Typography>
                </Stack>
                <Link href={`/plan_travail/${row.id}/tachesEtObjectifs`}>
                  <Button
                    variant="text"
                    color="info"
                    startIcon={<SettingsIcon />}
                    disabled={row.clotures
                      ?.map((c: any) => c.planTravaileId)
                      .includes(row.id)}
                  >
                    Tâches et objectifs
                  </Button>
                </Link>
                <Stack direction={"row"} gap={2}>
                  <Link href={`/plan_travail/${row.id}/site`}>
                    <Button
                      variant="outlined"
                      color="info"
                      startIcon={<Add />}
                      disabled={row.clotures
                        ?.map((c: any) => c.planTravaileId)
                        .includes(row.id)}
                    >
                      Site
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<Close />}
                    onClick={() => handleClickCloture(row.id!)}
                    disabled={row.clotures
                      ?.map((c: any) => c.planTravaileId)
                      .includes(row.id)}
                  >
                    Clôturer
                  </Button>
                </Stack>
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
