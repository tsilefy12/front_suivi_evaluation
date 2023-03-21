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

const AddBesoinVehicule = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier besoin en véhicule</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Date de début"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Date de fin"
                variant="outlined"
              />
            </CustomStack>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Véhicule </InputLabel>
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
            <TextField
              fullWidth
              id="outlined-basic"
              label="Trajet"
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
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nombre de jour"
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

export default AddBesoinVehicule;

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
