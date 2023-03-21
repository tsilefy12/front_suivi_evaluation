import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { rows } from "./constante";
import { Button, Container, Dialog, IconButton, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddObjectif from "../add/addLivrable";
import AddLivrable from "../add/addLivrable";

const ListLivrables = () => {
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
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.livrable}
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
          {/* <AddObjectif /> */}
          <AddLivrable />
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
