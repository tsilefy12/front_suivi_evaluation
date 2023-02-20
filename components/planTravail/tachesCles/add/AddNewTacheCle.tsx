import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  Stack,
  Autocomplete,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { SectionNavigation } from "../ListTacheCles";

const AddNewTacheCle = () => {

  const responsable = [
    { title: "value 1"},
    { title: "value 2"},
    { title: "value 3"},
    { title: "value 4"},
    { title: "value 5"},
    { title: "value 6"},
    { title: "value 7"},
  ];

  
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack flexDirection={"row"}>
            <Link href="/plan_travail/tacheCle">
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
          <Typography variant="h5">Créer Tâches clés</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <FormContainer spacing={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tâche clé"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Projet"
          variant="outlined"
        />
        <FormControl fullWidth>
          <Autocomplete
            multiple
            id="tags-standard"
            options={responsable}
            getOptionLabel={(option) => option.title}
            defaultValue={[responsable[1]]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                id="outlined-basic"
                label="Responsable"
              />
            )}
          />
        </FormControl>
      </FormContainer>
    </Container>
  );
};

export default AddNewTacheCle;

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
