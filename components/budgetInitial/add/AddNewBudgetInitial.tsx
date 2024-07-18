import {
  Button,
  Container,
  styled,
  Typography,
  MenuItem,
  Stack,
  Icon,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Add, Check, Close, Delete, Diversity2 } from "@mui/icons-material";
import { Form, Formik } from "formik";
import useFetchBudgetInitial from "../hooks/useFetchBudgetInitial";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  createBudgetInitial,
  updateBudgetInitial,
} from "../../../redux/features/budgetInitial";
import {
  createGrantMonitoring,
  updateGrantMonitoring,
} from "../../../redux/features/grantMonitoring"; // Importer la fonction de création de monitoring
import { useRouter } from "next/router";
import { cancelEdit } from "../../../redux/features/budgetInitial/budgetInitialSlice";
import OSTextField from "../../shared/input/OSTextField";
import useFetchGrants from "../../GrantsEnCours/hooks/getGrants";
import useFetchBudgetLine from "../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchPeriode from "../../periode/hooks/useFetchPeriode";
import { PeriodeItem } from "../../../redux/features/periode/periode.interface";
import useFetchLigneBudgetaire from "../hooks/useFetchLigneBudgetaire";
import { da } from "date-fns/locale";

const BudgetForm = ({
  formikProps,
  BudgetLineGrantList,
  ligneBudgetMontants,
  setLigneBudgetMontants,
  grantValue,
}: any) => {
  const [budgetForms, setBudgetForms] = useState([
    { ligneBudgetaire: "", montant: "" },
  ]);
  const router = useRouter();
  const { id } = router.query;
  const { idEdit } = router.query;
  const [ligneBudget, setLigneBudget] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const handleAddLigneBudgetMontant = (
    grantValue: any,
    ligneBudgetaire: any,
    montant: any
  ) => {
    const newLigneBudgetMontants = [
      ...ligneBudgetMontants,
      { grantValue, ligneBudgetaire, montant },
    ];
    setLigneBudgetMontants(newLigneBudgetMontants);
    setBudgetForms([...budgetForms, { ligneBudgetaire, montant }]);
  };
  const [checkColor, setCheckColor] = useState<any>("");
  const handleValidegneBudgetMontant = () => {
    ligneBudgetMontants.push({
      grantValue,
      ligneBudgetaire: ligneBudget,
      montant: amount,
    });
    setCheckColor(ligneBudgetMontants.length != 0 ? "GrayText" : "primary");
  };
  const handleDeleteLigneBudgetMontant = (indexToDelete: number) => {
    setBudgetForms((prevForms) =>
      prevForms.filter((form, index) => index !== indexToDelete)
    );
    formikProps.setFieldValue(`ligneBudgetaire-${indexToDelete}`, "");
    formikProps.setFieldValue(`montant-${indexToDelete}`, "");
  };

  const fetchGrant = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);

  useEffect(() => {
    fetchGrant();
    fetchBudgetLine();
  }, []);
  console.log("liste :", BudgetLineGrantList);
  return (
    <>
      {budgetForms.map((form, index) => (
        <Stack direction={"row"} gap={1} key={index}>
          <OSTextField
            fullWidth
            select
            id={`outlined-basic-ligneBudgetaire-${index}`}
            label="Ligne budgetaire"
            variant="outlined"
            type="number"
            name={`ligneBudgetaire-${index}`}
            value={formikProps.values[`ligneBudgetaire-${index}`]}
            onChange={(e: any) => {
              {
                id
                  ? setLigneBudget(e.target.value)
                  : formikProps.setFieldValue(
                      `ligneBudgetaire-${index}`,
                      e.target.value
                    );
              }
            }}
          >
            <MenuItem value="">Select budget line</MenuItem>
            {grantValue && id
              ? grantEncoursList
                  .filter((m: any) => m.id == grantValue)
                  .map((m) =>
                    m.budgetLines!.map((b) => (
                      <MenuItem key={b.id} value={b.id}>
                        {b.code}
                      </MenuItem>
                    ))
                  )
              : BudgetLineGrantList.map((m: any) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.code}
                  </MenuItem>
                ))}
          </OSTextField>
          <OSTextField
            fullWidth
            id={`outlined-basic-montant-${index}`}
            label="Montant"
            variant="outlined"
            name={`montant-${index}`}
            type="number"
            value={formikProps.values[`montant-${index}`]}
            onChange={(e: any) => {
              {
                id
                  ? setAmount(e.target.value)
                  : formikProps.setFieldValue(
                      `montant-${index}`,
                      e.target.value
                    );
              }
            }}
          />
          <Stack
            direction={"row"}
            gap={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              onClick={handleValidegneBudgetMontant}
              style={{
                borderRadius: "50%",
                maxWidth: "10px",
                minWidth: "10px",
                display: id ? "block" : "none",
                paddingTop: 12,
                paddingRight: 12,
              }}
              disabled={ligneBudgetMontants.length != 0}
              startIcon={
                <Check
                  style={{
                    fontSize: 25,
                    color: checkColor,
                  }}
                />
              }
            ></Button>
            <Button
              onClick={() =>
                handleAddLigneBudgetMontant(
                  grantValue,
                  id
                    ? ligneBudget
                    : formikProps.values[`ligneBudgetaire-${index}`],
                  id ? amount : formikProps.values[`montant-${index}`]
                )
              }
              startIcon={<Add color="primary" style={{ fontSize: 25 }} />}
              style={{
                borderRadius: "50%",
                maxWidth: "10px",
                minWidth: "10px",
                paddingTop: 12,
                paddingRight: 12,
                display: idEdit && !!!id ? "block" : "none",
              }}
            ></Button>
            <Button
              onClick={() => handleDeleteLigneBudgetMontant(index)}
              style={{
                color: index === 0 ? "GrayText" : "#ff8c00",
                borderRadius: "50%",
                maxWidth: "10px",
                minWidth: "10px",
              }}
              disabled={index === 0}
            >
              <Delete style={{ fontSize: 25 }} />
            </Button>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

const AddNewBudgetInitial = ({ budgetId }: any) => {
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { isEditing, budgetInitial } = useAppSelector(
    (state) => state.budgetInitial
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fetchGrant = useFetchGrants();
  const [open, setOpen] = useState(false);
  const { grantEncoursList = [] } = useAppSelector(
    (state) => state.grantEncours
  );
  const fetchligneBudgetaire = useFetchBudgetLine();
  const { budgetLineList = [] } = useAppSelector((state) => state.budgetLine);
  const fetchPeriode = useFetchPeriode();
  const { periodelist = [] } = useAppSelector((state) => state.periode);
  const [grantValue, setGrantValue] = useState<string>("vide");
  const { idEdit } = router.query;
  const { id } = router.query;
  const { idd }: any = router.query;
  const uniqueValues = new Set();
  const [getIdGrant, setGetIdGrant] = useState(0);
  const [ligneBudgetMontants, setLigneBudgetMontants] = useState<any[]>([]);
  const fetchBudgetLine = useFetchLigneBudgetaire();
  const { grantMonitoringlist } = useAppSelector(
    (state) => state.grantMonitoring
  );

  useEffect(() => {
    fetchGrant();
    fetchligneBudgetaire();
    fetchPeriode();
    fetchBudgetLine();
  }, [router.query]);

  let periodeGrantList: { id: any; name: any; amount: number }[] = [];

  if (grantEncoursList.length > 0) {
    grantEncoursList.forEach((g) => {
      if (grantValue !== "vide") {
        periodelist.forEach((p) => {
          let PeriodeGrant = p.grant;
          if (Number(grantValue) === Number(PeriodeGrant)) {
            if (!uniqueValues.has(p.id)) {
              uniqueValues.add(p.id);
              periodeGrantList.push({
                id: p.id,
                name: p.periode,
                amount: p.montant!,
              });
            }
          }
        });
      }
      uniqueValues.add(g.id);
      periodeGrantList.push({ id: "", name: "", amount: 0 });
    });
  }

  const [BudgetLineGrantList, setBudgetLineGrantList] = useState<any>([]);

  useEffect(() => {
    if (id) {
      const donne = grantMonitoringlist.filter((f) => f.budgetInitialId == id);
      setBudgetLineGrantList(donne);
    } else {
      if (grantEncoursList.length > 0) {
        grantEncoursList.forEach((g) => {
          if (getIdGrant !== 0 && Number(getIdGrant) === Number(g.id)) {
            setBudgetLineGrantList(g.budgetLines!);
          }
        });
      }
    }
  }, [id, getIdGrant]);
  useEffect(() => {
    if (idEdit) {
      const idGrant = periodelist.find(
        (p: PeriodeItem) => p.id === idEdit
      )?.grant;
      if (idGrant !== undefined) {
        setGetIdGrant(idGrant!);
      }
    }
  }, [periodelist, idEdit]);

  const handleSubmit = async (values: any) => {
    if (ligneBudgetMontants.length === 0) {
      setOpen(true);
      return;
    }

    try {
      let createdBudgetInitialId = null;
      let updatedValues = { ...values };

      let promises: Promise<any>[] = [];
      if (isEditing && grantValue !== "" && id) {
        updatedValues.grant = grantValue;
        await dispatch(
          updateBudgetInitial({
            id: budgetInitial.id!,
            budgetInitial: updatedValues,
          })
        );
        const createdBudgetInitialId = budgetInitial.id;

        const filteredLigneBudgetMontants = ligneBudgetMontants.filter(
          (f) => f.grantValue == grantValue
        );

        const data = [
          {
            budgetInitialId: createdBudgetInitialId,
            ligneBudgetaire: Number(
              filteredLigneBudgetMontants.find(
                (lb) => lb.grantValue == grantValue
              )?.ligneBudgetaire
            ),
            montant: Number(
              filteredLigneBudgetMontants.find(
                (lb) => lb.grantValue == grantValue
              )?.montant
            ),
          },
        ];
        console.log("data", data);
        for (const item of data) {
          await dispatch(
            updateGrantMonitoring({
              id: idd!,
              grantMonitoring: item,
            })
          );
        }
        await Promise.all(promises);
      } else {
        values.grant = getIdGrant;
        const resultAction = await dispatch(createBudgetInitial(values));
        createdBudgetInitialId = resultAction.payload.id;
        for (const item of ligneBudgetMontants) {
          await dispatch(
            createGrantMonitoring({
              budgetInitialId: createdBudgetInitialId,
              ligneBudgetaire: item.ligneBudgetaire,
              montant: Number(item.montant),
            })
          );
        }
      }
      await Promise.all(promises);
    } catch (error) {
      console.log("error", error);
    }
    router.push(`/grants/budgetInitial/${id ? grantValue : getIdGrant}/list`);

    fetchBudgetInitial();
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <Formik
        enableReinitialize={isEditing ? true : false}
        initialValues={
          isEditing
            ? budgetInitial
            : {
                grant: isEditing
                  ? budgetInitial?.grant
                  : id
                  ? grantValue
                  : getIdGrant,
                periodeId: isEditing ? budgetInitial?.periodeId : idEdit!,
              }
        }
        validationSchema={Yup.object({
          periodeId: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value, action) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <NavigationContainer>
                <SectionNavigation
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Stack flexDirection={"row"}>
                    <Link
                      href={`/grants/budgetInitial/${
                        id && grantValue != "vide"
                          ? grantValue
                          : idEdit == "vide"
                          ? getIdGrant
                          : ""
                      }/list`}
                    >
                      <Button
                        color="info"
                        variant="text"
                        startIcon={<ArrowBack />}
                      >
                        Retour
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Check />}
                      sx={{ marginInline: 3 }}
                      type="button"
                      onClick={formikProps.submitForm}
                    >
                      Enregistrer
                    </Button>
                    <Link href={`/grants/budgetInitial/${getIdGrant}/list`}>
                      <Button
                        variant="text"
                        color="warning"
                        size="small"
                        startIcon={<Close />}
                        sx={{ marginInline: 3 }}
                        onClick={() => {
                          formikProps.resetForm();
                          dispatch(cancelEdit());
                        }}
                      >
                        Annuler
                      </Button>
                    </Link>
                  </Stack>
                  <Typography variant="h5">
                    {isEditing
                      ? "Modifier budget initial"
                      : "Créer budget initial"}
                  </Typography>
                </SectionNavigation>
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSTextField
                  fullWidth
                  id="outlined-basic"
                  label="Période"
                  variant="outlined"
                  name="periodeId"
                  value={
                    idEdit
                      ? periodelist.find(
                          (p: any) => p.id == idEdit || p.grant == idEdit
                        )?.periode
                      : id
                      ? periodelist.find((p) => p.grant == idEdit)?.periode
                      : ""
                  }
                  onChange={(value: any) =>
                    formikProps.setFieldValue("periodeId", value)
                  }
                />
                <OSTextField
                  fullWidth
                  select={Boolean(id)}
                  id="outlined-basic"
                  label="Grant"
                  variant="outlined"
                  value={
                    idEdit
                      ? grantEncoursList.find(
                          (g) => Number(g.id) === Number(getIdGrant)
                        )?.code
                      : id
                      ? grantEncoursList.find((g) => g.id == idEdit)?.code
                      : ""
                  }
                  onChange={(e: any) => setGrantValue(e.target.value)}
                  name="grant"
                >
                  {id &&
                    grantEncoursList.map((grant) => (
                      <MenuItem key={grant.id} value={grant.id}>
                        {grant.code}
                      </MenuItem>
                    ))}
                </OSTextField>
                <BudgetForm
                  formikProps={formikProps}
                  BudgetLineGrantList={BudgetLineGrantList}
                  handleSubmit={handleSubmit}
                  ligneBudgetMontants={ligneBudgetMontants}
                  setLigneBudgetMontants={setLigneBudgetMontants}
                  grantValue={grantValue}
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={styleDialog}
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "warning.main" }}>
          Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction={"column"} gap={1}>
              <span>
                {`Veuillez ${
                  !!!id
                    ? " ajouter au moins une ligne budgetaire "
                    : "remplir et valider une ligne budgetaire"
                } en cliquant sur icon :`}
              </span>
              <span style={{ display: "flex", alignItems: "center" }}>
                {id ? <Check color="primary" /> : <Add color="primary" />}
                <span>{"   " + "à droite du champ montant"}</span>
              </span>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddNewBudgetInitial;

const NavigationContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
const styleDialog = {
  position: "absolute",
  top: "5%",
  width: "auto",
  p: 4,
};
