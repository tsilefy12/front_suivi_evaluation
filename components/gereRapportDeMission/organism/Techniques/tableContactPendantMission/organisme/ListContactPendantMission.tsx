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
import AddContactPendantMission from "../add/addContactPendantMission";
import useFetchContactMissionRapport from "../hooks/useFetchContactMissionRapport";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import {
  deleteMissionRapport,
  editMissionRapport,
} from "../../../../../../redux/features/missionRapport";
import { MissionRapportItem } from "../../../../../../redux/features/missionRapport/missionRapport.interface";

const ListContactPendantMission = () => {
  const [open, setOpen] = React.useState(false);
  const fetchContactMissionRapport = useFetchContactMissionRapport();
  const { missionRapportList } = useAppSelector(
    (state: any) => state.missionRapport
  );
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const { id }: any = router.query;
  const confirm = useConfirm();

  React.useEffect(() => {
    fetchContactMissionRapport();
  }, [router.query]);
  //  console.log("lis :", [missionRapportlist])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer contact pendant la mission",
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
        console.log(" id :", id);
        await dispatch(deleteMissionRapport({ id }));
        fetchContactMissionRapport();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editMissionRapport({ id }));
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
                  <TableCell>Nom et prénoms</TableCell>
                  <TableCell align="left">Lieu / Institution</TableCell>
                  <TableCell align="left">Numero</TableCell>
                  <TableCell align="left">Remarques</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {missionRapportList
                  .filter((f: any) => f.missionId === id)
                  .map((row: MissionRapportItem, index: any) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.nomPrenom}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.lieuInstitution}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.numero}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.remarque}
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
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="text" color="info" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddContactPendantMission handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListContactPendantMission;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  // bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
