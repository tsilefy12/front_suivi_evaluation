import React, { useEffect } from "react";
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
} from "@mui/material";

const ObjectifsGeneralForm = ({ handleClose }: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation>
        <DialogTitle> Créer/Modifier Objectif Générale </DialogTitle>
        <DialogContent>
          <FormContainer spacing={2} mt={2}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Saisisser l'objectif Generale"
              variant="standard"
              // type="hidden"
            />
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleClose}>Annuler</Button>
          <Button variant="contained" type="submit">
            Enregistrer
          </Button>
        </DialogActions>
      </SectionNavigation>
    </Container>
  );
};

export default ObjectifsGeneralForm;

const FormContainer = styled(Stack)(({ theme }) => ({
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  // flexDirection: "row",
  width: "560px",
}));
