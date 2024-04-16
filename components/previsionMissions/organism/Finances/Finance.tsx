import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Box, styled } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListPrevision from "./tablePrevision/ListPrevision";
import ListResumeDepense from "./tableResumeDepense/ListResumeDepense";
import ListCalculDesPiles from "./tableCalculDesPile/ListCalculDesPile";
import ListBesoinVehicule from "./tableBesoinVéhicules/ListBesoinVehicule";
import ListCalculCarburant from "./tableCalculCarburant/ListCalculCarburant";

const Finances = () => {
  return (
    <Box >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Prévision de dépenses</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListPrevision />
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Calcul des Piles</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListCalculDesPiles />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Besoin en Véhicules</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListBesoinVehicule />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Calcul des Carburants</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListCalculCarburant />
              </AccordionDetails>
            </Accordion>
    </Box>
  );
};

export default Finances;
