import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { createData } from "./table/finances.function";
import { columns } from "./table/finances.constant";
import useFetchPrevisionDepenseList from "../../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchPrevisionDepense";
import { useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchRapportDepense from "../../../../../gereRapportDeMission/organism/Finances/tableRapportDesDepenses/hooks/useFetchRapportDepense";


const Finances = () => {
  const router = useRouter();
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const {totalPrevision, totalRappport, montant } = Montant()
  const fetchRapportDepense = useFetchRapportDepense();
  React.useEffect(() =>{
    fetchPrevisionDepense();
    fetchRapportDepense();
  }, [router.query])


  const rows = [
    createData("Dépense prévue pendant la mission : "+totalPrevision),
    createData("Dépense dans le rapport : "+totalRappport),
    createData("Différence: "+montant),
  ];

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow hover tabIndex={-1}>
              <TableCell colSpan={3}>
              Comparaison des prévisions techniques par rapport aux rapport de mission
              </TableCell>
            </TableRow>
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.finance}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value} Ariary
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

export const Montant = () =>{
  const { previsionDepenselist}: any = useAppSelector((state: any) => state.previsonDepense);
  const { rapportDepenseList } = useAppSelector((state: any) => state.rapportDepense);
  let totalPrevision: any = useMemo(() => {
    let totalBudget: any = 0;
    previsionDepenselist.map((p: any) =>{
      if (p.imprevue===null) {
        totalBudget += p.montant;
      }
    })
    return totalBudget;
  }, [previsionDepenselist])

  
  let totalRappport: any = useMemo(() => {
    let totalBudget: any = 0;
    rapportDepenseList.forEach((item: any) => {
      totalBudget += item.montant;
    })
    return totalBudget;
  }, [rapportDepenseList])
  let montant: any = useMemo(() =>{
    let calcul = totalPrevision - totalRappport;
    return calcul;
  },[totalPrevision, totalRappport])

  return {
    totalPrevision,
    totalRappport,
    montant
  }
}