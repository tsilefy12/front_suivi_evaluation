import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

const OSTextField = ({ name, variant, ...otherProps }: any) => {
  const [field, meta] = useField(name);

  const configTextField = {
    fullWidth: true,
    variant: "" ? "outlined" : variant,
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default OSTextField;
