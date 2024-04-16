import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { createData } from "./table/techniques.function";
import { columns } from "./table/techniques.constant";

const Techniques = () => {
  const rows = [
    createData("Objectifs : 60%"),
    createData("Resultats attendus : 80%"),
    createData("Activités prévues : 50%"),
    createData("Livrables : 100%"),
    createData("Lieux : 50%"),
    createData("Missionnaires : 100%"),
    createData("Autres informations importantes : 100%"),
    createData("Contacts pendant la mission : 50%"),
    createData("Programmes : 50%"),
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
                  key={row.technique}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
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

export default Techniques;
