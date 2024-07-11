import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
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
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import useBasePath from "../../../hooks/useBasePath";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useFetchBudgetLine from "../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchBudgetEngaged from "../../budgetEngage/hooks/useFetchBudgetEngaged";
import useFetchReliquatGrant from "../../reliquetGrant/hooks/useFetchEliquatGrant";
import useFetchBudgetInitial from "../../budgetInitial/hooks/useFetchBudgetInitial";
import { Add, Close } from "@mui/icons-material";
import formatMontant from "../../../hooks/format";
import useFetchPeriode from "../../periode/hooks/useFetchPeriode";
import useFetchCaisee from "../../reliquetGrant/hooks/useFetchCaisse";
import useFetchGrantMonitoring from "../hooks/useFetchGrantMonitorings";
import { GrantMonitoringItem } from "../../../redux/features/grantMonitoring/grantMonitoring.interface";

const DetailsDashboard = ({ handleClose, getId }: any) => {
  const basePath = useBasePath();
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);
  const { caisselist } = useAppSelector((state: any) => state.reliquatGrant);
  const fetchCaisse = useFetchCaisee();
  const fetchGrantMonitorings = useFetchGrantMonitoring();
  const { grantMonitoringlist } = useAppSelector(
    (state) => state.grantMonitoring
  );
  useEffect(() => {
    fetchGrants();
    fetchBudgetInitial();
    fetchBudgetLine();
    fetchPeriode();
    fetchCaisse();
    fetchGrantMonitorings();
  }, [router.query]);

  const [grantBI, setGrantBI] = useState("");

  useEffect(() => {
    const grant = grantEncoursList.find((e) => e.id === getId);
    if (grant) {
      setGrantBI(grant.code!);
    }
  }, [grantEncoursList, getId]);

  return (
    <div>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="h4"
            color="GrayText"
            marginLeft={4}
            marginTop={2}
          >
            Liste détaillée du budget engagé
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{
            width: "auto",
            overflowX: "auto",
            minHeight: "auto",
            maxHeight: "calc(100vh - 250px)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120, maxWidth: 120 }} align="center">
                  GRANT
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="center">
                  LIGNE BUDGETAIRE
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="center">
                  BUDGET TOTAL
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="center">
                  PERIODES
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="center">
                  BUDGET ENGAGE
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }} align="center">
                  SOLDE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgetLineList
                .filter((bl) => bl.grantId === getId)
                .map((row, index) => (
                  <TableRow key={index}>
                    {index === 0 && (
                      <TableCell
                        rowSpan={budgetLineList.length}
                        sx={{ minWidth: 120, maxWidth: 120 }}
                        align="center"
                      >
                        {grantBI}
                      </TableCell>
                    )}
                    <TableCell
                      sx={{ minWidth: 160, maxWidth: 160 }}
                      align="center"
                    >
                      {row.code}
                    </TableCell>
                    <TableCell
                      sx={{ minWidth: 160, maxWidth: 160 }}
                      align="center"
                    >
                      {formatMontant(Number(row.amount))}
                    </TableCell>
                    <TableCell
                      sx={{ minWidth: 160, maxWidth: 160 }}
                      align="center"
                    >
                      {formatMontant(
                        Number(
                          grantMonitoringlist
                            .filter(
                              (gm: GrantMonitoringItem) =>
                                gm.ligneBudgetaire == row.id
                            )
                            .reduce((acc, curr) => acc + curr.montant!, 0)
                        )
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ minWidth: 160, maxWidth: 160 }}
                      align="center"
                    >
                      {formatMontant(
                        Number(
                          caisselist
                            .filter((c: any) => c.budgetLineId == row.id)
                            .reduce(
                              (acc: any, curr: any) =>
                                acc + (curr.debit! - curr.credit!),
                              0
                            )
                        )
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ minWidth: 160, maxWidth: 160 }}
                      align="center"
                    >
                      {formatMontant(
                        Number(
                          row.amount! -
                            caisselist
                              .filter((c: any) => c.budgetLineId == row.id)
                              .reduce(
                                (acc: any, curr: any) =>
                                  acc + (curr.debit! - curr.credit!),
                                0
                              )
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};

export default DetailsDashboard;
