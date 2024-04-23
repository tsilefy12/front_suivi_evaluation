import React from "react";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../../../../../../components/shared/keyValue";
import DetailGrantsEnCours from "../../../../../../components/plan_travail/organanisme/tachesCles/[idT]/details";
import BackOfficeLayout from "../../../../../../layouts/backOffice";

const Detail = () => {
    return (
        <BackOfficeLayout>
            <DetailGrantsEnCours />
        </BackOfficeLayout>
    );
};

export default Detail;

const FormContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    marginBottom: theme.spacing(3),
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    border: `1px solid ${theme.palette.grey[100]}`,
}));
