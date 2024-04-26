import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { lineBudgetHeadCells } from "./LineBudgetHeaderCell";
import { HeadCell } from "./HeadCell.interface";

const LineBudgetTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{lineBudgetHeadCells.map((headCell: HeadCell) => (
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

export default LineBudgetTableHeader;