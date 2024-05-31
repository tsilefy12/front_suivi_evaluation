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
import AddActivitesPrevues from "../add/addActivitesPrevues";
import { useRouter } from "next/router";
import useFetchActiviteRapport from "../hooks/useFetchActivityRapport";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useConfirm } from "material-ui-confirm";
import { ActiviteRapportItem } from "../../../../../../redux/features/activitesRapport/activiteRapport.interface";
import {
  deleteActiviteRapport,
  editAcitiviteRapport,
} from "../../../../../../redux/features/activitesRapport";
import useFetchPlannedActivityList from "../../../../../previsionMissions/organism/Techniques/tableActivitésPrévues/hooks/useFetchPlannedActivityList";

const ListActivitesPrevues = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  const fetchActivityRapport = useFetchActiviteRapport();
  const { activiteRapportlist } = useAppSelector(
    (state: any) => state.activiteRapport
  );
  const dispatch: any = useAppDispatch();
  const confirm = useConfirm();
  const { plannedActivityList } = useAppSelector(
    (state: any) => state.plannedActivity
  );
  const fetchPlannedActivityListe = useFetchPlannedActivityList();

  React.useEffect(() => {
    fetchActivityRapport();
    fetchPlannedActivityListe();
  }, [router.query]);
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
        await dispatch(deleteActiviteRapport({ id }));
        fetchActivityRapport();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editAcitiviteRapport({ id }));
    handleClickOpen();
  };
  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MyTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableBody>
                {activiteRapportlist
                  .filter((f: any) => f.missionId === id)
                  .map((row: ActiviteRapportItem, index: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {plannedActivityList.find(
                          (mg: any) => mg.id === row.activite
                        )?.description || row.activite}
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
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="text" color="info" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose} disablePortal={true}>
          <AddActivitesPrevues handleClose={handleClose} disablePortal={true} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListActivitesPrevues;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
