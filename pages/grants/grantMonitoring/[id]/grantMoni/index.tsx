import { Container } from "@mui/material";
import React from "react";
import ListGrantsMonitoring from "../../../../../components/grantsMonitoring/[id]/grantMoni/ListGrants";
import BackOfficeLayout from "../../../../../layouts/backOffice";

const GrantsMonitoring = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListGrantsMonitoring />
      </div>
    </BackOfficeLayout>
  );
};

export default GrantsMonitoring;
