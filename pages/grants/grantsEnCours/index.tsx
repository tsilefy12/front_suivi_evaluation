import { Container } from "@mui/material";
import React from "react";
import ListGrantsEnCours from "../../../components/GrantsEnCours/ListGrants";
import BackOfficeLayout from "../../../layouts/backOffice";

const GrantsEnCours = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListGrantsEnCours />
      </div>
    </BackOfficeLayout>
  );
};

export default GrantsEnCours;
