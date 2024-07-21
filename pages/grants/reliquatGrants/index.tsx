import { Container } from "@mui/material";
import React from "react";
import ListReliquetsGrants from "../../../components/reliquetGrant/ListReliquetsGrants";
import BackOfficeLayout from "../../../layouts/backOffice";

const ReliquantGrants = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListReliquetsGrants />
      </div>
    </BackOfficeLayout>
  );
};

export default ReliquantGrants;
