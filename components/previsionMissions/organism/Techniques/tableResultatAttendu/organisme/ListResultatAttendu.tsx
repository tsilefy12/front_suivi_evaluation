import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
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
import AddResultatAttendu from "../add/addResultatAttendu";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import {
  deleteExceptedResult,
  editExceptedResult,
} from "../../../../../../redux/features/exceptedResult";
import useFetchExceptedResultList from "../hooks/useFetchExceptedResultList";
import { ExceptedResultItem } from "../../../../../../redux/features/exceptedResult/exceptedResultSlice.interface";

const ListResultatAttendu = () => {
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
  const { idfile }: any = router.query;
  const { exceptedResultList } = useAppSelector(
    (state) => state.exceptedResult
  );
  const fetchExceptedResultListe = useFetchExceptedResultList();

  React.useEffect(() => {
    fetchExceptedResultListe();
  }, [router.query]);

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer Resultat de mission",
      description: "Voulez-vous vraiment supprimer cet Resultat ?",
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
        await dispatch(deleteExceptedResult({ id }));
        fetchExceptedResultListe();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editExceptedResult({ id }));
    handleClickOpen();
  };

  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MyTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableBody>
                {exceptedResultList.map(
                  (row: ExceptedResultItem, index: any) => (
                    <TableRow
                      key={row.id!}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.description}
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
                            onClick={() => {
                              handleClickEdit(row.id);
                            }}
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
                  )
                )}
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
          <AddResultatAttendu handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListResultatAttendu;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({
  paddingTop: "20px",
}));
