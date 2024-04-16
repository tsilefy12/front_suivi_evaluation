import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Box, Stack, styled } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListObjectif from "./tableObjectif/organisme/ListObjectif";
import ListResultatAttendu from "./tableResultatAttendu/organisme/ListResultatAttendu";
import ListActivitesPrevues from "./tableActivitésPrévues/organisme/ListActivitesPrevues";
import ListLivrables from "./tableLivrables/organisme/ListLivrables";
import ListLieux from "./tableLieux/organisme/ListLieux";
import ListAutreInfoAuto from "./tableAutreInfoAuto/organisme/ListAutreInfoAuto";
import ListContactPendantMission from "./tableContactPendantMission/organisme/ListContactPendantMission";
import ListProgrammes from "./tableProgramme/organisme/ListProgrammes";

const Techniques = () => {
  return (
    <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Objectifs</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListObjectif />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Resultats attendus</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListResultatAttendu />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Activités prévues</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListActivitesPrevues />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Livrables</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListLivrables />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Lieux</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListLieux />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Missionnaire</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListLieux />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Autres informations importantes (véhicules utilisés)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListAutreInfoAuto />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Contacts pendant la mission</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListContactPendantMission />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Programmes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListProgrammes />
            </AccordionDetails>
          </Accordion>
    </Box>
  );
};

export default Techniques;
