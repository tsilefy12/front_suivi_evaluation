import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import * as Yup from "yup";

import { styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import BudgetEngagedForm from "./BudgetEngagedForm";

export default function AddNewBudgetEngage() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const { id }: any = route.query;
    const { isEditing,budgetEngaged } = useAppSelector((state) => state.budgetsEngaged);

    return (
        <>
            <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
                <Formik
                    enableReinitialize = { isEditing ? true :false }
                    initialValues={
                        {
                            date: isEditing && budgetEngaged?.date ? new Date(budgetEngaged?.date): new Date(),
                            grantsId: isEditing ? budgetEngaged.grantsId: 0,
                            budgetLineId: isEditing ? budgetEngaged.budgetLineId: 0,
                            libelle: isEditing ? budgetEngaged.libelle: "",
                            amount :isEditing ? budgetEngaged.amount :""
                        }
                    }
                    validationSchema={Yup.object({
                        reference:Yup.string().required("Champ obligatoire"),
                        numBonCommande:Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        // handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => <BudgetEngagedForm formikProps={formikProps} />}
                </Formik>
            </Container>
        </>
    );
}

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

