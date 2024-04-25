import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { organisationHeadCells } from "./OrganisationHeaderCell";
import { HeadCell } from "./HeadCell.interface";

const OrganisationTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{organisationHeadCells.map((headCell: HeadCell) => (
					<HeadCellComponent
						headCell={headCell}
						key={headCell.id}
					></HeadCellComponent>
				))}
				<TableCell></TableCell>
			</TableRow>
		</TableHead>
	);
};

export default OrganisationTableHeader;