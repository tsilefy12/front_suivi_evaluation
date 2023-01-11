import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { SectionNavigation } from "../ListGrants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";

const AddNewGrantsAdmin = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack flexDirection={"row"}>
            <Link href="/grants/grantsAdmin">
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Check />}
              sx={{ marginInline: 3 }}
            >
              Enregistrer
            </Button>
            <Button
              variant="text"
              color="warning"
              size="small"
              startIcon={<Close />}
              sx={{ marginInline: 3 }}
            >
              Annuler
            </Button>
          </Stack>
          <Typography variant="h5">Réliquat GRANT</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>

      <FormContainer spacing={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="GRANT"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Bailleur"
          variant="outlined"
        />
      </FormContainer>
    </Container>
  );
};

export default AddNewGrantsAdmin;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
