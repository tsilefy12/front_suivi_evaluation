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
  styled,
  TableHead,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddMissionnaire from "../add/addMissionnaire";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useConfirm } from "material-ui-confirm";
import Moment from "react-moment";
import {
  deleteMissionaryRapport,
  editMissionaryRapport,
} from "../../../../../../redux/features/missionaires";
import { MissionairesItem } from "../../../../../../redux/features/missionaires/missionaires.interface";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";
import AddMissionnaireRapport from "../add/addMissionnaire";
import useFetchMissionaryRapportList from "../hooks/useFetchMissionaryList";

const ListMissionnairesRapport = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const { id } = router.query;
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const fetchMissionaryRapportList = useFetchMissionaryRapportList();
  const { missionaireslist } = useAppSelector(
    (state: any) => state.missionaires
  );
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);

  React.useEffect(() => {
    fetchMissionaryRapportList();
    fetchEmployes();
  }, [router.query]);
  //  console.log("missionaire :", missionaireslist)
  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le missionnaire",
      description: "Voulez-vous vraiment supprimer ce missionnaire ?",
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
        await dispatch(deleteMissionaryRapport({ id }));
        fetchMissionaryRapportList();
      })
      .catch(() => {});
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editMissionaryRapport({ id }));
    handleClickOpen();
  };

  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MyTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Date de début</TableCell>
                  <TableCell>Date de retour</TableCell>
                  <TableCell>Responsable de mission</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {missionaireslist
                  .filter((f: any) => f.missionId === id)
                  .map((row: any) => (
                    <TableRow
                      key={row.id!}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.lastNameMissionary} {row.firstNameMissionary}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {
                          <Moment format="DD/MM/YYYY">
                            {row.startDateMissionary}
                          </Moment>
                        }
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {
                          <Moment format="DD/MM/YYYY">
                            {row.returnDateMissionary}
                          </Moment>
                        }
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <FormControl
                          sx={{
                            height:
                              Array.isArray(
                                row.missionResponsabilityMissionary
                              ) &&
                              row.missionResponsabilityMissionary.length <= 2
                                ? "auto"
                                : 70,
                            overflow: "auto",
                          }}
                        >
                          {Array.isArray(row.missionResponsabilityMissionary) &&
                            row.missionResponsabilityMissionary.map(
                              (lp: any) => {
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
                              }
                            )}
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
                            onClick={() => handleClickEdit(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="warning"
                            aria-label="Supprimer"
                            component="span"
                            onClick={() => {
                              handleClickDelete(row.id);
                            }}
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
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="text" color="info" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddMissionnaireRapport handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListMissionnairesRapport;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({
  paddingTop: "20px",
}));
