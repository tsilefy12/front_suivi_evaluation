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
  TableHead,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";

const AddAutreInfoAuto = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier Information importante</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Assurance"
              variant="outlined"
            />
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Visite technique"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Ceinture de sécurité"
              />
            </CustomStack>
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Voiture de location"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Voiture privé"
              />
            </CustomStack>

            <Stack flexDirection="row">
              <InfoIcon />
              <Typography variant="subtitle2">
                Voici la liste des <Lien>Lieux pendant la prévision</Lien>, vous
                pouvez les réutiliser pour les rapports
              </Typography>
            </Stack>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Assurance</TableCell>
                  <TableCell align="left">Visite technique</TableCell>
                  <TableCell align="left">
                    Voiture de location ou privé?
                  </TableCell>
                  <TableCell align="left">Ceinture de securite</TableCell>
                </TableRow>
              </TableHead>
              {[1, 2].map((item) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    HAVANA
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Oui
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Non
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Oui
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

export default AddAutreInfoAuto;

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
