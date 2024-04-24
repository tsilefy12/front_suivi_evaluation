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
import useFetchProject from "../../hooks/getProject";
import useFetchEmployes from "../../../home/Missions/hooks/useFetchEmployees";
import Moment from "react-moment";


const DetailGrantsEnCours = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { id }: any = router.query;

  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours)
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state: any) => state.project)
  const fetchEmployes = useFetchEmployes()
  const { employees } = useAppSelector((state: any) => state.employe)
  console.log(" id :", id)
  React.useEffect(() => {
    getDetailsGrant();
    fetchGrant();
    fetchProject();
    fetchEmployes();
    getDetailsGrant();
  }, [id])

  const getDetailsGrant = () => {
    const args: any = {};
    dispatch(getGrantEncours({ id, args }));
  };

  const listDetailGrantEncours: {
    id: string, cd: string, baille:
      string, projet: string, respo: any,
    debut: any, fin: any, duree: string, devise: any, mga: any
  }[] = [];

  if (Array.isArray(grantEncoursList)) {
    grantEncoursList.forEach((g: any) => {
      if (g.id === id) {
        listDetailGrantEncours.push({
          id: g.id,cd: g.code, baille: g.bailleur, projet: g.projectId,
          respo: g.responsable, debut: g.startDate, fin: g.endDate, duree: g.duration, devise: g.amount, mga: g.montantMGA
        })
      }
    })
  } else {
    console.error("grantEncoursList n'est pas un tableau.");
  }
  
  
  console.log("list details :", listDetailGrantEncours)
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <SectionNavigation
        direction='row'
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}>
        <Link href="/grants/grantsEncours">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details GRANT
        </Typography>
      </SectionNavigation>
      {
        listDetailGrantEncours.map((row: any, index: any) => (
          <DetailsContainer sx={{ backgroundColor: "#fff", pb: 5 }} key={row.id}>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                Code :
                <FormLabel>{row.cd}</FormLabel>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                <KeyValue
                  keyName="Bailleur"
                  value={row.baille!}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Nom du projet en Anglais"
                  value={projectList.find((e: any) => e.id === row.projet)?.titleEn}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Nom du projet en Français"
                  value={projectList.find((e: any) => e.id === row.projet)?.titleFr}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={12}>
                Responsables :
                {
                  row.respo && employees.map((e: any) => {
                    return (
                      row.responsable!.includes(e.id) ? (
                        <FormLabel key={e.id}>
                          Nom et prénoms : {e.name} {e.surname}
                        </FormLabel>
                      ) : null
                    );
                  })
                }
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={6}>
                Date début : <span></span>
                <Moment format="DD/MM/yyyy">{row.debut!}</Moment>
              </Grid>
              <Grid item xs={12} md={6}>
                Date fin : <span></span>
                <Moment format="DD/MM/yyyy">{row.fin!}</Moment>
              </Grid>
              <Grid item xs={12} md={6}>
                Durée : <span></span>
                <FormLabel>
                  {row.duree!}
                </FormLabel>
              </Grid>
            </Grid>
            <Grid container spacing={4} my={1}>
              <Grid item xs={12} md={6}>
                Montant en devise : <span></span>
                <FormLabel>
                  {row.devise!}
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                Montant en MGA : <span></span>
                <FormLabel>
                  {row.mga!}
                </FormLabel>
              </Grid>
            </Grid>
          </DetailsContainer>
        ))
      }
    </Container>
  );
};

export default DetailGrantsEnCours;


const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
