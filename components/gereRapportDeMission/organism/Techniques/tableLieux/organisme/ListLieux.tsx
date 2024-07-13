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
import AddLieux from "../add/addLieux";
import useFetchLieuxRapport from "../hooks/useFetchLieuxRapport";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { LieuxRapportItem } from "../../../../../../redux/features/lieuxRapport/lieuxRapport.interface";
import {
  deleteLieuxRapport,
  editLieuxRapport,
} from "../../../../../../redux/features/lieuxRapport";
import { useConfirm } from "material-ui-confirm";
import useFetchMissionLocationListe from "../../../../../previsionMissions/organism/Techniques/tableLieux/hooks/useFetchMissionLocationList";

const ListLieux = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  const fetchLieuxRapport = useFetchLieuxRapport();
  const { lieuxRapportlist } = useAppSelector(
    (state: any) => state.lieuxRapport
  );

  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { missionLocationList } = useAppSelector(
    (state: any) => state.missionLocation
  );
  const fetchMissionLocationListe = useFetchMissionLocationListe();

  React.useEffect(() => {
    fetchLieuxRapport();
    fetchMissionLocationListe();
  }, [router.query]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer un lieu",
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
        await dispatch(deleteLieuxRapport({ id }));
        fetchLieuxRapport();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editLieuxRapport({ id }));
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
                  <TableCell>Lieux</TableCell>
                  <TableCell align="left">Commune</TableCell>
                  <TableCell align="left">District</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lieuxRapportlist
                  .filter((f: any) => f.missionId === id)
                  .map((row: LieuxRapportItem, index: any) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {missionLocationList.find(
                          (ml: any) => ml.id === row.fokontany
                        )?.village || row.fokontany}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ minWidth: 100, maxWidth: 100 }}
                      >
                        {missionLocationList.find(
                          (ml: any) => ml.id === row.commune
                        )?.commune || row.commune}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {missionLocationList.find(
                          (ml: any) => ml.id === row.district
                        )?.district || row.district}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ minWidth: 20, maxWidth: 20 }}
                      >
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
        <Dialog open={open} onClose={handleClose}>
          <AddLieux handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListLieux;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  // bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
