import { Container } from "@mui/material";
import React from "react";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import DetailGrantsAdmin from "../../../../../components/grantsAdmin/[id]/detail/DetailGrantsEnCours";

const DetailGrantsAdmins = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <DetailGrantsAdmin />
      </div>
    </BackOfficeLayout>
  );
};

export default DetailGrantsAdmins;
