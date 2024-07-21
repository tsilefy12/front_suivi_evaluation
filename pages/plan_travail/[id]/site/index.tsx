import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import ListSite from "../../../../components/plan_travail/organanisme/site";

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListSite />
      </div>
    </BackOfficeLayout>
  );
};

export default AddGrantsEnCours;
