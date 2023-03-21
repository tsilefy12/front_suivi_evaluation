import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { rows } from "./constante";
import {
  Button,
  Container,
  Dialog,
  IconButton,
  styled,
  TableHead,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAutreInfoAuto from "../add/addContactPendantMission";

const ListContactPendantMission = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
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
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.lieu}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.numero}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.remarques}
                </TableCell>
                <TableCell align="right">
                  <BtnActionContainer direction="row" justifyContent="right">
                    <IconButton
                      color="primary"
                      aria-label="Modifier"
                      component="span"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="warning"
                      aria-label="Supprimer"
                      component="span"
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
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="text" color="info" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddAutreInfoAuto />
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
