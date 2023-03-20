import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { createData } from "./lists/table/finances.function";
import { columns } from "./lists/table/finances.constant";
import { Accordion, AccordionSummary, Box, Typography,AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListRapports from "./lists/ListRapports";



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
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>Rapport des depenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ListRapports />
        </AccordionDetails>
        </Accordion>
      
    </Box>
  );
};

export default Finances;
