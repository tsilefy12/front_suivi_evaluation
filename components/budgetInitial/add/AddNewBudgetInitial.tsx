import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { SectionNavigation } from "../ListBudgetsInitial";

const AddNewBudgetInitial = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack flexDirection={"row"}>
            <Link href="/grants/budgetInitial">
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
          <Typography variant="h5">Créer Budget initial</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <FormContainer spacing={2}>
      <TextField
          fullWidth
          id="outlined-basic"
          label="Description"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Periode 1"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Periode 2"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Total"
          variant="outlined"
        />
      </FormContainer>
    </Container>
  );
};

export default AddNewBudgetInitial;

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
