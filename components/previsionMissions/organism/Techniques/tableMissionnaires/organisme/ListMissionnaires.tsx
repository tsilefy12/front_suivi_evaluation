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
import { MissionGoalItem } from "../../../../../../redux/features/missionGoal/missionGoalSlice.interface";
import { useConfirm } from "material-ui-confirm";
import {
  deleteMissionGoal,
  editMissionGoal,
} from "../../../../../../redux/features/missionGoal";
import useFetchMissionaryList from "../hooks/useFetchMissionaryList";
import {
  deleteMissionary,
  editMissionary,
} from "../../../../../../redux/features/missionary";
import { MissionaryItem } from "../../../../../../redux/features/missionary/missionarySlice.interface";
import Moment from "react-moment";
import useFetchEmploys from "../../../../../GrantsEnCours/hooks/getResponsable";

const ListMissionnaires = () => {
  const [open, setOpen] = React.useState(false);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
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
  const { missionaryList } = useAppSelector((state) => state.missionary);
  const fetchMissionaryList = useFetchMissionaryList();

  React.useEffect(() => {
    fetchMissionaryList();
    fetchEmployes();
  }, []);

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
        await dispatch(deleteMissionary({ id }));
        fetchMissionaryList();
      })
      .catch(() => {});
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editMissionary({ id }));
    handleClickOpen();
    console.log("edit ");
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
                {missionaryList
                  .filter((f: any) => f.missionId === id)
                  .map((row: MissionaryItem, index: any) => (
                    <TableRow
                      key={index}
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
                      <TableCell component="th" scope="row" key={index}>
                        {
                          employees.find(
                            (e) => e.id === row.missionResponsabilityMissionary
                          )?.name
                        }{" "}
                        {
                          employees.find(
                            (e) => e.id == row.missionResponsabilityMissionary
                          )?.surname
                        }
                      </TableCell>
                      <TableCell align="right" key={index}>
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
                            onClick={() => {
                              handleClickDelete(row.id!);
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
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              display: "flex",
              justifyContent: "center",
              width: "100%",
            },
          }}
        >
          <AddMissionnaire handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListMissionnaires;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({
  paddingTop: "20px",
}));
