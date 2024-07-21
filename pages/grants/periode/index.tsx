import { Container } from "@mui/material";
import React from "react";
import ListPeriodeGrants from "../../../components/periode/ListPeriodeGrants";
import BackOfficeLayout from "../../../layouts/backOffice";

const PeriodeGrants = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListPeriodeGrants />
      </div>
    </BackOfficeLayout>
  );
};

export default PeriodeGrants;
