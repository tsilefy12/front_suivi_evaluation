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

const ObjectifStrategiqueForm = ({ handleClose }: any) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle> Créer/Modifier Objectif Strategique </DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Année </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Grants"
              >
                <MenuItem value={10}> 2024 </MenuItem>
                <MenuItem value={20}> 2025 </MenuItem>
                <MenuItem value={30}> 2026 </MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              // type="hidden"
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

export default ObjectifStrategiqueForm;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 30,
  // borderRadius: 20,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  // flexDirection: "row",
  width: "560px",
}));
