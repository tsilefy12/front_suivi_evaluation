import {
  Button,
  Container,
  Dialog,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
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
} from "../../../../config/table.config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBack from "@mui/icons-material/ArrowBack";
import KeyValue from "../../../shared/keyValue";
import useFetchTacheCle from "./hooks/useFetchTacheEtObjectifs";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useConfirm } from "material-ui-confirm";
import useFetchProject from "../../../GrantsEnCours/hooks/getProject";
import { useRouter } from "next/router";
import useFetchEmploys from "../../../GrantsEnCours/hooks/getResponsable";
import { deleteTacheEtObjectifs, editTacheEtObjectifs } from "../../../../redux/features/tachesEtObjectifs";
import useFetchPlanTravaile from "../../hooks/useFetchPlanTravail";
import { getPlanTravail } from "../../../../redux/features/planTravail";
import Moment from "react-moment";

const ListTacheEtObjectifs = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("startDate");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fetchTacheCle: any = useFetchTacheCle()
  const { tacheEtObjectifList } = useAppSelector((state) => state.tacheEtObjectifs)
  const dispatch = useAppDispatch()
  const confirm = useConfirm()
  const fetchProject = useFetchProject()
  const router = useRouter()
  const fetchEmployes = useFetchEmploys()
  const { employees } = useAppSelector((state) => state.employe)
  const { id }: any = router.query;
  const [open, setOpen] = React.useState(false);
  const fetchPlanTravail = useFetchPlanTravaile()
  const { planTravaillist, planTravail } = useAppSelector((state) =>state.planTravail)

  React.useEffect(() => {
    fetchProject();
    fetchTacheCle();
    fetchEmployes();
    fetchPlanTravail();
    getPlanTravaile();
    getTache();
  }, [router.query])
 const getPlanTravaile = () =>{
  const args: any = {};
   dispatch(getPlanTravail({id, args}))
 }
 const getTache = () =>{
  const args: any = {};
    dispatch(getPlanTravail({id, args}))
  }
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClickOpen = () => {
    router.push(`/plan_travail/${id}/tachesEtObjectifs/add`)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.keyTasks);
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer tache clé",
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
        await dispatch(deleteTacheEtObjectifs({ id }));
        fetchTacheCle();
      })
      .catch(() => { });
  };

  const handleClickEdit = async (id: any) => {
    await dispatch(editTacheEtObjectifs({ id }))
    handleClickOpen()
  };
  return (
    <Container maxWidth="xl">
        {/* <NavigationContainer> */}
        <SectionNavigation direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            sx={{ mb: 2 }}>
            <Stack flexDirection={"row"}>
                <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Add />}
                    sx={{ marginInline: 3 }}
                    onClick={handleClickOpen}
                >
                    Créer
                </Button>
            </Stack>
            <Typography variant="h4" color="GrayText">
                Tâches et Objectifs
            </Typography>
        </SectionNavigation>
        {/* </NavigationContainer> */}
        <Divider />
        <FormContainer>
            <KeyValue
            keyName="Objectif Stratégique"
            value={tacheEtObjectifList.length!=0 ? planTravail.description! : ""}
            />
        </FormContainer>
        <BodySection>
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
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                    {tacheEtObjectifList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                        // const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                            hover
                            //   onClick={(event) => handleClick(event, row.reference)}
                            role="checkbox"
                            // aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            // selected={isItemSelected}
                            >
                            <TableCell
                                padding="checkbox"
                            // onClick={(event) => handleClick(event, row.tache)}
                            ></TableCell>
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                            >
                                {row.sn}
                            </TableCell>
                            <TableCell>
                                {row.keyTasks}
                            </TableCell>
                            <TableCell>
                                {row.statusId}
                            </TableCell>
                            <TableCell>
                                {row.responsableId}
                            </TableCell>
                            <TableCell>
                                <Moment format="DD/MM/YYYY">
                                    {row.startDate}
                                </Moment>
                            </TableCell>
                            <TableCell>
                                <Moment format="DD/MM/YYYY">
                                    {row.endDate}
                                </Moment>
                            </TableCell>
                            <TableCell align="right">
                                <BtnActionContainer
                                direction="row"
                                justifyContent="right"
                                >
                                <Link href={`/plan_travail/${id}/tachesEtObjectifs/${row.id}/details`}>
                                    <IconButton
                                    color="accent"
                                    aria-label="Details"
                                    component="span"
                                    >
                                    <VisibilityIcon />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    color="primary"
                                    aria-label="Modifier"
                                    component="span"
                                    onClick={() => handleClickEdit(row.id!)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="warning"
                                    aria-label="Supprimer"
                                    component="span"
                                    onClick={() => handleClickDelete(row.id!)}
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
        </BodySection>
    </Container>
  );
};

export default ListTacheEtObjectifs;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const BodySection = styled(Box)(({ }) => ({
  borderRadius: 20,
  backgroundColor: "white",
  marginBlock: 16,
}));
const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  border: `1px solid ${theme.palette.grey[100]}`,
  marginTop: 14,
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));
