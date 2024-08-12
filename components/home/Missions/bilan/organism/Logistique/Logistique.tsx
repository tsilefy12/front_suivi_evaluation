import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchCalculCarburantList from "../../../../../previsionMissions/organism/Logistique/tableCalculCarburant/hooks/useFetchCarbuant";
import useFetchCalculCarburantRapportList from "../../../../../gereRapportDeMission/organism/Logistique/tableCalculCarburant/hooks/useFetchCarbuant";
import { createData } from "./table/logistic.function";
import { columns } from "./table/logistic.constant";

const Logistiques = () => {
  const router = useRouter();
  const fetchcalculCarburantRapport = useFetchCalculCarburantRapportList();
  const fetchCalculCarburant = useFetchCalculCarburantList();
  const { totalCarburant } = Carburant();
  React.useEffect(() => {
    fetchCalculCarburant();
    fetchcalculCarburantRapport();
  }, [router.query]);

  const rows = [
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.logistic}
                >
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

export default Logistiques;

export const Carburant = () => {
  const router = useRouter();
  const { id } = router.query;
  const { calculCarburantList } = useAppSelector(
    (state) => state.calculCarburant
  );

  const { calculCarburantRapportList } = useAppSelector(
    (state) => state.calculCarburantRapport
  );

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
    totalCarburant,
  };
};
