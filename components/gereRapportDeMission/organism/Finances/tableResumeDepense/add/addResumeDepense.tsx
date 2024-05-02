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
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../../config/table.config";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks";
import useFetchResumeDepensePrevue from "../hooks/useFetchResumeDepensePrevue";
import { useRouter } from "next/router";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import { createResumeDepensePrevue, updateResumeDepensePrevue } from "../../../../../../redux/features/resumeDepensePrevue";
import OSTextField from "../../../../../shared/input/OSTextField";

const AddResumeDepense = ({ handleClose }: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const { isEditing, resumeDepensePrevue } = useAppSelector((state: any) => state.resumeDepensePrevue);
  const fetchResumeDepensePrevue = useFetchResumeDepensePrevue();
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const fetchGrantList = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours);
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const [grantValue, setGrantValue]: any = React.useState("vide");
  const { id }: any = router.query;

  React.useEffect(() => {
    fetchResumeDepensePrevue();
    fetchGrantList();
    fetchligneBudgetaire();
  }, [router.query])

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - [1, 2].length) : 0;

  //select budget line depends grant
  const grantInBudgteLine: any = []
  const BudgetLineGrantList: { id: string, name: any }[] = []
  const uniqueValues = new Set();

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

  let [selectedBudgetLine, setSelectedBudgetLine] = React.useState<any[]>(
    isEditing
      ? budgetLineList.filter((pg: any) =>
        resumeDepensePrevue?.ligneBudgetaire?.includes(pg.id!)
      )
      : BudgetLineGrantList
  );
console.log("grant value :", grantValue)
  //ajout 
  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    values.ligneBudgetaire = [...selectedBudgetLine.map((bl: any) => bl.id)];
    console.log("ligne budgetaire :", values.ligneBudgetaire)
    values.grant = grantValue;
    try {
      if (isEditing) {
        await dispatch(
          updateResumeDepensePrevue({
            id: resumeDepensePrevue.id!,
            resumeDepensePrevue: values,
          })
        );
      } else {
        await dispatch(createResumeDepensePrevue(values))
      }
      fetchResumeDepensePrevue(),
        handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container
      maxWidth="xl"
      sx={{ backgroundColor: "#fff", pb: 5, width: "550px" }}
    >
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? resumeDepensePrevue
            : {
              depensePrevue: isEditing ? resumeDepensePrevue?.depensePrevue : "",
              budgetDepense: isEditing ? resumeDepensePrevue?.budgetDepense : "",
              remarque: isEditing ? resumeDepensePrevue?.remarque : "",
              grant: isEditing ? resumeDepensePrevue?.grant : "",
              ligneBudgetaire: isEditing ? resumeDepensePrevue?.ligneBudgetaire : "",
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
                <DialogTitle>Créer/modifier résumé de dépense</DialogTitle>
                <DialogContent>
                  <FormContainer spacing={2} mt={2}>
                    <FormControl fullWidth>
                      <OSTextField
                        fullWidth
                        select
                        id="outlined-basic"
                        label="Grant"
                        variant="outlined"
                        name="grant"
                        value={(id) ?
                          budgetLineList.find((e: any) => e.id === resumeDepensePrevue?.grant)?.code : grantValue}
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
                    </FormControl>
                    <FormControl fullWidth>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={grantValue != "vide" ? BudgetLineGrantList : []}
                        getOptionLabel={(option: any) => option.name}
                        value={selectedBudgetLine}
                        onChange={(event, newValue) => {
                          setSelectedBudgetLine(newValue);
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
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Dépense prévue"
                      variant="outlined"
                      name="depensePrevue"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Budget de dépense"
                      variant="outlined"
                      name="budgetDepense"
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Rémarque"
                      variant="outlined"
                      name="remarque"
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        Voici la liste des
                        <Lien>prevision de depense pendant la prévision</Lien>, vous
                        pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ width: "300px" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Grant</TableCell>
                          <TableCell>Ligne Budgétaire</TableCell>
                          <TableCell align="left">Dépenses prévues</TableCell>
                          <TableCell align="left">Dépenses Réalisées</TableCell>
                          <TableCell align="left">Différence</TableCell>
                          <TableCell align="left">Remarques</TableCell>
                        </TableRow>
                      </TableHead>
                      {[1, 2].map((item) => (
                        <TableRow
                          key={item}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            ADM-MOT-001
                          </TableCell>
                          <TableCell component="th" scope="row">
                            LB1
                          </TableCell>
                          <TableCell component="th" scope="row">
                            100000
                          </TableCell>
                          <TableCell component="th" scope="row">
                            100000
                          </TableCell>
                          <TableCell component="th" scope="row">
                            100000
                          </TableCell>
                          <TableCell component="th" scope="row">
                            test
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
                      count={[1, 2].length}
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

export default AddResumeDepense;

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
export const Footer = styled(Stack)(({ theme }) => ({
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400px",
  fontSize: "14px",
  marginRight: "176px",
  letterSpacing: "0.25px",
}));
