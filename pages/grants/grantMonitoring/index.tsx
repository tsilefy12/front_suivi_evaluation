import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListGrantsMonitoring from "../../../components/grantsMonitoring/ListGrants";

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
