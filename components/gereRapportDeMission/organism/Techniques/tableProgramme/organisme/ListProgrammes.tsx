import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { rows } from "./constante";
import {
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  IconButton,
  Paper,
  styled,
  TableHead,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchProgrammeRapport from "../hooks/useFetchProgrammeRapport";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import useFetchLivrableRapport from "../../tableLivrables/hooks/useFetchLivrableRapport";
import useFetchActiviteRapport from "../../tableActivitésPrévues/hooks/useFetchActivityRapport";
import { ProgrammeRapportItem } from "../../../../../../redux/features/programmeRapport/programmeRapport.interface";
import Moment from "react-moment";
import { useConfirm } from "material-ui-confirm";
import {
  deleteProgrammeRapport,
  editProgrammeRapport,
} from "../../../../../../redux/features/programmeRapport";
import AddProgrammesRapport from "../add/addProgramme";
import { editAcitiviteRapport } from "../../../../../../redux/features/activitesRapport";
import useFetchPlannedActivityList from "../../../../../previsionMissions/organism/Techniques/tableActivitésPrévues/hooks/useFetchPlannedActivityList";

const ListProgrammes = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { isEditing, programmeRapport, programmeRapportList } = useAppSelector(
    (state) => state.programmeRapport
  );
  const fetchProgrammeRapport = useFetchProgrammeRapport();
  const { id }: any = router.query;
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const fetchLivrable = useFetchLivrableRapport();
  const { livrableRapportlist } = useAppSelector(
    (state) => state.livrableRapport
  );
  const fetchPlannedActivityListe = useFetchPlannedActivityList();
  const { plannedActivityList } = useAppSelector(
    (state) => state.plannedActivity
  );
  const fetchActivityRapport = useFetchActiviteRapport();
  const { activiteRapportlist } = useAppSelector(
    (state) => state.activiteRapport
  );
  const confirm = useConfirm();

  React.useEffect(() => {
    fetchProgrammeRapport();
    fetchEmployes();
    fetchPlannedActivityListe();
    fetchLivrable();
    fetchActivityRapport();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // console.log("list programme :", programmeRapportList)
  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le programme de rapport",
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
        await dispatch(deleteProgrammeRapport({ id }));
        fetchProgrammeRapport();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editProgrammeRapport({ id }));
    handleClickOpen();
  };
  return (
    <Container maxWidth="xl">
      <SectionTable>
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <MyTableContainer>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date de début</TableCell>
                    <TableCell align="left">Date fin</TableCell>
                    <TableCell align="left">Activités prévues</TableCell>
                    <TableCell align="left">Activités réalisées</TableCell>
                    <TableCell align="left">Livrables</TableCell>
                    <TableCell align="left">Responsable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {programmeRapportList
                    .filter((f: any) => f.missionId === id)
                    .map((row: any) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Moment format="DD/MM/yyyy">{row.dateDebut}</Moment>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Moment format="DD/MM/yyyy">{row.dateFin}</Moment>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {
                            plannedActivityList.find(
                              (e: any) => e.id === row.activitePrevueR
                            )?.description
                          }
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.activiteRealise}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {Array.isArray(livrableRapportlist) &&
                            livrableRapportlist.find(
                              (e) => e.id === row.livrableR
                            )?.livrablee}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <FormControl
                            sx={{
                              height:
                                row.responsableR.length <= 2 ? "auto" : 70,
                              overflow: "auto",
                            }}
                          >
                            {row.responsableR.map((lp: any) => {
                              return (
                                <Stack direction="column" spacing={2}>
                                  {
                                    employees.find((e: any) => e.id === lp)
                                      ?.name
                                  }{" "}
                                  {
                                    employees.find((e: any) => e.id === lp)
                                      ?.surname
                                  }
                                </Stack>
                              );
                            })}
                          </FormControl>
                        </TableCell>
                        <TableCell align="right">
                          <BtnActionContainer
                            direction="row"
                            justifyContent="right"
                          >
                            <IconButton
                              color="primary"
                              aria-label="Modifier"
                              component="span"
                              onClick={() => handleClickEdit(row.id!)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="warning"
                              aria-label="Supprimer"
                              component="span"
                              onClick={() => handleClickDelete(row.id!)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </BtnActionContainer>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </MyTableContainer>
          </Box>
        </Box>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          mb={2}
        >
          <Button variant="text" color="info" onClick={handleClickOpen}>
            Ajouter
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <AddProgrammesRapport handleClose={handleClose} />
          </Dialog>
        </SectionNavigation>
      </SectionTable>
    </Container>
  );
};

export default ListProgrammes;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  // bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
