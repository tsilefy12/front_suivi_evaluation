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
  TableHead,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddContactPendantMission from "../add/addContactPendantMission";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchContactListe from "../hooks/useFetchContactList";
import {
  deleteContact,
  editContact,
} from "../../../../../../redux/features/contact";
import { ContactItem } from "../../../../../../redux/features/contact/contactSlice.interface";

const ListContactPendantMission = () => {
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
  const { contactList } = useAppSelector((state) => state.contact);
  const fetchContactList = useFetchContactListe();

  React.useEffect(() => {
    fetchContactList();
  }, [router.query]);

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer l'objectif de Contact",
      description: "Voulez-vous vraiment supprimer cet Contact ?",
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
        await dispatch(deleteContact({ id }));
        fetchContactList();
      })
      .catch(() => {});
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editContact({ id }));
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
                {contactList.map((row: ContactItem) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.lastNameContact} {row.firstNameContact}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.locationContact}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.numberContact}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.noteContact}
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
export const SectionNavigation = styled(Stack)(({ theme }) => ({
  paddingTop: "20px",
}));
