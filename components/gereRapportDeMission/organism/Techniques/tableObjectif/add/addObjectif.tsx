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
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const AddObjectif = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier objectif</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Objectif"
              variant="outlined"
            />
            <Stack flexDirection="row">
              <InfoIcon />
              <Typography variant="subtitle2">
                Voici la liste des <Lien>objectifs pendant la prévision</Lien>,
                vous pouvez les réutiliser pour les rapports
              </Typography>
            </Stack>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              {[1, 2].map((item) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Objectif numéro 1
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

export default AddObjectif;

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
