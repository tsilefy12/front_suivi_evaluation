import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { SectionNavigation } from "../ListGrants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";

const AddNewGrantsAdmin = () => {
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
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
          <Typography variant="h5">Créer GRANT ADMIN</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>

      <FormContainer  sx={{ backgroundColor: "#fff" }} spacing={2}>
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Grants </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Grants"
          >
            <MenuItem value={10}> Grants 1 </MenuItem>
            <MenuItem value={20}> Grants 2 </MenuItem>
            <MenuItem value={30}> Grants 3 </MenuItem>
          </Select>
        </FormControl>
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
