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
  const fetchReliquatGrant = useFetchReliquatGrant();
  const { reliquatGrantList } = useAppSelector((state) => state.reliquatGrant);
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);

  useEffect(() => {
    fetchBudgetEngagedList();
    fetchGrants();
    fetchReliquatGrant();
    fetchBudgetInitial();
    fetchBudgetLine();
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
            Budget engagé
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ width: "auto", overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 120, maxWidth: 120 }}>
                  GRANT
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                  LIGNE BUDGETAIRE
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                  BUDGET INITIAL
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                  BUDGET ENGAGE
                </TableCell>
                <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
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
                      >
                        {grantBI}
                      </TableCell>
                    )}
                    <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                      {row.code}
                    </TableCell>
                    <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                      {budgetInitialList
                        .filter((bi) =>
                          bi.ligneBudgetaire!.includes(Number(row.id))
                        )
                        .reduce((total, bi) => {
                          const budgetLine = budgetLineList.find(
                            (bl) => bl.id === row.id
                          );
                          return total + (budgetLine ? budgetLine.amount! : 0);
                        }, 0)}
                    </TableCell>
                    <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                      {budgetEngagedList.find(
                        (be) => be.budgetLineId === row.id
                      )?.amount ?? 0}{" "}
                      Ar
                    </TableCell>
                    <TableCell sx={{ minWidth: 160, maxWidth: 160 }}>
                      {budgetInitialList
                        .filter((bi) =>
                          bi.ligneBudgetaire!.includes(Number(row.id))
                        )
                        .reduce((total, bi) => {
                          const budgetLine = budgetLineList.find(
                            (bl) => bl.id === row.id
                          );
                          return total + (budgetLine ? budgetLine.amount! : 0);
                        }, 0) -
                        (budgetEngagedList.find(
                          (be) => be.budgetLineId === row.id
                        )?.amount ?? 0)}{" "}
                      Ar
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
