import {
  Button,
  Container,
  styled,
  Typography,
  Grid,
  FormLabel,
  FormControl,
  Stack,
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
import Moment from "react-moment";
import useFetchEmploys from "../../hooks/getResponsable";


const DetailGrantsEnCours = () => {
  const router = useRouter()
  const dispatch: any = useAppDispatch();
  const { id }: any = router.query;

  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours)
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state: any) => state.project)
  const fetchEmployes = useFetchEmploys()
  const { employees } = useAppSelector((state: any) => state.employe)

  React.useEffect(() => {
    fetchGrant();
    fetchProject();
    fetchEmployes();
  }, [router.query])

  
  // console.log("list details :", grantEncours)

  const listDetailGrantEncours: {idD: number, cd: string, baille: string, projet: number, respo: string, debut: Date, fin: Date, duree: number, devise: number, mga: number, bank: number}[] = [];

    grantEncoursList.forEach((g: any) => {
      if (parseInt(g.id!) === parseInt(id!)) {
        listDetailGrantEncours.push({idD: parseInt(g.id!), cd: g.code!, baille: g.bailleur!, projet: parseInt(g.projectId!),respo: g.responsable!, debut: g.startDate!, fin: g.endDate!, duree: parseInt(g.duration!), devise: parseInt(g.amount!), mga: parseInt(g.amountMGA!), bank: parseInt(g.bankId!) })
      }
    })

  // console.log("list details :", listDetailGrantEncours)
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
      <DetailsContainer sx={{ backgroundColor: "#fff", pb: 5 }}>
        {
          listDetailGrantEncours.map((row: any, index: any) => (
            <Container  key={row.idD!} maxWidth="xl" sx={{ pb: 5 }}>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={12}>
                  <KeyValue
                    keyName="Code"
                    value={row.cd!}
                  />
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
                    employees && employees.map((e: any) =>(
                      (
                        row.respo!.includes(e.id) ? (
                          <Stack key={e.id} direction="column" spacing={2}>
                            Nom et prénoms : {e.name} {e.surname}
                          </Stack>
                        ) : null
                      )
                     ))
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
              {/* <Grid item xs={12} md={6}>
                  <KeyValue
                    keyName="Nom du projet en Français"
                    value={projectList.find((e: any) => e.id === row.projet)?.titleFr}
                  />
                </Grid> */}
            </Container>
          ))
        }
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
