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
import { SectionNavigation } from "../ListPeriodeGrants";

const AddNewPeriodeGrants = () => {
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Stack flexDirection={"row"}>
            <Link href="/grants/periode">
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
          <Typography variant="h5">Créer Réliquats Grants</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <FormContainer spacing={2}>
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
          label="Periode"
          variant="outlined"
        />
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Debut"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Fin"
            variant="outlined"
          />
        </CustomStack>
      </FormContainer>
    </Container>
  );
};

export default AddNewPeriodeGrants;

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
