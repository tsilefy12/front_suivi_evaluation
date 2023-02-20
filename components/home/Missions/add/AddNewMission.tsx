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
import { SectionNavigation } from "../../../planTravail/objectifStrategique";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";

const AddNewMission = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack flexDirection={"row"}>
            <Link href="/">
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
          <Typography variant="h5">Créer Mission</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <FormContainer spacing={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Référence mission"
          variant="outlined"
        />
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {" "}
              Gestionnaire du budget{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gestionnaire du budget"
            >
              <MenuItem value={10}> Gestionnaire du budget 1 </MenuItem>
              <MenuItem value={20}> Gestionnaire du budget 2 </MenuItem>
              <MenuItem value={30}> Gestionnaire du budget 3 </MenuItem>
            </Select>
          </FormControl>
        </CustomStack>

        <TextField
          fullWidth
          id="outlined-basic"
          label="Description de la mission"
          variant="outlined"
        />
      </FormContainer>
    </Container>
  );
};

export default AddNewMission;

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
