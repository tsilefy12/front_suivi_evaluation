import {
    Button,
    Container,
    styled,
    Typography,
    Stack,
    MenuItem,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import OSTextField from "../../../shared/input/OSTextField";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../../../hooks/reduxHooks";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { cancelEdit } from "../../../../redux/features/budgetLine/budgetLineSlice";
import useFetchGrants from "../../../GrantsEnCours/hooks/getGrants";
import { useConfirm } from "material-ui-confirm";
import useFetchBudgetLine from "../../../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import { createBudgetLine, updateBudgetLine } from "../../../../redux/features/budgetLine";
import { SectionNavigation } from "../../../home";
import { getLineBudget } from "../../../../redux/features/lineBudget";
import { getType } from "../../../../redux/features/type";
import { getOrganisation } from "../../../../redux/features/organisation";
import OSSelectField from "../../../shared/select/OSSelectField";

const AddNewBudgetLine = () => {
    const router = useRouter();
    const fetchGrants = useFetchGrants();
    const { grantEncoursList } = useAppSelector((state: any) => state.grantEncours);
    const fetchLigneBudgetaire = useFetchBudgetLine();
    const { isEditing, budgetLine } = useAppSelector((state: any) => state.budgetLine)
    const {  lineBudgetList } = useAppSelector((state) => state.lineBudget)
    const {  typeList } = useAppSelector((state) => state.types)
    const {  organisationList } = useAppSelector((state) => state.organisations)

    const dispatch: any = useAppDispatch();
    const { id }: any = router.query;
 
    const grantValue: {id: number, name: string }[] = [];
    let grantCode: any = "";

    grantEncoursList.forEach((element: any) => {
        if (element.id === parseInt(id)) {
          grantValue.push({id:parseInt(id), name: element.code})
          grantCode = element.code
        }
    });
    const handleSubmit = async (values: any) => {
        values.grantId = parseInt(id);
        try {
            if (isEditing) {
                await dispatch(
                    updateBudgetLine({
                        id: budgetLine.id!,
                        budgetLine: values,
                    })
                );
            } else {
                await dispatch(createBudgetLine(values));
            }
            router.push("/grants/ligneBudgetaire");
        } catch (error) {
            console.log("error", error);
        }
    };

    React.useEffect(() => {
        dispatch(getLineBudget({}))
        dispatch(getOrganisation({}))
        dispatch(getType({}))
        fetchGrants();
        fetchLigneBudgetaire();
    }, [router.query])
    return (
        <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
            <Formik
                enableReinitialize={isEditing ? true : false}
                initialValues={
                    isEditing
                        ? budgetLine
                            : {
                                code: isEditing ? budgetLine?.code : "",
                                grantId: isEditing ? budgetLine?.grantId : 0,
                                amount: isEditing ? budgetLine?.amount: 0,
                                budgetTypeId: isEditing ? budgetLine?.budgetTypeId : 0,
                                configOrganisationId: isEditing ? budgetLine?.configOrganisationId : 0,
                                configBudgetLineId: isEditing ? budgetLine?.configBudgetLineId : 0
                            }
                }
                validationSchema={Yup.object({
                    code: Yup.string().required("Champ obligatoire"),
                    grantId: Yup.string().required("Champ obligatoire"),
                    amount: Yup.string().required("Champ obligatoire"),
                })}
                onSubmit={(value: any, action: any) => {
                    handleSubmit(value);
                    action.resetForm();
                }}
            >
                {(formikProps) => {
                    return (
                        <Container maxWidth="xl" sx={{ pb: 5 }}>
                            <NavigationContainer>
                                <SectionNavigation
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 1, sm: 2, md: 4 }}
                                    justifyContent="space-between"
                                    sx={{ mb: 4 }}
                                >
                                    <Stack flexDirection={"row"}>
                                        <Link href="/grants/ligneBudgetaire">
                                            <Button
                                                color="info"
                                                variant="text"
                                                startIcon={<ArrowBack />}
                                                onClick={() => {
                                                    formikProps.resetForm();
                                                    dispatch(cancelEdit());
                                                }}
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
                                            type="button" // Modifier le type à "button"
                                            onClick={formikProps.submitForm}
                                        >
                                            Enregistrer
                                        </Button>
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
                                    </Stack>
                                    <Typography variant="h5">{isEditing ? "Modif GRANT" : "Créer GRANT"}</Typography>
                                </SectionNavigation>
                                {/* <Divider /> */}
                            </NavigationContainer>

                            <FormContainer sx={{ backgroundColor: "#fff", pb: 5 }} spacing={2}>
                                <Stack direction="column" spacing={2}>
                                    <OSTextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Grant"
                                        variant="outlined"
                                        name="grantId"
                                        value={grantCode}
                                    />
                                    <Stack direction="row" spacing={2}>
                                        <OSTextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Code"
                                            variant="outlined"
                                            name="code"
                                        />
                                        <OSSelectField
                                            fullWidth
                                            id="outlined-basic"
                                            options={organisationList}
                                            valueKey="id"
                                            dataKey="name"
                                            label="Organisation"
                                            variant="outlined"
                                            name="configOrganisationId"
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <OSSelectField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Type"
                                            options={typeList}
                                            dataKey="name"
                                            valueKey="id"
                                            variant="outlined"
                                            name="budgetTypeId"
                                        />
                                        <OSSelectField
                                            fullWidth
                                            id="outlined-basic"
                                            options={lineBudgetList}
                                            dataKey="name"
                                            valueKey="id"
                                            label="Ligne de budget"
                                            variant="outlined"
                                            name="configBudgetLineId"
                                        />
                                    </Stack>
                                    <OSTextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Montant"
                                        variant="outlined"
                                        name="amount"
                                        type="number"
                                    />
                                </Stack>
                            </FormContainer>
                        </Container>
                    )
                }}
            </Formik>
        </Container>
    );
};

export default AddNewBudgetLine;

export const CustomStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
    },
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
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
