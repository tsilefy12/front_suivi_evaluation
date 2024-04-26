import { useRouter } from "next/router";
import { useEffect } from "react";
import LineBudgetForm from "../../LineBudgetForm";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { Container, Grid } from "@mui/material";
import ListLineBudget from "../../table/ListLineBudget";
import { editLineBudget } from "../../../../../redux/features/lineBudget";

const EditType = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getLineBudget(router.query.id as string);
        }
    }, [router.query]);

    const getLineBudget = async (id: string) => {
      await dispatch(editLineBudget({ id }));
    };

    return (
        <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <LineBudgetForm/>
          </Grid>
          <Grid item xs={12} md={8}>
            <ListLineBudget />
          </Grid>
        </Grid>
      </Container>
    );
};

export default EditType;
