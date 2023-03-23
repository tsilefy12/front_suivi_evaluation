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
import AddAutreInfoAuto from "../add/addAutreInfoAuto";

const ListAutreInfoAuto = () => {
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
              <TableCell>Assurance</TableCell>
              <TableCell align="left">Visite technique</TableCell>
              <TableCell align="left">Voiture de location ou privé?</TableCell>
              <TableCell align="left">Ceinture de securite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.assurance}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.visite}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.voiture}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.ceinture}
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
