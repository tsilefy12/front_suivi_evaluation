import { Container } from "@mui/material";
import React from "react";
import ListTacheCles from "../../../../components/plan_travail/organanisme/tachesEtObjectifs/ListTacheEtObjectifs";
import BackOfficeLayout from "../../../../layouts/backOffice";

const TacheCles = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListTacheCles />
      </div>
    </BackOfficeLayout>
  );
};

export default TacheCles;
