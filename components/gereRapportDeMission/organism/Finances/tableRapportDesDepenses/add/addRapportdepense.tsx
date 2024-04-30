import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import { Footer } from "../ListRapportDepense";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../../config/table.config";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { createRapportDepense, updateRapportDepense } from "../../../../../../redux/features/rapportDepense";
import useFetchRapportDepense from "../hooks/useFetchRapportDepense";
import OSDatePicker from "../../../../../shared/date/OSDatePicker";
import OSTextField from "../../../../../shared/input/OSTextField";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";

const AddRapportdepense = ({ handleClose }: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const { isEditing, rapportDepense, rapportDepenseList } = useAppSelector((state: any) => state.rapportDepense);
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const { id }: any = router.query;
  const fetchRapportDepense = useFetchRapportDepense();
  const fetchGrantList = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours);
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const [grantValue, setGrantValue]: any = React.useState("vide");

  React.useEffect(() => {
    fetchRapportDepense();
    fetchGrantList();
    fetchligneBudgetaire();
  }, [router.query])
  // console.log(" id :", grantValue)

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - [1, 2, 3, 4, 5].length)
      : 0;

  const grantInBudgteLine: any = []
  const BudgetLineGrantList: { id: string, name: any }[] = []
  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        rapportDepense?.ligneBudgetaire?.includes(pg.id!)
      )
      : BudgetLineGrantList
  );

  //select budget line depends grant
  const uniqueValues = new Set();

  grantEncoursList.forEach((g: any) => {
    if (grantValue !== "vide") {
      budgetLineList.forEach((b: any) => {
        let BudgetGrant: any = b.grantId;
        console.log("id grant :", BudgetGrant)
        if (grantValue === BudgetGrant) {
          grantInBudgteLine.push(b.id);
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
            BudgetLineGrantList.push({ id: b.id, name: b.code });
          }
        }
        else {
          if (!uniqueValues.has(b.id)) {
            uniqueValues.add(b.id);
            BudgetLineGrantList.push({ id: "", name: "" });
            selectedBudgetLine = [];
          }
        }
      });
    }
  });

  //ajout 
  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    values.ligneBudgetaire = [...selectedBudgetLine.map((bl: any) => bl.id)];
    values.grant = grantValue;
    try {
      if (isEditing) {
        await dispatch(
          updateRapportDepense({
            id: rapportDepense.id!,
            rapportDepense: values,
          })
        );
      } else {
        await dispatch(createRapportDepense(values))
      }
      fetchRapportDepense(),
        handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#fff", pb: 5, Height: "500px", width: "580px" }}
    >
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? rapportDepense
            : {
              date: isEditing ? rapportDepense?.date : new Date(),
              libelle: isEditing ? rapportDepense?.libelle : "",
              montant: isEditing ? rapportDepense?.montant : "",
              grant: isEditing ? rapportDepense?.grant : "",
              ligneBudgetaire: isEditing ? rapportDepense?.ligneBudgetaire : "",
            }
        }
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps: any) => {
          return (
            <Form>
              <SectionNavigation>
                <DialogTitle>Créer/modifier besoin en véhicule</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <OSDatePicker
                      fullWidth
                      id="outlined-basic"
                      label="Date"
                      variant="outlined"
                      name="date"
                      value={formikProps.values.date}
                      onChange={(value: any) => formikProps.setFieldValue("date", value)}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Libellés"
                      variant="outlined"
                      name="libelle"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Montant"
                      variant="outlined"
                      name="montant"
                      type="number"
                    />
                    <FormControl fullWidth>
                      <Stack spacing={2} direction="column">
                        <OSTextField
                          fullWidth
                          select
                          id="outlined-basic"
                          label="Grant"
                          variant="outlined"
                          name="grant"
                          value={(id) ?
                            budgetLineList.find((e: any) => e.id === rapportDepense?.grant)?.code : grantValue}
                          onChange={(e: any) => setGrantValue(e.target.value)}
                          hyperText={grantValue == "vide" ? false : true}
                        >
                          <MenuItem value="vide">Select grant</MenuItem>
                          {
                            grantEncoursList.map((item: any) => (
                              <MenuItem value={item.id!}>{item.code!}</MenuItem>
                            ))
                          }
                        </OSTextField>
                        <Autocomplete
                          multiple
                          id="tags-standard"
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
                      </Stack>
                    </FormControl>
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des
                        <Lien>prevision de depense pendant la prévision</Lien>, vous
                        pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">PJ#</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell align="left">Libellés</TableCell>
                          <TableCell align="left">Montant</TableCell>
                        </TableRow>
                      </TableHead>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <TableRow
                          key={item}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            10
                          </TableCell>
                          <TableCell component="th" scope="row">
                            08/10/2021
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Provision
                          </TableCell>
                          <TableCell component="th" scope="row">
                            100000
                          </TableCell>
                          <TableCell align="right">
                            <Button color="primary" startIcon={<ContentCopyIcon />}>
                              Utiliser
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </Table>
                    <Footer>
                      <Typography variant="body2" align="right">
                        TOTAL BUDGET : 30000
                      </Typography>
                      <Typography variant="body2" align="right">
                        Imprévu de mission(total budget-location et perdiem MV(10% )) :
                        10000
                      </Typography>
                      <Typography variant="body2" align="right">
                        TOTAL GENERAL BUDGET : 40000
                      </Typography>
                    </Footer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={[1, 2, 3, 4, 5].length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage={labelRowsPerPage}
                      labelDisplayedRows={defaultLabelDisplayedRows}
                    />
                  </FormContainer>
                </DialogContent>
                <DialogActions>
                  <Button color="warning">Annuler</Button>
                  <Button variant="contained" type="submit">
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
            </Form>
          )
        }}
      </Formik>
    </Container>
  );
};

export default AddRapportdepense;

const FormContainer = styled(Stack)(({ theme }) => ({
  // padding: 10,
  background: "#fff",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
const Lien = styled("span")(({ theme }) => ({
  color: theme.palette.info.main,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));
