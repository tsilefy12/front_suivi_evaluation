import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Button,
  Container,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

interface SoldeByGrant {
  [key: string]: { debit: number; credit: number };
}

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

  const [open, setOpen] = useState(false);
  const [getId, setGetId] = useState("");

  useEffect(() => {
    fetchBudgetEngagedList();
    fetchGrants();
    fetchReliquatGrant();
    fetchBudgetInitial();
    fetchBudgetLine();
    fetchCaisse();
    fetchPeriode();
  }, [router.query]);

  const handleClick = (id: string) => {
    setOpen(true);
    setGetId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const soldeByGrant: SoldeByGrant = useMemo(() => {
    const result: SoldeByGrant = {};
    grantEncoursList.forEach((grant) => {
      if (Array.isArray(grant.journalBanks)) {
        grant.journalBanks.forEach((jb) => {
          const grantId = grant.id;
          if (!result[grantId!]) {
            result[grantId!] = { debit: 0, credit: 0 };
          }
          if (jb.debit !== undefined) {
            result[grantId!].debit += jb.debit;
          }
          if (jb.credit !== undefined) {
            result[grantId!].credit += jb.credit;
          }
        });
      }
    });
    return result;
  }, [grantEncoursList]);

  const soldeBankByGrant = useMemo(() => {
    const finalSoldeByGrant: { [grantId: string]: number } = {};

    Object.keys(soldeByGrant).forEach((grantId) => {
      const bankSolde =
        soldeByGrant[grantId].debit - soldeByGrant[grantId].credit;
      const caisseSolde = caisselist
        .filter((f: any) => f.grantId === grantId)
        .reduce((sum: any, m: any) => sum + (m.debit! - m.credit!), 0);
      finalSoldeByGrant[grantId] = bankSolde + caisseSolde;
    });

    return finalSoldeByGrant;
  }, [caisselist, soldeByGrant]);

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
        <Typography variant="h4" color="GrayText">
          Budget engagé
        </Typography>
      </SectionNavigation>
      <BodySection>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>GRANT</TableCell>
              <TableCell align="center">BUDGET TOTAL</TableCell>
              <TableCell align="center">PERIODES</TableCell>
              <TableCell align="center">BUDGET ENGAGE</TableCell>
              <TableCell align="center">SOLDE</TableCell>
              <TableCell>LIGNE BUDGETAIRE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grantEncoursList
              .filter(
                (g) =>
                  budgetLineList.some((bl) => bl.grantId === g.id) &&
                  budgetInitialList.some((bi) => bi.grant === g.id) &&
                  budgetEngagedList.some((be) => be.grantsId === g.id) &&
                  periodelist.some((p) => p.grant === g.id)
              )
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell align="center">
                    {formatMontant(Number(row.amountMGA))}
                  </TableCell>
                  <TableCell align="center">
                    {formatMontant(
                      periodelist
                        .filter((f) => f.grant === row.id)
                        .reduce((acc, curr) => acc + curr.montant!, 0)
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {formatMontant(
                      soldeBankByGrant[row.id!] !== undefined
                        ? soldeBankByGrant[row.id!]
                        : 0
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {formatMontant(
                      Number(row.amountMGA ?? 0) -
                        (soldeBankByGrant[row.id!] !== undefined
                          ? soldeBankByGrant[row.id!]
                          : 0)
                    )}
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
          marginTop: -10,
        }}
      >
        <DetailsDashboard handleClose={handleClose} getId={getId} />
      </Dialog>
    </Container>
  );
};

export default Dashboard;
