import React, { useEffect } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Box,
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

const AddPrevisionMission = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle> Créer/modifier prévision de dépense </DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Date"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Libellé"
              variant="outlined"
            />
            <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="PU"
                variant="outlined"
              />
            </CustomStack>
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
                {" "}
                Ligne Budgétaire{" "}
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
              label="Reglème"
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

export default AddPrevisionMission;

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
