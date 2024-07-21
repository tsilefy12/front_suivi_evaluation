import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../layouts/backOffice";
import GrantsList from "../../../components/grantsMonitoring";

const GrantsMonitoring = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <GrantsList />
      </div>
    </BackOfficeLayout>
  );
};

export default GrantsMonitoring;
