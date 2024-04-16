import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { createData } from "./table/finances.function";
import { columns } from "./table/finances.constant";

const Finances = () => {
  const rows = [
    createData("Dépense prévue pendant la mission : 10 200 000 Ariary"),
    createData("Dépense dans le rapport : 10 000 000 Ariary"),
    createData("Différence: 200 000 Ariary"),
    // createData("Livrables : 100%"),
    // createData("Lieux : 50%"),
    // createData("Missionnaires : 100%"),
    // createData("Autres informations importantes : 100%"),
    // createData("Contacts pendant la mission : 50%"),
    // createData("Programmes : 50%"),
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

export default Finances;
