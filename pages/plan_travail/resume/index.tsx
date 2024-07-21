import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListResume from "../../../components/plan_travail/resume";

const Resume = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ListResume />
      </div>
    </BackOfficeLayout>
  );
};

export default Resume;
