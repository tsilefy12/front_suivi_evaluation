import {
  Autocomplete,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import formatMontant from "../../hooks/format";
import { useAppSelector } from "../../hooks/reduxHooks";
import useFetchBudgetInitial from "../budgetInitial/hooks/useFetchBudgetInitial";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchPeriode from "../periode/hooks/useFetchPeriode";
import useFetchBudgetLine from "../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import Link from "next/link";
import { Add, ArrowBack } from "@mui/icons-material";
import { BudgetInitialItem } from "../../redux/features/budgetInitial/budgetInitial.interface";

const ListPlanFinancement = () => {
  const router = useRouter();
  const fetchBudgetInitial = useFetchBudgetInitial();
  const fetchGrant = useFetchGrants();
  const fetchPeriode = useFetchPeriode();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const { periodelist } = useAppSelector((state) => state.periode);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);

  useEffect(() => {
    fetchBudgetInitial();
    fetchGrant();
    fetchPeriode();
    fetchBudgetLine();
  }, [router.query]);

  const [filter, setFilter] = useState<string>("");
  const [dataFilter, setDataFilter] = useState<BudgetInitialItem[]>([]);

  useEffect(() => {
    if (filter === "") {
      setDataFilter(budgetInitialList);
    } else {
      const filteredBudgets = budgetInitialList.filter((budget) => {
        return (
          grantEncoursList.find((grant) => grant.code === filter)?.id ===
          budget.grant
        );
      });
      setDataFilter(filteredBudgets);
    }
  }, [filter, budgetInitialList, grantEncoursList]);

  const groupedBudgets: { [key: string]: BudgetInitialItem[] } = {};

  // Groupement de budgetInitialList par grant
  dataFilter.forEach((budget) => {
    const grantCode =
      grantEncoursList.find((grant) => grant.id === budget.grant)?.code || "";
    if (!groupedBudgets[grantCode]) {
      groupedBudgets[grantCode] = [];
    }
    groupedBudgets[grantCode].push(budget);
  });

  const grantTotals: { [key: string]: number } = {};
  Object.keys(groupedBudgets).forEach((grantCode) => {
    const budgets = groupedBudgets[grantCode];
    const total = budgets.reduce((acc, budget) => {
      const totalBudget = budget.grantsMonitorings!.reduce((acc, ligneId) => {
        return acc + ligneId.montant!;
      }, 0);
      return acc + totalBudget;
    }, 0);
    grantTotals[grantCode] = total;
  });

  return (
    <Container maxWidth="xl">
      <Stack direction={"column"} spacing={2} alignItems={"start"}>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Link href="/">
            <Button variant="text" startIcon={<ArrowBack />} color="info">
              Retour
            </Button>
          </Link>
          <Link href="/grants/periode/add">
            <Button variant="contained" startIcon={<Add />}>
              Créer période
            </Button>
          </Link>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 2, width: "100%" }}
        >
          <Typography variant="h4" color="GrayText">
            Plan de financement
          </Typography>
          <Autocomplete
            sx={{ width: 300, mb: 2 }}
            size="small"
            id="outlined-basic"
            options={grantEncoursList}
            getOptionLabel={(option: any) => option.code}
            renderInput={(params) => (
              <TextField {...params} label="Grant" variant="outlined" />
            )}
            isOptionEqualToValue={(option: any, value: any) =>
              option.id === value.id
            }
            value={
              grantEncoursList.find((grant) => grant.code === filter) || null
            }
            onChange={(event: any, value: any) => {
              setFilter(value ? value.code : "");
            }}
          />
        </Stack>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", mb: 2, height: "calc(100vh - 300px)" }}
      >
        <Table
          sx={{
            minWidth: 750,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>GRANT</TableCell>
              <TableCell>PERIODE</TableCell>
              <TableCell>DATE DEBUT</TableCell>
              <TableCell>DATE FIN</TableCell>
              <TableCell>LIGNE BUDGETAIRE</TableCell>
              <TableCell>MONTANT</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>TOTAL GRANT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedBudgets).map((grantCode) => {
              const budgets = groupedBudgets[grantCode];
              return budgets.map((budget, index) => (
                <TableRow key={`${grantCode}-${index}`}>
                  {index === 0 && (
                    <TableCell rowSpan={budgets.length}>{grantCode}</TableCell>
                  )}
                  <TableCell>
                    {
                      periodelist.find((p) => p.id === budget.periodeId)
                        ?.periode
                    }
                  </TableCell>
                  <TableCell>
                    <Moment format="DD/MM/yyyy">
                      {
                        periodelist.find((p) => p.id === budget.periodeId)
                          ?.debut
                      }
                    </Moment>
                  </TableCell>
                  <TableCell>
                    <Moment format="DD/MM/yyyy">
                      {periodelist.find((p) => p.id === budget.periodeId)?.fin}
                    </Moment>
                  </TableCell>
                  <TableCell>
                    {budget.grantsMonitorings?.map((ligneId, index) => {
                      const budgetLine = budgetLineList.find(
                        (bl) => bl.id === ligneId.ligneBudgetaire
                      );
                      return (
                        <Stack key={index} direction={"column"} gap={8}>
                          {budgetLine ? budgetLine.code : ""}
                        </Stack>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    {budget.grantsMonitorings?.map((ligneId, index) => {
                      const budgetLine = budgetLineList.find(
                        (bl) => bl.id === ligneId.ligneBudgetaire
                      );
                      return (
                        <Stack key={index} direction={"column"} gap={10}>
                          {budgetLine
                            ? formatMontant(Number(ligneId.montant))
                            : ""}
                        </Stack>
                      );
                    })}
                  </TableCell>
                  <TableCell>
                    {formatMontant(
                      Number(
                        budget.grantsMonitorings
                          ?.map((ligneId) => {
                            const budgetLine = budgetLineList.find(
                              (bl) => bl.id === ligneId.ligneBudgetaire
                            );
                            return budgetLine ? ligneId.montant : 0;
                          })
                          .reduce((acc: any, curr: any) => acc + curr, 0) || 0
                      )
                    )}
                  </TableCell>
                  {index === 0 && (
                    <TableCell rowSpan={budgets.length}>
                      {formatMontant(Number(grantTotals[grantCode]))}
                    </TableCell>
                  )}
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListPlanFinancement;
