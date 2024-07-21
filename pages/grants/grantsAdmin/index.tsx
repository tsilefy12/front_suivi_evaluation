import { Container } from "@mui/material";
import React from "react";
import ListGrantsAdmin from "../../../components/grantsAdmin/ListGrants";
import BackOfficeLayout from "../../../layouts/backOffice";

const GrantsAdmin = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListGrantsAdmin />
      </div>
    </BackOfficeLayout>
  );
};

export default GrantsAdmin;
