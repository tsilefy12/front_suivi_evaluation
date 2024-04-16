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
  TextField,
} from "@mui/material";

const AddCalculCarburant = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier calcul des carburants</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="trajet"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Distance"
                variant="outlined"
              />
            </CustomStack>
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {" "}
                  Type de carburant{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Grants"
                >
                  <MenuItem value={10}> Type de carburant 1</MenuItem>
                  <MenuItem value={20}> Type de carburant 2</MenuItem>
                  <MenuItem value={30}> Type de carburant 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {" "}
                  Véhicule{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Grants"
                >
                  <MenuItem value={10}> Véhicule 1</MenuItem>
                  <MenuItem value={20}> Véhicule 2</MenuItem>
                  <MenuItem value={30}> Véhicule 3</MenuItem>
                </Select>
              </FormControl>
            </CustomStack>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nombre de trajet"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Distance total"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Consommation/km"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Total carburant"
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

export default AddCalculCarburant;

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
