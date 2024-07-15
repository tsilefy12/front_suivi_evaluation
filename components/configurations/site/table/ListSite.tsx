import React from "react";
import { Order } from "./type-variable-devise";
import DataEtatMateriel from "./type-variable-devise";
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
import PosteAnalytiqueTableHeader from "../organisme/table/StatusTableHeader";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/router";
import useFetchSite from "../hooks/useFetchSite";
import { deleteSite } from "../../../../redux/features/site";
import { SiteItem } from "../../../../redux/features/site/site.interface";

const ListeSites = () => {
  const fetchSite = useFetchSite();
  const { sitelist } = useAppSelector((state) => state.site);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("");
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id }: any = router.query;

  React.useEffect(() => {
    fetchSite();
  }, [router.query]);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sitelist.length) : 0;

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le site",
      description: "Voulez-vous vraiment supprimer ?",
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
        await dispatch(deleteSite({ id }));
        fetchSite();
      })
      .catch(() => {});
  };

  const handleClickEdit = async (id: any) => {
    router.push(`/configurations/site/${id}/edit`);
  };
  return (
    <TableSection>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, padding: 2 }}>
          {/* <TableToolbarEtatMateriel numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <PosteAnalytiqueTableHeader />
              <TableBody>
                {sitelist
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((item) =>
                    `${item.lieu}`.toLowerCase().includes(filtre.toLowerCase())
                  )
                  .map((row: SiteItem, index: any) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow key={row.id}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="left"
                        >
                          {row.lieu}
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
            count={sitelist.length}
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

export default ListeSites;
