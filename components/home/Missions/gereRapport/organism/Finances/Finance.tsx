import React from "react";
import { Accordion, AccordionSummary, Box, Typography,AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListRapports from "./rapport/ListRapports";
import ListResume from "./resume/ListResume";



const Finances = () => {

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
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>Resume de depense prevus</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ListResume />
            </AccordionDetails>
        </Accordion>
      
    </Box>
  );
};

export default Finances;
