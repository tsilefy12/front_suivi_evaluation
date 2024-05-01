import {
  Autocomplete,
  Button,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Data, { Order } from "./table/type-variable";
import { rows } from "./table/constante";
import EnhancedTableHead from "./table/EnhancedTableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPrevisionMission from "./add/addPrevision";
import useFetchPrevisionDepenseList from "./hooks/useFetchPrevisionDepense";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { PrevisionDepenseItem } from "../../../../../redux/features/PrevisionDepense/previsionDepense.interface";
import Moment from "react-moment";
import useFetchGrants from "../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "./hooks/useFetchbudgetLine";
import { useConfirm } from "material-ui-confirm";
import { deletePrevisionDepense, editPrevisionDepense } from "../../../../../redux/features/PrevisionDepense";
import { useFormikContext } from 'formik';
import OSSelectField from "../../../../shared/select/OSSelectField";
import OSTextField from "../../../../shared/input/OSTextField";

const ListPrevision = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const fetchPrevisionDepense = useFetchPrevisionDepenseList();
  const { previsionDepenselist, isEditing, previsionDepense } = useAppSelector((state: any) => state.previsonDepense)
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours);
  const fetchGrant = useFetchGrants()
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const fetchLigneBudgetaire = useFetchBudgetLine();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const [getGrantId, setGetGrantId]: any = React.useState("");

  React.useEffect(() => {
    fetchPrevisionDepense();
    fetchGrant();
    fetchLigneBudgetaire();
  }, [router.query])

  const listLigne: { name: string }[] = []

  grantEncoursList.forEach((b: any) => {
    budgetLineList.forEach((l: any) => {
      if (getGrantId == l.id) {
        listLigne.push({ name: l.code })
      }
    })
  })
  let total: any = useMemo(() => {
    let totalBudget: any = 0;
    previsionDepenselist.forEach((item: any) => {
      totalBudget += item.montant;
    })
    return totalBudget;
  }, [previsionDepenselist])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer prévision de depense",
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
        await dispatch(deletePrevisionDepense({ id }));
        fetchPrevisionDepense();
      })
      .catch(() => { });
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editPrevisionDepense({ id }));
    handleClickOpen();
  };

  //select budget line depends grant
  const [grantValue, setGrantValue]: any = React.useState("vide");
  const grantInBudgteLine: any = []
  const BudgetLineGrantList: { id: string, name: any }[] = []
  const uniqueValues = new Set();
  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        Array.isArray(previsionDepense?.ligneBudgetaire) && previsionDepense?.ligneBudgetaire?.includes(pg.id)
      )
      : BudgetLineGrantList
  );

  grantEncoursList.forEach((g: any) => {
    if (grantValue !== "vide") {
      budgetLineList.forEach((b: any) => {
        let BudgetGrant: any = b.grantId;
        // console.log("id grant :", BudgetGrant)
        if (grantValue === BudgetGrant) {
          grantInBudgteLine.push(b.id);
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
            BudgetLineGrantList.push({ id: b.id, name: b.code });
          }
        } else {
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
            BudgetLineGrantList.push({ id: "", name: "" });
            selectedBudgetLine = [];
          }
        }
      });
    }
  });

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          Ajouter
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <AddPrevisionMission handleClose={handleClose} />
        </Dialog>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {previsionDepenselist
                    .slice().map(
                      (row: PrevisionDepenseItem, index: any) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Moment format="DD/MM/yyyy">{row.date}</Moment>
                            </TableCell>
                            <TableCell align="right">{row.libelle}</TableCell>
                            <TableCell align="right">{row.nombre}</TableCell>
                            <TableCell align="right">{row.pu}</TableCell>
                            <TableCell align="right">{row.montant} Ar</TableCell>
                            <TableCell align="right">
                              {grantEncoursList.find((e: any) => e.id === row?.grant)?.code}
                            </TableCell>
                            <TableCell align="center">
                              {
                                (row.ligneBudgetaire!).map((lb: any) => {
                                  return (
                                    <Stack direction="column" spacing={2} height={25} overflow="auto">
                                      {budgetLineList.find((e: any) => e.id === lb)?.code}
                                    </Stack>
                                  )
                                })
                              }
                            </TableCell>
                            <TableCell align="right">
                              <BtnActionContainer
                                direction="row"
                                justifyContent="right"
                              >
                                <IconButton
                                  color="primary"
                                  aria-label="Modifier"
                                  component="span"
                                  onClick={() => handleClickEdit(row.id)}
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
                      }
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <Footer>
              <Typography variant="body2" align="right">
                TOTAL BUDGET : {total} Ar
              </Typography>
              <Typography variant="body2" align="right" sx={{ width: "100%" }}>
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" sx={{ textAlign: "right" }} spacing={2}>
                    <FormControl sx={{ flex: "1", textAlign: "left", paddingLeft: 40 }}>
                      <TextField
                        fullWidth
                        select
                        id="outlined-basic"
                        label="Grant"
                        variant="outlined"
                        size="small"
                        value={(router.query) ?
                          budgetLineList.find((e: any) => e.id === previsionDepense?.grant)?.code : grantValue}
                        onChange={(e: any) => setGrantValue(e.target.value)}
                      >
                        <MenuItem value="vide">Select grant</MenuItem>
                        {
                          grantEncoursList.map((item: any) => (
                            <MenuItem value={item.id!}>{item.code!}</MenuItem>
                          ))
                        }
                      </TextField>
                    </FormControl>
                    <FormControl sx={{ flex: "1" }}>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        size="small"
                        options={grantValue != "vide" ? BudgetLineGrantList : []}
                        getOptionLabel={(option) => option.name}
                        value={grantValue != "vide" ? selectedBudgetLine : []}
                        onChange={(event, newValue) => {
                          setSelectedBudgetLine(newValue!);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            id="outlined-basic"
                            label="Sélectionnez ligne budgetaire"
                            variant="outlined"
                          />
                        )}
                      />
                  </FormControl>
                </Stack>
                <FormLabel>
                  Imprévu de mission(total budget-location et perdiem MV(10% )) : {total / 10}
                </FormLabel>
              </Stack>
            </Typography>

            <Typography variant="body2" align="right">
              TOTAL GENERAL BUDGET : {total} Ar
            </Typography>
          </Footer>
        </Paper>
      </Box>
    </SectionTable>
    </Container >
  );
};

export default ListPrevision;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));

export const Footer = styled(Stack)(({ theme }) => ({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400px",
  fontSize: "14px",
  marginRight: "270px",
  letterSpacing: "0.25px",
}));
