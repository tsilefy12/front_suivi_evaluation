import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { createData } from "./table/finances.function";
import { columns } from "./table/finances.constant";
import { useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import formatMontant from "../../../../../../hooks/format";
import useFetchResumeDepenseList from "../../../../../previsionMissions/organism/Finances/tableResumeDepense/hooks/useFetchResumeDepense";
import useFetchResumeDepensePrevue from "../../../../../gereRapportDeMission/organism/Finances/tableResumeDepense/hooks/useFetchResumeDepensePrevue";
import useFetchCalculCarburantList from "../../../../../previsionMissions/organism/Logistique/tableCalculCarburant/hooks/useFetchCarbuant";
import useFetchCalculCarburantRapportList from "../../../../../gereRapportDeMission/organism/Logistique/tableCalculCarburant/hooks/useFetchCarbuant";

const Finances = () => {
  const router = useRouter();
  const fetchPrevisionDepense = useFetchResumeDepenseList();
  const fetchcalculCarburantRapport = useFetchCalculCarburantRapportList();
  const fetchCalculCarburant = useFetchCalculCarburantList();
  const { totalDepensePrevue, totalDepenseRapport, totalCarburant, montant } =
    Montant();
  const fetchRapportDepense = useFetchResumeDepensePrevue();
  React.useEffect(() => {
    fetchPrevisionDepense();
    fetchRapportDepense();
    fetchCalculCarburant();
    fetchcalculCarburantRapport();
  }, [router.query]);

  const rows = [
    createData(
      "Dépense prévue pendant la mission : " +
        formatMontant(Number(totalDepensePrevue))
    ),
    createData(
      "Dépense dans le rapport : " + formatMontant(Number(totalDepenseRapport))
    ),
    createData("Différence: " + formatMontant(Number(montant))),
    createData("Carburant pendant la mission : " + totalCarburant + " L"),
  ];

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow hover tabIndex={-1}>
              <TableCell colSpan={3}>
                Comparaison des prévisions techniques par rapport aux rapport de
                mission
              </TableCell>
            </TableRow>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.finance}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}{" "}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Finances;

export const Montant = () => {
  const router = useRouter();
  const { id } = router.query;
  const { resumeDepenseList } = useAppSelector((state) => state.resumeDepense);
  const { resumeDepensePrevueList } = useAppSelector(
    (state) => state.resumeDepensePrevue
  );
  const { calculCarburantList } = useAppSelector(
    (state) => state.calculCarburant
  );

  const { calculCarburantRapportList } = useAppSelector(
    (state) => state.calculCarburantRapport
  );

  let totalDepensePrevue: any = useMemo(() => {
    let totalBudget: any = 0;
    resumeDepenseList
      .filter((f: any) => f.missionId == id)
      .map((item) => {
        totalBudget += parseInt(item.budgetDepense);
      });
    return totalBudget;
  }, [resumeDepenseList]);

  let totalDepenseRapport: any = useMemo(() => {
    let totalBudget: any = 0;
    resumeDepensePrevueList
      .filter((f: any) => f.missionId === id)
      .forEach((item: any) => {
        totalBudget += parseInt(item.budgetDepense);
      });
    return totalBudget;
  }, [resumeDepensePrevueList]);

  let montant: any = useMemo(() => {
    let calcul = totalDepensePrevue - totalDepenseRapport;
    return calcul;
  }, [totalDepensePrevue, totalDepenseRapport]);

  const calculCarburant = useMemo(() => {
    let calcul = 0;
    calculCarburantList
      .filter((c: any) => c.missionId === id)
      .map((c: any) => {
        calcul += c.totalCarburant;
      });
    return calcul;
  }, [calculCarburantList]);

  const calculCarburantRapport = useMemo(() => {
    let calcul = 0;
    calculCarburantRapportList
      .filter((c: any) => c.missionId === id)
      .map((c: any) => {
        calcul += c.totalCarburant;
      });
    return calcul;
  }, [calculCarburantRapportList]);

  const totalCarburant = useMemo(() => {
    let calcul = calculCarburant - calculCarburantRapport;
    return calcul;
  }, [calculCarburant, calculCarburantRapport]);

  return {
    totalDepensePrevue,
    totalDepenseRapport,
    totalCarburant,
    montant,
  };
};
