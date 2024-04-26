import React from "react";
import { Box, Checkbox, IconButton, Paper, styled, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../config/table.config";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import TypeTableHeader from "../organisme/table/LineBudgetTableHeader";
import { LineBudgetItem } from "../../../../redux/features/lineBudget/lineBudget.interface";
import { useConfirm } from "material-ui-confirm";
import { deleteLineBudget, getLineBudget } from "../../../../redux/features/lineBudget";
import { cancelEdit } from "../../../../redux/features/lineBudget/lineBudgetSlice";
import { useRouter } from "next/router";

const ListLineBudget = () => {
  const { lineBudgetList } = useAppSelector((state) =>state.lineBudget);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id }: any = router.query;

  React.useEffect(() =>{
      dispatch(getLineBudget({}))
  }, [lineBudgetList])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lineBudgetList.length) : 0;



  const handleClickDelete = async (id: any) => {
    dispatch(cancelEdit())
    confirm({
      title: "Supprimer le ligne de budget",
      description: "Voulez-vous vraiment supprimer ce ligne de budget ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deleteLineBudget({ id }));
        await dispatch(getLineBudget({}));
      })
      .catch(() => {});
  };
  
  const handleClickEdit = async (id: any) => {
    router.push(`/configurations/lineBudget/${id}/edit`);
  };
  return (
    <TableSection>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <TableToolbarEtatMateriel numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <TypeTableHeader />
              <TableBody>
                { lineBudgetList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: LineBudgetItem, index: any) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                      key={row.id}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="left"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          <BtnActionContainer
                            direction="row"
                            justifyContent="flex-end"
                          >
                            <IconButton
                              color="primary"
                              aria-label="Modifier"
                              component="span"
                              size="small"
                              onClick={() => {
                                handleClickEdit(row.id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="warning"
                              aria-label="Supprimer"
                              component="span"
                              onClick={() => {
                                handleClickDelete(row.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </BtnActionContainer>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={lineBudgetList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={defaultLabelDisplayedRows}
          />
        </Paper>
        {/* <FormControlLabel
    control={<Switch checked={dense} onChange={handleChangeDense} />}
    label="Dense padding"
    /> */}
      </Box>
    </TableSection>
  );
};

const TableSection = styled("div")(({ theme }) => ({
  paddingBlock: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));

const BtnActionContainer = styled(Stack)(({ theme }) => ({}));

export default ListLineBudget;
