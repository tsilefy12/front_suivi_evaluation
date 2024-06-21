import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
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
import * as Yup from "yup";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../../config/table.config";
import { Form, Formik } from "formik";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
import useFetchResumeDepensePrevue from "../hooks/useFetchResumeDepensePrevue";
import { useRouter } from "next/router";
import useFetchGrants from "../../../../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import {
  createResumeDepensePrevue,
  updateResumeDepensePrevue,
} from "../../../../../../redux/features/resumeDepensePrevue";
import OSTextField from "../../../../../shared/input/OSTextField";
import OSSelectField from "../../../../../shared/select/OSSelectField";
import useFetchResumeDepenseList from "../../../../../previsionMissions/organism/Finances/tableResumeDepense/hooks/useFetchResumeDepense";
import { ResumeDepenseItem } from "../../../../../../redux/features/resumeDepense/reumeDepense.interface";
import { cancelEdit } from "../../../../../../redux/features/resumeDepensePrevue/resumeDepensePrevueSlice";

const AddResumeDepense = ({ handleClose }: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const { isEditing, resumeDepensePrevue } = useAppSelector(
    (state: any) => state.resumeDepensePrevue
  );
  const fetchResumeDepensePrevue = useFetchResumeDepensePrevue();
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const fetchGrantList = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state: any) => state.budgetLine);
  const [grantValue, setGrantValue]: any = React.useState("vide");
  const { id }: any = router.query;
  const fetchResumeDepense = useFetchResumeDepenseList();
  const { resumeDepenseList } = useAppSelector((state) => state.resumeDepense);

  React.useEffect(() => {
    fetchResumeDepensePrevue();
    fetchGrantList();
    fetchligneBudgetaire();
    fetchResumeDepense();
  }, [router.query]);

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
  let BudgetLineGrantList: any = useState<{}>([]);
  const uniqueValues = new Set();

  grantEncoursList.forEach((g) => {
    if (grantValue !== "vide") {
      if (!uniqueValues.has(g.id)) {
        uniqueValues.add(g.id);
        return (BudgetLineGrantList = g.budgetLines);
      }
    } else {
      return (BudgetLineGrantList = []);
    }
  });
  const [grts, setGrts]: any = React.useState(0);
  const [bdgLine, setBdgLine]: any = React.useState(0);
  const [dpns, setDpns]: any = React.useState("");
  const [bdgt, setBdgt]: any = React.useState("");
  const [rmq, setRmq]: any = React.useState("");

  const clickUtiliser = (
    grants: any,
    budgetline: any,
    depense: any,
    budget: any,
    rem: any
  ) => {
    setGrts(grants),
      setBdgLine(budgetline),
      setDpns(depense),
      setBdgt(budget),
      setRmq(rem);
  };
  // console.log("Budget line value :", grts)
  //ajout
  const handleSubmit = async (values: any) => {
    values.missionId = id!;
    try {
      if (isEditing) {
        await dispatch(
          updateResumeDepensePrevue({
            id: resumeDepensePrevue.id!,
            resumeDepensePrevue: values,
          })
        );
      } else if (
        grts !== 0 &&
        bdgLine !== 0 &&
        dpns !== "" &&
        bdgt !== "" &&
        rmq !== ""
      ) {
        values.grant = grts;
        values.ligneBudgetaire = bdgLine;
        values.depensePrevue = dpns;
        values.budgetDepense = bdgt;
        values.remarque = rmq;
        return await (dispatch(createResumeDepensePrevue(values)),
        fetchResumeDepensePrevue(),
        handleClose());
      } else {
        values.grant = grantValue;
        return await (dispatch(createResumeDepensePrevue(values)),
        fetchResumeDepensePrevue(),
        handleClose());
      }
      fetchResumeDepensePrevue(), handleClose();
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
                depensePrevue: isEditing
                  ? resumeDepensePrevue?.depensePrevue
                  : "",
                budgetDepense: isEditing
                  ? resumeDepensePrevue?.budgetDepense
                  : "",
                remarque: isEditing ? resumeDepensePrevue?.remarque : "",
                grant: isEditing ? resumeDepensePrevue?.grant : grantValue,
                ligneBudgetaire: isEditing
                  ? resumeDepensePrevue?.ligneBudgetaire
                  : "",
              }
        }
        // validationSchema={Yup.object({
        //   depensePrevue: Yup.string().required("Champ obligatoire"),
        //   budgetDepense: Yup.string().required("Champ obligatoire"),
        //   ligneBudgetaire: Yup.string().required("Champ obligatoire"),
        // })}
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
                        value={grts != 0 ? grts : grantValue}
                        onChange={(e: any) => setGrantValue(e.target.value)}
                        disabled={!!grts}
                      >
                        <MenuItem value="vide">Select grant</MenuItem>
                        {grantEncoursList.map((item: any) => (
                          <MenuItem value={item.id!}>{item.code!}</MenuItem>
                        ))}
                      </OSTextField>
                    </FormControl>
                    <FormControl fullWidth>
                      <OSSelectField
                        fullWidth
                        select
                        id="outlined-basic"
                        label="Budget line"
                        variant="outlined"
                        name="ligneBudgetaire"
                        options={BudgetLineGrantList}
                        dataKey={["code"]}
                        valueKey="id"
                        value={
                          bdgLine != 0
                            ? bdgLine
                            : formikProps.values.ligneBudgetaire
                        }
                        disabled={!!grts}
                      ></OSSelectField>
                    </FormControl>
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Dépense prévue"
                      variant="outlined"
                      name="depensePrevue"
                      inputProps={{ autoComplete: "off" }}
                      disabled={!!grts}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Budget de dépense"
                      variant="outlined"
                      name="budgetDepense"
                      inputProps={{ autoComplete: "off" }}
                      disabled={!!grts}
                    />
                    <OSTextField
                      fullWidth
                      id="outlined-basic"
                      label="Remarque"
                      variant="outlined"
                      name="remarque"
                      inputProps={{ autoComplete: "off" }}
                      disabled={!!grts}
                    />
                    <Stack flexDirection="row">
                      <InfoIcon />
                      <Typography variant="subtitle2">
                        <FormLabel sx={{ color: "black" }}>
                          {" "}
                          Voici la liste des{" "}
                        </FormLabel>
                        <Lien> resumé de dépense pendant la prévision</Lien>,
                        vous pouvez les réutiliser pour les rapports
                      </Typography>
                    </Stack>
                    <Table sx={{ width: "300px" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Grant</TableCell>
                          <TableCell>Ligne budgetaire</TableCell>
                          <TableCell align="left">Dépenses prévues</TableCell>
                          <TableCell align="left">Budget de dépense</TableCell>
                          <TableCell align="left">Remarques</TableCell>
                        </TableRow>
                      </TableHead>
                      {resumeDepenseList
                        .filter((f: any) => f.missionId === id)
                        .map((item: ResumeDepenseItem, index: any) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {
                                grantEncoursList.find(
                                  (e: any) => e.id === item.grant
                                )?.code
                              }
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {
                                budgetLineList.find(
                                  (e: any) => e.id === item.ligneBudgetaire
                                )?.code
                              }
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.depensePrevue}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.budgetDepense}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {item.remarque}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                color="primary"
                                startIcon={<ContentCopyIcon />}
                                onClick={() =>
                                  clickUtiliser(
                                    item.grant,
                                    item.ligneBudgetaire,
                                    item.depensePrevue,
                                    item.budgetDepense,
                                    item.remarque
                                  )
                                }
                              >
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
                      {/* <Typography variant="body2" align="right">
                        Imprévu de mission(total budget-location et perdiem MV(10% )) :
                        10000
                      </Typography>
                      <Typography variant="body2" align="right">
                        TOTAL GENERAL BUDGET : 40000
                      </Typography> */}
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
                  <Button
                    color="warning"
                    onClick={() => {
                      formikProps.resetForm();
                      setGrts(0);
                      dispatch(cancelEdit());
                      handleClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button variant="contained" type="submit">
                    Enregistrer
                  </Button>
                </DialogActions>
              </SectionNavigation>
            </Form>
          );
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
