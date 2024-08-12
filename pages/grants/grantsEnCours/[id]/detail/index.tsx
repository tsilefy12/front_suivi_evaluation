import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import DetailGrantsEncours from "../../../../../components/GrantsEnCours/[id]/detail/DetailGrantEncours";

const DetailGrantsEnCoursPage = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <DetailGrantsEncours />
      </Container>
    </BackOfficeLayout>
  );
};

export default DetailGrantsEnCoursPage;
