import React from "react";
import { useField, useFormikContext } from "formik";
import { TextField, MenuItem } from "@mui/material";

const OSSelectField = ({
  name,
  valueKey,
  dataKey,
  separator,
  options,
  ...otherProps
}: {
  name: string;
  valueKey: string;
  dataKey: string | string[];
  separator?: string;
  options: any[];
  [key: string]: any;
}) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const configSelect: any = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  const selectOptions = () => {
    if (Array.isArray(dataKey)) {
      return options.map((option: any, index) => {
        const labelArray = dataKey.map((key: string) => option[key]);
        const label = labelArray.join(separator);
        return (
          <MenuItem key={index} value={option[valueKey]}>
            {label}
          </MenuItem>
        );
      });
    }
    return options.map((option: any, index) => {
      const label = option[dataKey];
      return (
        <MenuItem key={index} value={option[valueKey]}>
          {label}
        </MenuItem>
      );
    });
  };

  return <TextField {...configSelect}>{selectOptions()}</TextField>;
};

// component default props
OSSelectField.defaultProps = {
  separator: " ",
};

export default OSSelectField;
