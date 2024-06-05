import { Container } from "@mui/material";
import React from "react";
import ListGrantsMonitoring from "../../../../../components/grantsMonitoring/[id]/grantMoni/ListGrants";
import BackOfficeLayout from "../../../../../layouts/backOffice";

const GrantsMonitoring = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <ListGrantsMonitoring />
      </Container>
    </BackOfficeLayout>
  );
};

export default GrantsMonitoring;
