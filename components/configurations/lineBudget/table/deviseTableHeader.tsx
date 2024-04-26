// import React from "react";
// // import DataEtatMateriel, { EnhancedTablePropsEtatMateriel } from "./type-variable-etatmateriel";
// import Box from "@mui/material/Box";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { visuallyHidden } from "@mui/utils";
// import { headCellsDevise } from "./constant-etatmateriel";
// import DataDevise, { EnhancedTablePropsDevise } from "./type-variable-devise";

// const PostaAnalytiqueTableHeader = (props: EnhancedTablePropsDevise) => {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler =
//     (property: keyof  DataDevise) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };
//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           {/* <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           /> */}
//         </TableCell>
//         {headCellsDevise.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={"left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// };

// export default PostaAnalytiqueTableHeader;
