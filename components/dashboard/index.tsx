import React from "react";
import {
  Button,
  Container,
  Dialog,
  FormControl,
  Link,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../layouts/backOffice";
import useBasePath from "../../hooks/useBasePath";
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
import DetailsDashboard from "./[id]";
import useFetchCaisee from "../reliquetGrant/hooks/useFetchCaisse";
import formatMontant from "../../hooks/format";
import { SectionNavigation } from "../GrantsEnCours/ListGrants";
import Add from "@mui/icons-material/Add";
import useFetchPeriode from "../periode/hooks/useFetchPeriode";

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
  const fetchtReliquatGrant = useFetchReliquatGrant();
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);
  const [open, setOpen] = React.useState(false);
  const [getId, setGetId] = React.useState("");

  const { caisselist } = useAppSelector((state: any) => state.reliquatGrant);
  const fetchCaisse = useFetchCaisee();
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);

  React.useEffect(() => {
    fetchBudgetEngagedList();
    fetchGrants();
    fetchtReliquatGrant();
    fetchBudgetInitial();
    fetchBudgetLine();
    fetchCaisse();
    fetchPeriode();
  }, [router.query]);

  const handleClick = (id: any) => {
    setOpen(true);
    setGetId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [soldeBankByGrant, setSoldeBankByGrant] = React.useState<{
    [key: string]: number;
  }>({});
  const soldeByGrant: { [key: string]: { debit: number; credit: number } } = {};
  React.useEffect(() => {
    // Accumulate debits and credits from journalBanks by grant
    grantEncoursList.forEach((grant) => {
      if (Array.isArray(grant.journalBanks)) {
        grant.journalBanks.forEach((jb) => {
          const grantId = grant.id;
          if (!soldeByGrant[grantId!]) {
            soldeByGrant[grantId!] = { debit: 0, credit: 0 };
          }
          if (jb.debit !== undefined) {
            soldeByGrant[grantId!].debit += jb.debit;
          }
          if (jb.credit !== undefined) {
            soldeByGrant[grantId!].credit += jb.credit;
          }
        });
      }
    });
  }, [grantEncoursList]);

  const finalSoldeByGrant: { [grantId: string]: number } = {};

  React.useEffect(() => {
    Object.keys(soldeByGrant).forEach((grantId) => {
      const bankSolde =
        soldeByGrant[grantId].debit - soldeByGrant[grantId].credit;

      console.log("ciasse :", caisselist);
      const caisseSolde = caisselist
        .filter((f: any) => f.grantId == grantId)
        .reduce((sum: any, m: any) => sum + (m.debit - m.credit), 0);

      finalSoldeByGrant[grantId] = bankSolde + caisseSolde;
    });

    setSoldeBankByGrant(finalSoldeByGrant);
  }, [caisselist]);

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
                <TableRow key={row.id!}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell align="center">
                    {/* {formatMontant(
                      budgetInitialList
                        .filter((bi: any) => bi.grant === row.id)
                        .reduce((acc, curr) => {
                          const totalLigneBudgetaire = (
                            curr.ligneBudgetaire ?? []
                          ).reduce((ligneAcc, ligneId) => {
                            const budgetLine = budgetLineList.find(
                              (bl: any) => bl.id === ligneId
                            );
                            return (
                              ligneAcc + (budgetLine ? budgetLine.amount! : 0)
                            );
                          }, 0);
                          return acc + totalLigneBudgetaire;
                        }, 0)
                    )} */}
                    {formatMontant(Number(row.amountMGA!))}
                  </TableCell>
                  <TableCell align="center">
                    {formatMontant(
                      Number(
                        periodelist
                          .filter((f: any) => f.grant == row.id)
                          .reduce((acc, curr) => acc + curr.montant!, 0)
                      )
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
                      row.amountMGA ??
                        0 -
                          (soldeBankByGrant[row.id!] !== undefined
                            ? soldeBankByGrant[row.id!]
                            : 0)
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="accent"
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
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            maxHeight: "80vh",
            width: "60vw",
          },
        }}
      >
        <DetailsDashboard handleClose={handleClose} getId={getId} />
      </Dialog>
    </Container>
  );
};

export default Dashboard;
