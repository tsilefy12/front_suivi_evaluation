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
} from "@mui/material";

const AddProgrammes = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier contact pendant la mission</DialogTitle>
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
