import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";

const AddContactPendantMission = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier contact pendant la mission</DialogTitle>
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
  // padding: 10,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
  // marginLeft: "100",
}));
