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
  styled,
  Select,
  TextField,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";

const AddProgrammes = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier Programmes</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Date de début"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Date de fin "
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Activités prévues "
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Livrable"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Responsable</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grants"
              >
                <MenuItem value={10}> Responsable 1</MenuItem>
                <MenuItem value={20}> Responsable 2</MenuItem>
                <MenuItem value={30}> Responsable 3</MenuItem>
              </Select>
            </FormControl>
            <Stack flexDirection="row">
              <InfoIcon />
              <Typography variant="subtitle2">
                Voici la liste des{" "}
                <Lien>Contact(durant la mission) pendant la prévision</Lien>,
                vous pouvez les réutiliser pour les rapports
              </Typography>
            </Stack>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date de début</TableCell>
                  <TableCell>Date de fin</TableCell>
                  <TableCell align="left">Activités prévues</TableCell>
                  <TableCell align="left">Activités réalisées</TableCell>
                  <TableCell align="left">Livrables</TableCell>
                  <TableCell align="left">Responsable</TableCell>
                </TableRow>
              </TableHead>
              {[1, 2].map((item) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    08/10/2021
                  </TableCell>
                  <TableCell component="th" scope="row">
                    08/11/2022
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Recensement
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Recensement
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Livrable 1
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Gladis
                  </TableCell>
                  <TableCell align="right">
                    <Button color="primary" startIcon={<ContentCopyIcon />}>
                      Utiliser
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
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

export default AddProgrammes;

const FormContainer = styled(Stack)(({ theme }) => ({
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  // marginLeft: "100",
}));

const Lien = styled("span")(({ theme }) => ({
  color: theme.palette.info.main,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));
