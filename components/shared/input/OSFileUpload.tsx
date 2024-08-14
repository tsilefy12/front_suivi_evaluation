import styled from "@emotion/styled";
import { AttachFileOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useField, useFormikContext } from "formik";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const OSFileUpload = ({ name, label }: { name: string; label: string }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <Button
      variant="outlined"
      color="secondary"
      component="label"
      startIcon={<AttachFileOutlined />}
      sx={{ width: "100%" }}
    >
      {field.value ? field.value.name : label}
      <VisuallyHiddenInput
        onChange={(e) => {
          if (e.currentTarget.files) {
            setFieldValue(name, e.currentTarget.files[0]);
          }
        }}
        type="file"
        name={name}
      />
    </Button>
  );
};

export default OSFileUpload;
