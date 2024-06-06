import React from "react";
import {
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import Link from "next/link";
import Add from "@mui/icons-material/Add";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchBudgetInitial from "../budgetInitial/hooks/useFetchBudgetInitial";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchPeriode from "../periode/hooks/useFetchPeriode";
import Moment from "react-moment";
import useFetchBudgetLine from "../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import formatMontant from "../../hooks/format";

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

  React.useEffect(() => {
    fetchBudgetInitial();
    fetchGrant();
    fetchPeriode();
    fetchBudgetLine();
  }, [router.query]);

  const groupedBudgets: { [key: string]: typeof budgetInitialList } = {};

  // Grouping the budgetInitialList by grant
  budgetInitialList.forEach((budget) => {
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
      <Stack direction={"column"} spacing={2}>
        <Typography variant="h4" color="GrayText">
          Plan de financement
        </Typography>
      </Stack>
      <TableContainer component={Paper} sx={{ width: "100%", mb: 2 }}>
        <Table sx={{ minWidth: 750 }}>
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
                <TableRow
                  key={`${grantCode}-${index}`}
                  sx={{ borderBottomColor: "black" }}
                >
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
                    {budgetInitialList
                      .filter((bi) => bi.periodeId === budget.periodeId)
                      .flatMap((bi) => bi.grantsMonitorings ?? [])
                      .map((ligneId, index) => {
                        const budgetLine = budgetLineList.find(
                          (bl: any) => bl.id === ligneId.ligneBudgetaire
                        );
                        return (
                          <Stack key={index} direction={"column"} gap={8}>
                            {budgetLine ? budgetLine.code : ""}
                          </Stack>
                        );
                      })}
                  </TableCell>

                  <TableCell>
                    {budgetInitialList
                      .filter((bi) => bi.periodeId === budget.periodeId)
                      .flatMap((bi) => bi.grantsMonitorings ?? [])
                      .map((ligneId, index) => {
                        const budgetLine = budgetLineList.find(
                          (bl: any) => bl.id === ligneId.ligneBudgetaire
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
                        budgetInitialList
                          .filter((bi) => bi.periodeId === budget.periodeId)
                          .flatMap((bi) => bi.grantsMonitorings ?? [])
                          .map((ligneId) => {
                            const budgetLine = budgetLineList.find(
                              (bl: any) => bl.id === ligneId.ligneBudgetaire
                            );
                            return budgetLine ? ligneId.montant : 0;
                          })
                          .reduce((acc: any, curr: any) => acc + curr, 0)
                      )
                    )}
                  </TableCell>
                  <TableCell rowSpan={budgets.length}>
                    {index === 0 && (
                      <TableCell rowSpan={budgets.length}>
                        {formatMontant(Number(grantTotals[grantCode]))}
                      </TableCell>
                    )}
                  </TableCell>
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
