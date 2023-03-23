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

const AddCalculDesPile = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier Calcul des Piles</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Appareil"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Type"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Nombre Appareil"
                variant="outlined"
              />
            </CustomStack>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nombre de piles"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Change"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nombre de packs"
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

export default AddCalculDesPile;

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
