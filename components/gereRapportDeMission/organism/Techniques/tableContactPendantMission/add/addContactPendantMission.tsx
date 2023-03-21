import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";

const AddContactPendantMission = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle variant="h5">
          Créer/modifier contact pendant la mission
        </DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nom et prénoms"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Lieu et institution"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Numéro "
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Remarques"
              variant="outlined"
            />
            <Stack flexDirection="row">
              <InfoIcon />
              <Typography variant="subtitle2">
                Voici la liste des <Lien>Contact pendant la prévision</Lien>,
                vous pouvez les réutiliser pour les rapports
              </Typography>
            </Stack>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nom et prénoms</TableCell>
                  <TableCell>Lieu / Institution</TableCell>
                  <TableCell align="left">Numero</TableCell>
                  <TableCell align="left">Remarques</TableCell>
                </TableRow>
              </TableHead>
              {[1, 2].map((item) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Andraisoro
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Antananarivo
                  </TableCell>
                  <TableCell component="th" scope="row">
                    0342899982
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Remarque 1
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

export default AddContactPendantMission;

const FormContainer = styled(Stack)(({ theme }) => ({
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
