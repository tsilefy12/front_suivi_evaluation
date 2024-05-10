import React from "react";
import { Button, Container, FormControl, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../layouts/backOffice";
import useBasePath from "../../hooks/useBasePath";
import { SectionNavigation } from "../home";
import { Add, Details } from "@mui/icons-material";
import { BodySection } from "../gereRapportDeMission/GereRapportDeMission";
import { useAppSelector } from "../../hooks/reduxHooks";
import useFetchBudgetEngaged from "../budgetEngage/hooks/useFetchBudgetEngaged";
import { useDispatch } from "react-redux";
import { getGrantEncoursList } from "../../redux/features/grantEncours";
import { getBudgetLineList } from "../../redux/features/budgetLine";
import { useRouter } from "next/router";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchReliquatGrant from "../reliquetGrant/hooks/useFetchEliquatGrant";
import useFetchBudgetInitial from "../budgetInitial/hooks/useFetchBudgetInitial";
import useFetchBudgetLine from "../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";

const Dashboard: NextPage = () => {
  const basePath = useBasePath();
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector(state => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector(state => state.budgetLine);
  const fetchBudgetEngagedList = useFetchBudgetEngaged();
  const { budgetEngagedList } = useAppSelector(state => state.budgetsEngaged)
  const fetchtReliquatGrant = useFetchReliquatGrant();
  const { reliquatGrantList } = useAppSelector(state => state.reliquatGrant)
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial)

  React.useEffect(() => {
    fetchBudgetEngagedList();
    fetchGrants();
    fetchtReliquatGrant();
    fetchBudgetInitial();
    fetchBudgetLine();
  }, [router.query])
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        {/* <Link href="/missions/add">
                    <Button color="primary" variant="contained" startIcon={<Add />}>
                        Créer
                    </Button>
                </Link> */}
        <Typography variant="h4" color="GrayText">
          Dashboard
        </Typography>
      </SectionNavigation>
      <BodySection>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                GRANT
              </TableCell>
              <TableCell>
                LIGNE BUDGETAIRE
              </TableCell>
              <TableCell align="center">
                BUDGET INITIAL
              </TableCell>
              <TableCell align="center">
                BUDGET ENGAGE
              </TableCell>
              <TableCell align="center">
                SOLDE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              grantEncoursList.filter(g =>
                budgetLineList.some(bl => bl.grantId === g.id) &&
                budgetInitialList.some(bi => bi.grant === g.id) &&
                budgetEngagedList.some(be => be.grantsId === g.id) &&
                reliquatGrantList.some(rg => rg.grant === g.id)
              ).map(row => (
                <TableRow key={row.id!}>
                  <TableCell>
                    {row.code}
                  </TableCell>
                  <TableCell>
                    <Stack direction={"column"} spacing={2} sx={{height: (row.budgetLines!).length <= 2 ? "auto" : 70, overflow: "auot"}}>
                      {row.budgetLines!.map(bl => (
                        <span key={bl.id}>{bl.code}</span>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    {budgetInitialList.find(e => e.grant === row.id)?.montant} Ar
                  </TableCell>
                  <TableCell align="center">
                    {budgetEngagedList.find(be => be.grantsId === row.id)?.amount} Ar
                  </TableCell>
                  <TableCell align="center">
                    {reliquatGrantList.find(rg => rg.grant === row.id)?.montantTotal} Ar
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </BodySection>
    </Container>
  );
};

export default Dashboard;
