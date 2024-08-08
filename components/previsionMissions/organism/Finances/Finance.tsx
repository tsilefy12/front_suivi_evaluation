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
    <>
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
          <Typography>Résumé de dépenses prévues</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListResumeDepense />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Calcul des piles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListCalculDesPiles />
        </AccordionDetails>
      </Accordion> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Besoin en véhicules</Typography>
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
          <Typography>Calcul des carburants</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListCalculCarburant />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Finances;
