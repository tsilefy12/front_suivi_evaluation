import {
  Button,
  Container,
  Dialog,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import {
  deleteTacheEtObjectifs,
  editTacheEtObjectifs,
} from "../../../../redux/features/tachesEtObjectifs";
import useFetchPlanTravaile from "../../hooks/useFetchPlanTravail";
import { getPlanTravail } from "../../../../redux/features/planTravail";
import Moment from "react-moment";
import { getStatuslist } from "../../../../redux/features/status";
import { TacheEtObjectifItem } from "../../../../redux/features/tachesEtObjectifs/tacheETObjectifs.interface";
import useFetchStagiaire from "../../../GrantsEnCours/hooks/getStagiaire";
import useFetchPrestataire from "../../../GrantsEnCours/hooks/getPrestataire";
import { CloturePTAItem } from "../../../../redux/features/cloturePTA/cloturePTA.interface";

const ListTacheEtObjectifs = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [selectYear, setSelectYear] = useState<number>(
    new Date().getFullYear()
  );
  const [orderBy, setOrderBy] = React.useState<keyof Data>("startDate");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("");
  const fetchTacheCle: any = useFetchTacheCle();
  const { tacheEtObjectifList } = useAppSelector(
    (state) => state.tacheEtObjectifs
  );
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const fetchProject = useFetchProject();
  const router = useRouter();
  const fetchEmployes = useFetchEmploys();
  const { employees } = useAppSelector((state) => state.employe);
  const { id }: any = router.query;
  const [open, setOpen] = React.useState(false);
  const fetchPlanTravail = useFetchPlanTravaile();
  const { planTravaillist, planTravail } = useAppSelector(
    (state) => state.planTravail
  );
  const { statuslist } = useAppSelector((state: any) => state.status);
  const fetchStagiaire = useFetchStagiaire();
  const { interns } = useAppSelector((state: any) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );

  React.useEffect(() => {
    fetchProject();
    fetchTacheCle();
    fetchEmployes();
    fetchPlanTravail();
    getPlanTravaile();
    getTache();
    fetchStagiaire();
    fetchPrestataire();
    dispatch(getStatuslist({}));
  }, [router.query]);

  const getPlanTravaile = () => {
    const args: any = {};
    dispatch(getPlanTravail({ id, args }));
  };
  const getTache = () => {
    const args: any = {};
    dispatch(getPlanTravail({ id, args }));
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClickOpen = () => {
    router.push(`/plan_travail/${id}/tachesEtObjectifs/add`);
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
      title: "Supprimer tâche clé",
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
      .catch(() => {});
  };

  const handleClickEdit = async (id: string) => {
    await dispatch(editTacheEtObjectifs({ id }));
  };
  const [data, setData] = React.useState<any[]>([]);
  useEffect(() => {
    if (filtre === "") {
      setData(
        [
          ...tacheEtObjectifList.filter((e: any) => e.planTravaileId === id!),
        ].reverse()
      );
    } else {
      const donnee = tacheEtObjectifList
        .filter((e: any) => e.planTravaileId === id!)
        .filter((item) =>
          `${item.keyTasks} ${
            statuslist.find((e: any) => e.id === item.statusId)?.status
          }
        ${employees.find((e: any) => e.id == item?.responsableId)?.name}`
            .toLowerCase()
            .includes(filtre.toLowerCase())
        );
      setData([...donnee].reverse());
    }
  }, [tacheEtObjectifList, filtre]);
  const formatOptions = (options: any) => {
    return options.map((option: any) => ({
      id: option.id,
      name: option.name,
      surname: option.surname,
    }));
  };

  const allOptions = [
    ...formatOptions(employees),
    ...formatOptions(interns),
    ...formatOptions(prestataireListe),
  ];
  return (
    <Container maxWidth="xl">
      {/* <NavigationContainer> */}
      <SectionNavigation
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack flexDirection={"row"}>
          <Link href={`/plan_travail`}>
            <Button color="info" variant="text" startIcon={<ArrowBack />}>
              Retour
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Add />}
            sx={{ marginInline: 3 }}
            onClick={(e) =>
              router.push(`/plan_travail/${id}/tachesEtObjectifs/add`)
            }
            disabled={planTravaillist
              .filter((p) => p.id === id)
              .flatMap((p) => p.clotures)
              .map((c: any) => c.planTravaileId)
              .includes(id!)}
          >
            Créer
          </Button>
        </Stack>
        <Typography variant="h4" color="GrayText">
          Tâche et résultat
        </Typography>
      </SectionNavigation>
      {/* </NavigationContainer> */}
      <Divider />
      <FormContainer>
        <KeyValue
          keyName="Objectif stratégique"
          value={
            tacheEtObjectifList.length != 0 ? planTravail.description! : ""
          }
        />
      </FormContainer>
      <BodySection>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, pt: 2 }}>
            <EnhancedTableToolbar
              tacheEtObjectifList={tacheEtObjectifList}
              numSelected={selected.length}
              selectYear={selectYear}
              setSelectYear={setSelectYear}
              filtre={filtre}
              setFiltre={setFiltre}
            />
            <TableContainer>
              <Table sx={{ width: "100%", padding: 2, overflow: "auto" }}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  year={selectYear}
                />
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: TacheEtObjectifItem, index: any) => {
                      // const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            align="left"
                            sx={{ paddingLeft: 2 }}
                          >
                            {row.sn}
                          </TableCell>
                          <TableCell sx={{ minWidth: 200, maxWidth: 250 }}>
                            {row.keyTasks}
                          </TableCell>
                          <TableCell sx={{ minWidth: 150, maxWidth: 150 }}>
                            {
                              statuslist.find((e: any) => e.id === row.statusId)
                                ?.status
                            }
                          </TableCell>
                          <TableCell sx={{ minWidth: 200, maxWidth: 250 }}>
                            {(() => {
                              const responsiblePerson = allOptions.find(
                                (e: any) => e.id == row.responsableId
                              );
                              return responsiblePerson
                                ? `${responsiblePerson.name} ${responsiblePerson.surname}`
                                : "";
                            })()}
                          </TableCell>
                          <TableCell>
                            <Moment format="DD/MM/YYYY">{row.startDate}</Moment>
                          </TableCell>
                          <TableCell>
                            <Moment format="DD/MM/YYYY">{row.endDate}</Moment>
                          </TableCell>
                          <TableCell>
                            {row.objectifAnnuel
                              ?.filter((e) => e.year === selectYear - 1)
                              .map((item) =>
                                item.objectiveTitle ? (
                                  <p key={item.id}>{item.objectiveTitle}</p>
                                ) : (
                                  "-"
                                )
                              )}
                          </TableCell>
                          <TableCell>
                            {row.objectifAnnuel
                              ?.filter((e) => e.year === selectYear)
                              .map((item) =>
                                item.objectiveTitle ? (
                                  <p key={item.id}>{item.objectiveTitle}</p>
                                ) : (
                                  "-"
                                )
                              )}
                          </TableCell>
                          <TableCell align="right">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <Link
                                href={`/plan_travail/${id}/tachesEtObjectifs/${row.id}/details`}
                              >
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Link>
                              <Link
                                href={`/plan_travail/${id!}/tachesEtObjectifs/${row.id!}/edit`}
                              >
                                <IconButton
                                  color="primary"
                                  aria-label="Modifier"
                                  component="span"
                                  onClick={() => handleClickEdit(row.id!)}
                                  disabled={row.planTravaile
                                    ?.flatMap((e: any) => e.clotures)
                                    .map((e: any) => e.planTravaileId)
                                    .includes(row.planTravaileId)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Link>
                              <IconButton
                                color="warning"
                                aria-label="Supprimer"
                                component="span"
                                onClick={() => handleClickDelete(row.id!)}
                                disabled={row.planTravaile
                                  ?.flatMap((e: any) => e.clotures)
                                  .map((e: any) => e.planTravaileId)
                                  .includes(row.planTravaileId)}
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

export const BodySection = styled(Box)(({}) => ({
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
