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
import AddAutreInfoAutoRapport from "../add/addAutreInfoAuto";
import useFetchAutreInfoRapport from "../hooks/useFetchAutreInfoRaport";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useConfirm } from "material-ui-confirm";
import { AutreInfoRapportItem } from "../../../../../../redux/features/autreInfoRapport/autreInfoRapport.interface";
import {
  deleteAutreInfoRapport,
  editAutreInfoRapport,
} from "../../../../../../redux/features/autreInfoRapport";

const ListAutreInfoAuto = () => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch: any = useAppDispatch();
  const confirm = useConfirm();
  const fetchAutreInfoRapport = useFetchAutreInfoRapport();
  const { autreInfoRapportList } = useAppSelector(
    (state: any) => state.autreInfoRapport
  );

  React.useEffect(() => {
    fetchAutreInfoRapport();
  }, [router.query]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer voiture",
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
        await dispatch(deleteAutreInfoRapport({ id }));
        fetchAutreInfoRapport();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editAutreInfoRapport({ id }));
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
                  <TableCell>Assurance</TableCell>
                  <TableCell align="left">Visite technique</TableCell>
                  <TableCell align="left">
                    Voiture de location ou privé?
                  </TableCell>
                  <TableCell align="left">Ceinture de securite</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {autreInfoRapportList
                  .filter((f: any) => f.missionId === id)
                  .map((row: AutreInfoRapportItem, index: any) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.assurance}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.visiteTechnic}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.voiture}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.centureSecurite ? "OUI" : "NON"}
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
        <Dialog open={open} onClose={handleClose}>
          <AddAutreInfoAutoRapport handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListAutreInfoAuto;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  // bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
// const Modal = styled(Stack)(({ theme }) => ({
//   borderRadius: 20,
//   width: "600px",
// }));
