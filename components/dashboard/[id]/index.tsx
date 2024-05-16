import React, { Fragment } from "react";
import {
  Box,
  Button,
  Container,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
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
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const fetchBudgetEngagedList = useFetchBudgetEngaged();
  const { budgetEngagedList } = useAppSelector((state) => state.budgetsEngaged);
  const fetchtReliquatGrant = useFetchReliquatGrant();
  const { reliquatGrantList } = useAppSelector((state) => state.reliquatGrant);
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);

  React.useEffect(() => {
    fetchBudgetEngagedList();
    fetchGrants();
    fetchtReliquatGrant();
    fetchBudgetInitial();
    fetchBudgetLine();
  }, [router.query]);

  const uniqueValues: any = new Set();
  let grantBI: any = "";
  budgetLineList.forEach((element) => {
    if (element.grantId == getId) {
      if (!uniqueValues.has(element.grantId)) {
        uniqueValues.add(element.grantId);
        grantBI = grantEncoursList.find((e) => e.id === getId)?.code;
      }
    }
  });

  return (
    <div>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h4" color="GrayText" marginLeft={4} marginTop={2}>
            Budget engagé
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ width: "auto", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120, maxWidth: 120 }}>GRANT</TableCell>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                        LIGNE BUDGETAIRE
                      </TableCell>
                      <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                        BUDGET INITIAL
                      </TableCell>
                      <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                        BUDGET ENGAGE
                      </TableCell>
                      <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="left">
                        SOLDE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  rowSpan={budgetLineList.length}
                  sx={{ minWidth: 120, maxWidth: 120 }}
                >
                  {grantBI}
                </TableCell>
                <Table>
                  <TableBody>
                    {budgetLineList
                      .filter((f) => f.grantId == getId)
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="left">
                              {row.code}
                            </TableCell>
                            <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="center">
                              {budgetInitialList.find(
                                (e) => e.ligneBudgetaire == row.id
                              )?.montant}{" "}
                              Ar
                            </TableCell>
                            <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="center">
                              {budgetEngagedList.find(
                                (be) => be.budgetLineId == row.id
                              )?.amount}{" "}
                              Ar
                            </TableCell>
                            <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="left">
                              {(
                                budgetInitialList.find(
                                  (e) => e.ligneBudgetaire == row.id
                                )?.montant! -
                                budgetEngagedList.find(
                                  (be) => be.budgetLineId == row.id
                                )?.amount!
                              ).toFixed(2)}{" "}
                              Ar
                            </TableCell>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};

export default DetailsDashboard;
