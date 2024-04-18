import {
  Button,
  Container,
  styled,
  Typography,
  Grid,
  FormLabel,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { SectionNavigation } from "../../ListGrants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyValue from "../../../shared/keyValue";
import useFetchGrants from "../../hooks/getGrants";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getGrantEncours } from "../../../../redux/features/grantEncours";


const DetailGrantsEnCours = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { id }: any = router.query;

  const { grantEncours } = useAppSelector((state) => state.grantEncours)
  const fetchGrant = useFetchGrants();

console.log("list grant :", grantEncours)
  useEffect(() => {
    getDetailsGrant();
    fetchGrant()
  }, [id])

  const getDetailsGrant = () => {
    const args: any = {
      include:{
        project: true,
      }
    };
   dispatch(getGrantEncours({ id, args }));
  };
 console.log("list ", grantEncours)
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <SectionNavigation
        direction='row'
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}>
        <Link href="/contracts">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details GRANT
        </Typography>
      </SectionNavigation>
      <DetailsContainer sx={{ backgroundColor: "#fff", pb: 5 }}>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={12}>
                Code : 
                <FormLabel>{grantEncours?.code}</FormLabel>
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={12}>
                  <KeyValue
                    keyName="Bailleur"
                    value={"Nom du bailleur"}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Nom du projet en Anglais"
                    value={"value"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Nom du projet en Français"
                    value={"value"}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={12}>
                  <KeyValue
                    keyName="Responsables"
                    value={"Responsable 1, Responsable 2"}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Date de début"
                    value={"dd/MM/YYYY"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Date de fin"
                    value={"dd/MM/YYYY"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Durée"
                    value={"X ans, XX mois, XXX jours"}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Montant en devise"
                    value={"10.000 $"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Montant en MGA"
                    value={"40.000.000 Ar"}
                  />
                </Grid>
              </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailGrantsEnCours;


const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
