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
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import useFetchProject from "../../../GrantsEnCours/hooks/getProject";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import useFetchCurrency from "../../../GrantsEnCours/hooks/getCurrency";
import useFetchBank from "../../../GrantsEnCours/hooks";
import useFetchStagiaire from "../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../GrantsEnCours/hooks/getPrestataire";
import Moment from "react-moment";
import formatMontant from "../../../../hooks/format";
import { GrantEncoursItem } from "../../../../redux/features/grantEncours/grantEncours.interface";

const DetailGrantsAdmin = () => {
  const router = useRouter();
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
  const { currencyListe } = useAppSelector((state: any) => state.currency);
  const fetchBank = useFetchBank();
  const { bankList } = useAppSelector((state: any) => state.bank);
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );

  React.useEffect(() => {
    fetchGrant();
    fetchProject();
    fetchEmployes();
    fetchCurreny();
    fetchBank();
    fetchStagiaire();
    fetchPrestataire();
  }, []);

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
    bankId: number;
  }[] = [];

  grantEncoursList
    .filter((f: GrantEncoursItem) => f.type != null)
    .forEach((g: any) => {
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
          bankId: g.bankId!,
        });
      }
    });
  const formatOptions = (options: any) => {
    return options.map((option: any) => ({
      id: option.id,
      name: option.name,
      surname: option.surname || "",
    }));
  };

  // Fusionner les listes et les transformer
  const allOptions = [
    ...formatOptions(employees),
    ...formatOptions(interns),
    ...formatOptions(prestataireListe),
  ];
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <SectionNavigation
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/grants/grantsAdmin">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Détails grants admin
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
                  keyName="Devise"
                  value={
                    currencyListe.find((e: any) => e.id === row.curr)?.name
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                Banque :
                {bankList &&
                  bankList
                    .filter((f: any) => f.id === row.bankId)
                    .map((e: any) => (
                      <Stack
                        style={{ color: "GrayText" }}
                        direction={"column"}
                        gap={2}
                      >
                        <span>N° : {e.numero}</span>
                        <span>Nom : {e.name}</span>
                        <span>Chequier : {e.chequier}</span>
                        <span>Titre : {e.title}</span>
                      </Stack>
                    ))}
              </Grid>
              <Grid item xs={12} md={12}>
                Responsables :
                {allOptions &&
                  allOptions.map((o: any) =>
                    row.respo!.includes(o.id) ? (
                      <span key={o.id} style={{ color: "GrayText" }}>
                        {o.name} {o.surname ? o.surname : ""}
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
                          ?.name || ""
                      }  ${
                    employees.find((e: any) => e.id === row.FValidator)
                      ?.surname || ""
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
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Finance vérificateur"
                  value={`
                      ${
                        employees.find((e: any) => e.id === row.FVerifcator)
                          ?.name || ""
                      } ${
                    employees.find((e: any) => e.id === row.FVerifcator)
                      ?.surname || ""
                  }`}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyValue
                  keyName="Validateur technique"
                  value={`
                      ${
                        employees.find((e: any) => e.id === row.techValide)
                          ?.name || ""
                      } ${
                    employees.find((e: any) => e.id === row.techValide)
                      ?.surname || ""
                  }`}
                />
              </Grid>
            </Stack>
            <Stack></Stack>
          </Stack>
        ))}
      </DetailsContainer>
    </Container>
  );
};

export default DetailGrantsAdmin;

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
