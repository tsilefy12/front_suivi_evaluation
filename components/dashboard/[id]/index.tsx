import React from "react";
import { Button, Container, DialogContent, DialogTitle, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import useBasePath from "../../../hooks/useBasePath";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchBudgetLine from "../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchBudgetEngaged from "../../budgetEngage/hooks/useFetchBudgetEngaged";
import useFetchReliquatGrant from "../../reliquetGrant/hooks/useFetchEliquatGrant";
import useFetchBudgetInitial from "../../budgetInitial/hooks/useFetchBudgetInitial";
import { SectionNavigation } from "../../home";
import { BodySection } from "../../gereRapportDeMission/GereRapportDeMission";
import { Add, ArrowBack, Close } from "@mui/icons-material";

const DetailsDashboard = ({ handleClose, getId}: any) => {
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
            <DialogTitle>
                <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
                        <Button
                            color="warning"
                            variant="contained"
                            startIcon={<Close />}
                            onClick={handleClose}
                        >
                            Fermer
                        </Button>
                    <Typography variant="h4" color="GrayText">
                        Dashboard details list
                    </Typography>
                </SectionNavigation>
            </DialogTitle>
            <DialogContent>
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
                                budgetLineList.filter(f =>f.grantId == getId).map(row => (
                                    <TableRow key={row.id!}>
                                        <TableCell>
                                            {grantEncoursList.find(g => g.id === row.grantId)?.code}
                                        </TableCell>
                                        <TableCell>
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="center">
                                            {budgetInitialList.find(e => e.ligneBudgetaire == row.id)?.montant} Ar
                                        </TableCell>
                                        <TableCell align="center">
                                            {budgetEngagedList.find(be => be.budgetLineId == row.id)?.amount} Ar
                                        </TableCell>
                                        <TableCell align="center">
                                            {(budgetInitialList.find(e => e.ligneBudgetaire == row.id)?.montant)! - budgetEngagedList.find(be => be.budgetLineId == row.id)?.amount!} Ar
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </BodySection>
            </DialogContent>
        </Container>
    );
};

export default DetailsDashboard;
