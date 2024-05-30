import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import DetailsMission from "../../../../components/home/Missions/[id]/details";

const DetailsM = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <DetailsMission />
      </Container>
    </BackOfficeLayout>
  );
};

export default DetailsM;
