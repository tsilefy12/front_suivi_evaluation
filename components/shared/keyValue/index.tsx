import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const KeyValue = ({ keyName, value }: any) => (
  <Stack direction={"row"} spacing={2}>
    <Typography variant="body1" color="secondary">
      {keyName} :{" "}
    </Typography>
    <Typography variant="body1" color="gray">
      {value}
    </Typography>
  </Stack>
);

export default KeyValue;
