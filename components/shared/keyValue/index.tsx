import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type KeyValueProps = { keyName: string; value: string };

const KeyValue = ({ keyName, value }: KeyValueProps) => (
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
