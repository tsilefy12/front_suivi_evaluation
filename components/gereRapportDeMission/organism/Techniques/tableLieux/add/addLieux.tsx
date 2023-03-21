import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
  Table,
  TableCell,
  Typography,
  TableRow,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";

const AddLieux = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier lieux</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Fokontany"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Commune"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Disctrict"
              variant="outlined"
            />
            <Stack flexDirection="row">
              <InfoIcon />
              <Typography variant="subtitle2">
                Voici la liste des <Lien>Lieux pendant la prévision</Lien>, vous
                pouvez les réutiliser pour les rapports
              </Typography>
            </Stack>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              {[1, 2].map((item) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Résultat numéro 1
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

export default AddLieux;

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
