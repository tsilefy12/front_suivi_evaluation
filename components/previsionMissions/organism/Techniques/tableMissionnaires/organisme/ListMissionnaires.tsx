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
import { deleteMissionary, editMissionary } from "../../../../../../redux/features/missionary";
import { MissionaryItem } from "../../../../../../redux/features/missionary/missionarySlice.interface";

const ListMissionnaires = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { missionaryList } = useAppSelector((state) => state.missionary);
  const fetchMissionaryList = useFetchMissionaryList();

  React.useEffect(() => {
    fetchMissionaryList();
  }, [router.query]);

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
  };

  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MyTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableBody>
                {missionaryList.map((row: MissionaryItem) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.lastNameMissionary}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.firstNameMissionary}
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
