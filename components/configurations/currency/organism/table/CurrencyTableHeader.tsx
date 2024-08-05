import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HeadCellComponent from "./HeadCellComponent";
import { currencyheadCells } from "./CurrencyHeaderCell";
import { CurrencyHeadCell } from "./HeadCell.interface";

const CurrencyTableHeader = () => {
	return (
		<TableHead>
			<TableRow>
				{currencyheadCells.map((headCell: CurrencyHeadCell) => (
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

export default CurrencyTableHeader;
