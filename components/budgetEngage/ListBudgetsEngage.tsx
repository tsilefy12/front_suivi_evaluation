import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Data, { Order } from "./table/type-variable";
import { rows } from "./table/constante";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import EnhancedTableHead from "./table/EnhancedTableHead";
import { getComparator, stableSort } from "./table/function";
import Add from "@mui/icons-material/Add";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../config/table.config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { BudgetEngagedItem } from "../../redux/features/budgetEngaged/budgetEngaged.interface";
import Moment from "react-moment";
import { deleteBudgetEngaged, editBudgedEngaged, getBudgetEngagedList } from "../../redux/features/budgetEngaged/budgetEngagedSlice";
import { getBudgetLineList } from "../../redux/features/budgetLine";
import { getGrantEncoursList } from "../../redux/features/grantEncours";
import { Delete, Edit } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import useFetchBudgetEngaged from "./hooks/useFetchBudgetEngaged";
import { useRouter } from "next/router";

const ListBudgetEngage = () => {
    const router = useRouter();

    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("grants");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { budgetEngagedList } = useAppSelector((state) => state.budgetsEngaged);
    const dispatch = useAppDispatch();

    const { grantEncoursList } = useAppSelector( (state) => state.grantEncours);
    const { budgetLineList } = useAppSelector( (state) => state.budgetLine);
    const fetchBudgetEngagedList = useFetchBudgetEngaged()
    const fetchUtilsData = () => {
        dispatch(getGrantEncoursList({}));
        dispatch(getBudgetLineList({}));
        fetchBudgetEngagedList()
    };

    useEffect(() => {
        fetchUtilsData();
    }, []);
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.date);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
        );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const confirm = useConfirm();
    const handleClickDelete = (id:any) => {
        try {
            confirm({
                title: "Supprimer le budget engagés",
                description: "Voulez-vous vraiment supprimer ce budget engagé ?",
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
                    await dispatch(deleteBudgetEngaged({id}));
                    fetchBudgetEngagedList()
                })
                .catch(() => {});

        } catch (error) {
            console.error(error)
        }
    }

    const handleClickEdit = (id:any)=>{
        try {
            dispatch(editBudgedEngaged({id}));
            router.push(`/grants/budgetEngage/${id}/edit`);
        } catch (error) {
            console.error(error)
        }
    }
    
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Container maxWidth="xl">

            <SectionNavigation
            direction="row"
            justifyContent="space-between"
            mb={2}
            >
            <Stack flexDirection={"row"}>
            <Link href="/grants/budgetEngage/add">
                <Button variant="contained" startIcon={<Add />}>
                Créer
                </Button>
            </Link>
                </Stack>
            <Typography variant="h4" color="GrayText">
                Budget Engagés
            </Typography>
            </SectionNavigation>
        <SectionTable sx={{backgroundColor: '#fff'}} >
            <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                >
                    <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    />
                    <TableBody>
                    {budgetEngagedList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row : BudgetEngagedItem, index :any) => {
                        const isItemSelected = isSelected(index);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                            hover
                            //   onClick={(event) => handleClick(event, row.reference)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            >
                                <TableCell
                                    padding="checkbox"
                                    // onClick={(event) => handleClick(event, row?.date)}
                                ></TableCell>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    <Moment format="DD/MM/YYYY">
                                    {row?.date}
                                    </Moment>
                                </TableCell>
                                <TableCell align="right">{grantEncoursList.find((e) => e.id == row.grantsId)?.code}</TableCell>
                                <TableCell align="right">{budgetLineList.find((e) => e.id == row.budgetLineId)?.code}</TableCell>
                                <TableCell align="right">{row.libelle}</TableCell>
                                <TableCell align="right">{row?.amount}</TableCell>
                                <TableCell align="right" width={"150px"}>
                                    <BtnActionContainer
                                        direction="row"
                                        justifyContent="right"
                                    >
                                    <IconButton
                                        color="primary"
                                        aria-label="Modifier"
                                        component="span"
                                        size="small"
                                        onClick={() => {
                                            handleClickEdit(row?.id);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="warning"
                                        aria-label="Supprimer"
                                        component="span"
                                        size="small"
                                        onClick={() => {
                                            handleClickDelete(row?.id);
                                        }}
                                    >
                                        <Delete />
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
                count={rows.length}
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
        </SectionTable>
        </Container>
    );
};

export default ListBudgetEngage;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));
