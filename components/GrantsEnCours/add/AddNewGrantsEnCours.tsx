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
import { SectionNavigation } from "../ListGrants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";

const AddNewGrantsEnCours = () => {
  return (
    <Container maxWidth="xl" sx={{  pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
        >
          <Stack flexDirection={"row"}>
            <Link href="/grants/grantsEnCours">
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
          <Typography variant="h5">Créer GRANT</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <FormContainer sx={{ backgroundColor: "#fff", pb: 5 }} spacing={2}>
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
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Titre du Projec(Anglais)"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Titre du Project(Francais)"
            variant="outlined"
          />
        </CustomStack>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Responsable </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Responsable"
          >
            <MenuItem value={10}> Responsable 1 </MenuItem>
            <MenuItem value={20}> Responsable 2 </MenuItem>
            <MenuItem value={30}> Responsable 3 </MenuItem>
          </Select>
        </FormControl>
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
          <TextField
            fullWidth
            id="outlined-basic"
            label="Durée"
            variant="outlined"
          />
        </CustomStack>
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Montant en dévise"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Montant en MGA"
            variant="outlined"
          />
        </CustomStack>
      </FormContainer>
    </Container>
  );
};

export default AddNewGrantsEnCours;

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
