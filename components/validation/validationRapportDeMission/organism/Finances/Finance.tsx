import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListRapport from "./tableRapport/ListRapport";
import ListResumeDepense from "./tableResumeDepense/ListResumeDepense";

const Finances = () => {
  return (
    <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Rapport de dépenses</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListRapport />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Résumé de dépense prévus</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListResumeDepense />
            </AccordionDetails>
          </Accordion>
    </Box>
  );
};

export default Finances;
