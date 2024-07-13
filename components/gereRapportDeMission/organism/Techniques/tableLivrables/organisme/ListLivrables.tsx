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
import AddLivrable from "../add/addLivrable";
import useFetchLivrableRapport from "../hooks/useFetchLivrableRapport";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import {
  deleteLivrableRapport,
  editLivrableRapport,
} from "../../../../../../redux/features/LivrableRapport";
import { LivrableRapportItem } from "../../../../../../redux/features/LivrableRapport/livrableRapport.interface";

const ListLivrables = () => {
  const [open, setOpen] = React.useState(false);
  const fetchLivrableRapport = useFetchLivrableRapport();
  const { livrableRapportlist } = useAppSelector(
    (state: any) => state.livrableRapport
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id }: any = router.query;
  const confirm = useConfirm();

  React.useEffect(() => {
    fetchLivrableRapport();
  }, [id]);
  const listVide: { id: string }[] = [];
  // console.log("list :", 404 ? listVide : livrableRapportlist)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer livrable de rapport",
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
        await dispatch(deleteLivrableRapport({ id }));
        fetchLivrableRapport();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editLivrableRapport({ id }));
    handleClickOpen();
  };
  return (
    <Container>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MyTableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableBody>
                {livrableRapportlist
                  .filter((f: any) => f.missionId === id)
                  .map((row: LivrableRapportItem, index: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.livrablee}
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
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { width: "100%" } }}
        >
          <AddLivrable handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
    </Container>
  );
};

export default ListLivrables;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
