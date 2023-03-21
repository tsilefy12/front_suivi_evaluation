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
  Paper,
  styled,
  TableHead,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProgrammes from "../add/addProgramme";

const ListProgrammes = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <MyTableContainer>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date de début</TableCell>
                    <TableCell align="left">Date de fin</TableCell>
                    <TableCell align="left">Activités prévues</TableCell>
                    <TableCell align="left">Livrables</TableCell>
                    <TableCell align="left">Responsable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.dateDebut}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.dateFin}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.activites}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.livrable}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.responsable}
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
            <SectionNavigation
              direction="row"
              justifyContent="space-between"
              mb={2}
            >
              <Button variant="text" color="info" onClick={handleClickOpen}>
                Ajouter
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <AddProgrammes />
              </Dialog>
            </SectionNavigation>
          </Paper>
        </Box>
      </SectionTable>
    </Container>
  );
};

export default ListProgrammes;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  background: "#fff",
  // bottom: 2,
}));
export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
