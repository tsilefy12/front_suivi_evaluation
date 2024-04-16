import React from "react";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../../shared/keyValue";

const Detail = () => {
  return (
    <FormContainer spacing={2}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <KeyValue keyName="Ref mission" value={"MISSION_001"} />
          <KeyValue keyName="Description" value={"Description de la mission"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <KeyValue keyName="Responsable" value={"Ollie Mc"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <KeyValue keyName="Gestionnaire de budget" value={"Anna"} />
        </Grid>
      </Grid>
    </FormContainer>
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
