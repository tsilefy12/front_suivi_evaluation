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

const AddResumeDepense = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle>Créer/modifier résumé de dépense</DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Grant </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grants"
              >
                <MenuItem value={10}> Grant 1</MenuItem>
                <MenuItem value={20}> Grant 2</MenuItem>
                <MenuItem value={30}> Grant 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Ligne Budgétaire
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grants"
              >
                <MenuItem value={10}> Ligne Budgétaire 1</MenuItem>
                <MenuItem value={20}> Ligne Budgétaire 2</MenuItem>
                <MenuItem value={30}> Ligne Budgétaire 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Dépense prévue"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Budget de dépense"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Rémarque"
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

export default AddResumeDepense;

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
