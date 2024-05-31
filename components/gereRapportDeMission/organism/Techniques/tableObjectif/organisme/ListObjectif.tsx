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
import AddObjectif from "../add/addObjectif";
import useFetchObjectifRapport from "../hooks/useFetchObjectifRapport";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import {
  deleteObjectifRapport,
  editObjectifRapport,
} from "../../../../../../redux/features/objectifRapport";
import { ObjectifRapportItem } from "../../../../../../redux/features/objectifRapport/objectifRapport.interface";
import { useConfirm } from "material-ui-confirm";
import useFetchMissionGoalListe from "../../../../../previsionMissions/organism/Techniques/tableObjectif/hooks/useFetchObjectifList";

const ListObjectif = () => {
  const [open, setOpen] = React.useState(false);
  const fetchObjectifRapport = useFetchObjectifRapport();
  const { objectifRapportlist } = useAppSelector(
    (state: any) => state.objectifRapport
  );
  const router = useRouter();
  const { id } = router.query;
  const dispatch: any = useAppDispatch();
  const confirm = useConfirm();
  const { missionGoalList } = useAppSelector((state: any) => state.missionGoal);
  const fetchMissionGoalList = useFetchMissionGoalListe();

  React.useEffect(() => {
    fetchObjectifRapport();
    fetchMissionGoalList();
  }, [router.query]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer l'objectif de rapport",
      description: "Voulez-vous vraiment supprimer cet objectif ?",
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
        await dispatch(deleteObjectifRapport({ id }));
        fetchObjectifRapport();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editObjectifRapport({ id }));
    handleClickOpen();
  };
  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MyTableContainer>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableBody>
                {objectifRapportlist
                  .filter((m: any) => m.missionId === id)
                  .map((row: ObjectifRapportItem, index: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {missionGoalList.find(
                          (mg: any) => mg.id === row.objectif
                        )?.description || row.objectif}
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
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="text" color="info" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose} disablePortal={true}>
          <AddObjectif handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListObjectif;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
