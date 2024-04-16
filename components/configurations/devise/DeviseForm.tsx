import { Stack, styled, Typography, TextField, Button } from "@mui/material";
import React from "react";

const DeviseForm = () => {
  return (
    <FormContainer>
      <Stack spacing={4}>
        <Typography variant="h5" color="initial">
          Formulaire (Créer/Modifier)
        </Typography>
        <TextField id="outlined-basic" label="Devise" variant="outlined" />
        <TextField id="outlined-basic" label="Abreviation" variant="outlined" />
        <BtnContainer direction="row" spacing={2} justifyContent="flex-end">
          <Button size="medium" color="warning" variant="text">
            Annuler
          </Button>
          <Button size="medium" color="primary" variant="contained">
            Enregistrer
          </Button>
        </BtnContainer>
      </Stack>
    </FormContainer>
  );
};

const BtnContainer = styled(Stack)(({ theme }) => ({}));

const FormContainer = styled("div")(({ theme }) => ({
  // border: "1px solid #E0E0E0",
  borderRadius: 20,
  padding: theme.spacing(2),
  marginBlock: theme.spacing(2),
  background: "#fff",
}));

export default DeviseForm;
