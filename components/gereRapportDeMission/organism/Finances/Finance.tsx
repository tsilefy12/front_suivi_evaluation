import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListRapportDepenses from "./tableRapportDesDepenses/ListRapportDepense";
import ListResumeDepense from "./tableResumeDepense/ListResumeDepense";
import ListCalculDesPilesRapport from "./tableCalculDesPile/ListCalculDesPile";
import ListCalculCarburantRapport from "../Logistique/tableCalculCarburant/ListCalculCarburant";
import ListBesoinVehiculeRapport from "../Logistique/tableBesoinVéhicules/ListBesoinVehicule";
import AddFile from "./rapportFinance/add/AddFile";

const Finances = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Rapport des dépenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListRapportDepenses />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Résumé de dépense réalisé</Typography>
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
          <Typography>Rapport financier</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddFile />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography>Besoin en véhicules</Typography> 
        </AccordionSummary>
        <AccordionDetails>
          <ListBesoinVehiculeRapport />
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
          <ListCalculCarburantRapport />
        </AccordionDetails>
      </Accordion> */}
    </>
  );
};

export default Finances;
