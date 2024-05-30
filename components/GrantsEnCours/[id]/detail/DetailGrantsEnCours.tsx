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
import useFetchCurrency from "../../hooks/getCurrency";
import formatMontant from "../../../../hooks/format";

const DetailGrantsEnCours = () => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { id }: any = router.query;

  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector(
    (state: any) => state.grantEncours
  );
  const fetchProject = useFetchProject();
  const { projectList } = useAppSelector((state: any) => state.project);
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state: any) => state.employe);
  const fetchCurreny = useFetchCurrency();
  const { currencylist } = useAppSelector((state: any) => state.currency);

  React.useEffect(() => {
    fetchGrant();
    fetchProject();
    fetchEmployes();
    fetchCurreny();
  }, [router.query]);

  // console.log("list details :", grantEncours)

  const listDetailGrantEncours: {
    idD: number;
    cd: string;
    baille: string;
    curr: number;
    respo: string;
    debut: Date;
    fin: Date;
    duree: Date;
    devise: number;
    mga: number;
    FValidator: any;
    FVerifcator: any;
    stat: string;
    techValide: string;
    FDate: Date;
    techD: Date;
  }[] = [];

  grantEncoursList.forEach((g: any) => {
    // console.log("respo :", g.responsable)
    if (parseInt(g.id!) === parseInt(id!)) {
      listDetailGrantEncours.push({
        idD: parseInt(g.id!),
        cd: g.code!,
        baille: g.bailleur!,
        curr: parseInt(g.currencyId!),
        respo: g.responsable!,
        debut: g.startDate!,
        fin: g.endDate!,
        duree: g.deadline!,
        devise: parseInt(g.amount!),
        mga: parseInt(g.amountMGA!),
        FValidator: g.financeValidator,
        FVerifcator: g.financeVerificator,
        stat: g.status,
        techValide: g.techValidator,
        FDate: g.financeDate,
        techD: g.techDate,
      });
    }
  });

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <SectionNavigation
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/grants/grantsEnCours">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details GRANT
        </Typography>
      </SectionNavigation>
      <DetailsContainer sx={{ backgroundColor: "#fff", pb: 5 }}>
        {listDetailGrantEncours.map((row: any, index: any) => (
          <Stack
            key={row.idD!}
            maxWidth="xl"
            sx={{ pb: 5 }}
            direction={"row"}
            justifyContent={"space-between"}
            padding={1}
            flexWrap={"wrap"}
            gap={2}
          >
            <Stack direction={"column"} gap={2}>
              <Grid item xs={12} md={12}>
                <KeyValue keyName="Code" value={row.cd!} />
              </Grid>
              <Grid item xs={12} md={12}>
                <KeyValue keyName="Bailleur" value={row.baille!} />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Currency"
                  value={currencylist.find((e: any) => e.id === row.curr)?.name}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                Responsables :
                {employees &&
                  employees.map((e: any) =>
                    row.respo!.includes(e.id) ? (
                      <span style={{ color: "GrayText" }}>
                        {" "}
                        {e.name} {e.surname}
                      </span>
                    ) : null
                  )}
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Finance validateur"
                  value={`
                      ${
                        employees.find((e: any) => e.id === row.FValidator)
                          ?.name
                      }  ${
                    employees.find((e: any) => e.id === row.FValidator)?.surname
                  }`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Finance vérificateur"
                  value={`
                      ${
                        employees.find((e: any) => e.id === row.FVerifcator)
                          ?.name
                      } ${
                    employees.find((e: any) => e.id === row.FVerifcator)
                      ?.surname
                  }`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Validateur technique"
                  value={`
                      ${
                        employees.find((e: any) => e.id === row.techValide)
                          ?.name
                      } ${
                    employees.find((e: any) => e.id === row.techValide)?.surname
                  }`}
                />
              </Grid>
            </Stack>
            <Stack direction={"column"} gap={2}>
              <Grid item xs={12} md={6}>
                Tech date : <span></span>
                <Moment format="DD/MM/yyyy" style={{ color: "GrayText" }}>
                  {row.techD}
                </Moment>
              </Grid>
              <Grid item xs={12} md={6}>
                Date finance : <span></span>
                <Moment format="DD/MM/yyyy" style={{ color: "GrayText" }}>
                  {row.FDate}
                </Moment>
              </Grid>
              <Grid item xs={12} md={6}>
                Date début : <span></span>
                <Moment format="DD/MM/yyyy" style={{ color: "GrayText" }}>
                  {row.debut!}
                </Moment>
              </Grid>
              <Grid item xs={12} md={6}>
                Date fin : <span></span>
                <Moment format="DD/MM/yyyy" style={{ color: "GrayText" }}>
                  {row.fin!}
                </Moment>
              </Grid>
              <Grid item xs={12} md={6}>
                Durée : <span></span>
                <Moment format="DD/MM/yyyy" style={{ color: "GrayText" }}>
                  {row.duree!}
                </Moment>
              </Grid>
              <Grid item xs={12} md={6}>
                Montant en devise : <span></span>
                <FormLabel>{formatMontant(Number(row.devise))}</FormLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                Montant en MGA : <span></span>
                <FormLabel>{formatMontant(Number(row.mga))}</FormLabel>
              </Grid>
            </Stack>
            <Stack></Stack>
          </Stack>
        ))}
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
