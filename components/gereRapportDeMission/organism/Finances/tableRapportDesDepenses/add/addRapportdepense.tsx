import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { Footer } from "../ListRapportDepense";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../../config/table.config";

const AddRapportdepense = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - [1, 2, 3, 4, 5].length)
      : 0;

  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#fff", pb: 5, Height: "500px", width: "580px" }}
    >
      <SectionNavigation>
        <DialogTitle>Créer/modifier besoin en véhicule</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Date"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Libellés"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Montant"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Grant </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grants"
              >
                <MenuItem value={10}> Grant 1</MenuItem>
                <MenuItem value={20}> Grant 2</MenuItem>
                <MenuItem value={30}> Grant 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Ligne Budgétaire
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grants"
              >
                <MenuItem value={10}> Ligne Budgétaire 1</MenuItem>
                <MenuItem value={20}> Ligne Budgétaire 2</MenuItem>
                <MenuItem value={30}> Ligne Budgétaire 3</MenuItem>
              </Select>
            </FormControl>
            <Stack flexDirection="row">
              <InfoIcon />
              <Typography variant="subtitle2">
                Voici la liste des
                <Lien>prevision de depense pendant la prévision</Lien>, vous
                pouvez les réutiliser pour les rapports
              </Typography>
            </Stack>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">PJ#</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="left">Libellés</TableCell>
                  <TableCell align="left">Montant</TableCell>
                </TableRow>
              </TableHead>
              {[1, 2, 3, 4, 5].map((item) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    10
                  </TableCell>
                  <TableCell component="th" scope="row">
                    08/10/2021
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Provision
                  </TableCell>
                  <TableCell component="th" scope="row">
                    100000
                  </TableCell>
                  <TableCell align="right">
                    <Button color="primary" startIcon={<ContentCopyIcon />}>
                      Utiliser
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </Table>
            <Footer>
              <Typography variant="body2" align="right">
                TOTAL BUDGET : 30000
              </Typography>
              <Typography variant="body2" align="right">
                Imprévu de mission(total budget-location et perdiem MV(10% )) :
                10000
              </Typography>
              <Typography variant="body2" align="right">
                TOTAL GENERAL BUDGET : 40000
              </Typography>
            </Footer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={[1, 2, 3, 4, 5].length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
              labelDisplayedRows={defaultLabelDisplayedRows}
            />
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button color="warning">Annuler</Button>
          <Button variant="contained" type="submit">
            Enregistrer
          </Button>
        </DialogActions>
      </SectionNavigation>
    </Container>
  );
};

export default AddRapportdepense;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 10,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
const Lien = styled("span")(({ theme }) => ({
  color: theme.palette.info.main,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));
