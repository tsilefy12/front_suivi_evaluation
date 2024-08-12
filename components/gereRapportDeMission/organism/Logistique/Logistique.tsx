import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListbesoinVehiculeRapportRapport from "./tableBesoinVéhicules/ListBesoinVehicule";
import ListcalculCarburantRapport from "./tableCalculCarburant/ListCalculCarburant";

const Logistiques = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Besoin en véhicules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListbesoinVehiculeRapportRapport />
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
          <ListcalculCarburantRapport />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Logistiques;
