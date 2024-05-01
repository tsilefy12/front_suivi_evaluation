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
  IconButton,
  Paper,
  styled,
  TableHead,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProgrammes from "../add/addProgramme";
import useFetchProgrammePrevisionList from "../hooks/useFetchProgrammePrevision";
import { useAppSelector } from "../../../../../../hooks/reduxHooks";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import useFetchPlannedActivityList from "../../tableActivitésPrévues/hooks/useFetchPlannedActivityList";
import useFetchDeliverableList from "../../tableLivrables/hooks/useFetchDeliverableList";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import { deleteProgrammePrevision, editProgrammePrevision } from "../../../../../../redux/features/programmePrevision";

const ListProgrammes = () => {
  const [open, setOpen] = React.useState(false);
  const fetchProgrammePrevision = useFetchProgrammePrevisionList();
  const { programmePrevisionList } = useAppSelector((state: any) => state.programmePrevision)
  const dispatch: any = useDispatch()
  const router = useRouter()
  const confirm = useConfirm();
  const fetchActivitePrevue = useFetchPlannedActivityList();
  const { plannedActivityList } = useAppSelector((state: any) => state.plannedActivity);
  const fetchLivrable = useFetchDeliverableList();
  const { deliverableList } = useAppSelector((state: any) => state.deliverable);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  React.useEffect(() => {
    fetchProgrammePrevision();
    fetchActivitePrevue();
    fetchLivrable();
    fetchEmployes();
  }, [router.query])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer l'activté de rapport",
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
        await dispatch(deleteProgrammePrevision({ id }));
        fetchProgrammePrevision();
      })
      .catch(() => { });
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editProgrammePrevision({ id }));
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
                    <TableCell align="left">Date de fin</TableCell>
                    <TableCell align="left">Activités prévues</TableCell>
                    <TableCell align="left">Livrables</TableCell>
                    <TableCell align="left">Responsable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {programmePrevisionList.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Moment format="DD/MM/yyyy">{row.dateDebut}</Moment>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Moment format="DD/MM/yyyy">{row.dateFin}</Moment>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {plannedActivityList.find((e: any) => e.id === row.activitePrevue)?.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {deliverableList.find((e: any) => e.id === row.livrable)?.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {
                          (row.responsable).map((lp: any) => {
                            return (
                              <Stack direction="column" spacing={2} height={25} overflow="auto">
                                {employees.find((e: any) => e.id === lp)?.name}
                                {" "}
                                {employees.find((e: any) => e.id === lp)?.surname}
                              </Stack>
                            )
                          })
                        }
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
                            onClick={() => handleClickEdit(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="warning"
                            aria-label="Supprimer"
                            component="span"
                            onClick={() => handleClickDelete(row.id)}
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
            <AddProgrammes handleClose={handleClose} />
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
