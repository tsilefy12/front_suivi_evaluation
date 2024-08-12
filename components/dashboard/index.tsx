import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Head from "next/head";
import Add from "@mui/icons-material/Add";
import BackOfficeLayout from "../../layouts/backOffice";
import useBasePath from "../../hooks/useBasePath";
import { BodySection } from "../gereRapportDeMission/GereRapportDeMission";
import { useAppSelector } from "../../hooks/reduxHooks";
import useFetchBudgetEngaged from "../budgetEngage/hooks/useFetchBudgetEngaged";
import { getGrantEncoursList } from "../../redux/features/grantEncours";
import { getBudgetLineList } from "../../redux/features/budgetLine";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchReliquatGrant from "../reliquetGrant/hooks/useFetchEliquatGrant";
import useFetchBudgetInitial from "../budgetInitial/hooks/useFetchBudgetInitial";
import useFetchBudgetLine from "../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import DetailsDashboard from "./[id]";
import useFetchCaisee from "../reliquetGrant/hooks/useFetchCaisse";
import formatMontant from "../../hooks/format";
import { SectionNavigation } from "../GrantsEnCours/ListGrants";
import useFetchPeriode from "../periode/hooks/useFetchPeriode";
import { GrantEncoursItem } from "../../redux/features/grantEncours/grantEncours.interface";
import { Search } from "@mui/icons-material";
import useFetchCurrencyListe from "../configurations/currency/hooks/useFetchCurrency";

const Dashboard: NextPage = () => {
  const basePath = useBasePath();
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const fetchBudgetEngagedList = useFetchBudgetEngaged();
  const { budgetEngagedList } = useAppSelector((state) => state.budgetsEngaged);
  const fetchReliquatGrant = useFetchReliquatGrant();
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);
  const fetchCaisse = useFetchCaisee();
  const { caisselist } = useAppSelector((state) => state.reliquatGrant);
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);
  const fetchCurrency = useFetchCurrencyListe();
  const { currencyListe } = useAppSelector((state) => state.currency);

  const [open, setOpen] = useState(false);
  const [getId, setGetId] = useState("");

  useEffect(() => {
    const data = async () => {
      try {
        await fetchCurrency();
        await fetchBudgetEngagedList();
        await fetchReliquatGrant();
        await fetchBudgetInitial();
        await fetchBudgetLine();
        await fetchCaisse();
        await fetchPeriode();
        await fetchGrants();
      } catch (e) {
        console.log(e);
      }
    };
    data();
  }, [router.query]);

  const handleClick = (id: string) => {
    setOpen(true);
    setGetId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [filter, setFilter] = useState<string>("");
  const [dataFilter, setDataFilter] = useState<GrantEncoursItem[]>([]);

  useEffect(() => {
    if (filter === "") {
      setDataFilter(grantEncoursList.filter((f) => f.type == null));
    } else {
      const filteredGrantEncours = grantEncoursList.filter((grant) => {
        return grant.code === filter && grant.type == null;
      });
      setDataFilter(filteredGrantEncours);
    }
  }, [filter, grantEncoursList]);

  const soldeByGrant = useMemo(() => {
    if (!dataFilter) return 0;

    return dataFilter
      .filter((g) => g.id)
      .flatMap((m) => m.journalBanks)
      .reduce(
        (acc, curr) => acc + ((curr?.debit || 0) - (curr?.credit || 0)),
        0
      );
  }, [dataFilter]);

  const budgetEngaged = useMemo(() => {
    if (!caisselist) return soldeByGrant;

    const caisseSolde = caisselist
      .filter((f: any) => f.grantId)
      .reduce((sum: any, m: any) => sum + (m.debit! - m.credit!), 0);
    return soldeByGrant + caisseSolde;
  }, [caisselist, soldeByGrant]);

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 2, width: "100%" }}
        >
          <Typography variant="h4" color="GrayText">
            Tableau de bord financier
          </Typography>
          <Autocomplete
            sx={{ width: 300 }}
            size="small"
            id="outlined-basic"
            options={grantEncoursList.filter((f) => f.type == null)}
            getOptionLabel={(option: any) => option.code}
            renderInput={(params) => (
              <TextField
                {...params}
                label="rechercher un grant"
                variant="outlined"
              />
            )}
            isOptionEqualToValue={(option: any, value: any) =>
              option.id === value.id
            }
            value={
              grantEncoursList
                .filter((f) => f.type == null)
                .find((grant) => grant.code === filter) || null
            }
            onChange={(event: any, value: any) => {
              setFilter(value ? value.code : "");
            }}
          />
        </Stack>
      </SectionNavigation>
      <BodySection sx={{ height: "calc(100vh - 255px)", overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>GRANT</TableCell>
              <TableCell align="center">BUDGET TOTAL</TableCell>
              <TableCell align="center">BUDGET REÇU</TableCell>
              <TableCell align="center">BUDGET ENGAGE</TableCell>
              <TableCell align="center">SOLDE</TableCell>
              <TableCell>LIGNE BUDGETAIRE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFilter.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.code}</TableCell>
                <TableCell align="center">
                  {(() => {
                    const currency = currencyListe.find(
                      (f) => f.name == row.currencyId
                    )?.name;
                    return currency == "Ariary"
                      ? formatMontant(Number(row.amountMGA))
                      : formatMontant(Number(row.amount));
                  })()}
                </TableCell>
                <TableCell align="center">
                  {formatMontant(
                    periodelist
                      .filter((f) => f.grant === row.id)
                      .reduce((acc, curr) => acc + curr.montant!, 0)
                  )}
                </TableCell>
                <TableCell align="center">
                  {formatMontant(Number(budgetEngaged))}
                </TableCell>
                <TableCell align="center">
                  {(() => {
                    const budgetRecu = periodelist
                      .filter((f) => f.grant == row.id)
                      .reduce((acc, curr) => acc + curr.montant!, 0);
                    return formatMontant(Number(budgetRecu - budgetEngaged));
                  })()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => handleClick(row.id!)}
                  >
                    Voir détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </BodySection>
      <Dialog
        open={open}
        onClose={handleClose}
        disablePortal={false}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          style: {
            maxHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          },
        }}
        sx={{
          marginTop: -12,
        }}
      >
        <DetailsDashboard handleClose={handleClose} getId={getId} />
      </Dialog>
    </Container>
  );
};

export default Dashboard;
