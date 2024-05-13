import React from "react";
import { Box, Button, Container, DialogContent, DialogTitle, IconButton, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
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

const DetailsDashboard = ({ handleClose, getId }: any) => {
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

  const uniqueValues: any = new Set()
  let grantBI: any = "";
  budgetLineList.forEach(element => {
    if (element.grantId == getId) {
      if (!uniqueValues.has(element.grantId)) {
        uniqueValues.add(element.grantId)
        return grantBI = grantEncoursList.find(e => e.id === getId)?.code
      }
    }
  });

  return (
    <Box sx={{ minWidth: "auto", maxWidth: "auto" }}>
      <DialogTitle>
        <SectionNavigation direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="h4" color="GrayText" marginLeft={4}>
            Budget engagé
          </Typography>
          <IconButton
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </SectionNavigation>
      </DialogTitle>
      <DialogContent>
        <BodySection>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 200 }}>
                  GRANT
                </TableCell>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                        LIGNE BUDGETAIRE
                      </TableCell>
                      <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                        BUDGET INITIAL
                      </TableCell>
                      <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                        BUDGET ENGAGE
                      </TableCell>
                      <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                        SOLDE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell rowSpan={budgetLineList.length} sx={{ width: 200 }}>
                  {grantBI}
                </TableCell>
                <Table>
                  <TableBody>

                    {
                      budgetLineList.filter(f => f.grantId == getId).map((row, index) => (
                        <TableRow>
                          <TableCell>
                            <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                              {row.code}
                            </TableCell>
                            <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                              {budgetInitialList.find(e => e.ligneBudgetaire == row.id)?.montant} Ar
                            </TableCell>
                            <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                              {budgetEngagedList.find(be => be.budgetLineId == row.id)?.amount} Ar
                            </TableCell>
                            <TableCell sx={{ minWidth: 250, maxWidth: 250 }}>
                              {(budgetInitialList.find(e => e.ligneBudgetaire == row.id)?.montant)! - budgetEngagedList.find(be => be.budgetLineId == row.id)?.amount!} Ar
                            </TableCell>
                          </TableCell>

                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableRow>
            </TableBody>
          </Table>
        </BodySection>
      </DialogContent>
    </Box>
  );
};

export default DetailsDashboard;
