import { useRouter } from "next/router";
import { useEffect } from "react";
import PostAnalyticForm from "../../PostAnalyticForm";
import { editPostAnalytic } from "../../../../../redux/features/postAnalytique";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { Container, Grid } from "@mui/material";
import ListPosatAnalytic from "../../table/ListPostAnalytic";

const EditPosteAnalytic = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getPoste(router.query.id as string);
        }
    }, [router.query]);

    const getPoste = async (id: string) => {
        await dispatch(editPostAnalytic({ id }));
    };
    return (
        <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <PostAnalyticForm/>
          </Grid>
          <Grid item xs={12} md={8}>
            <ListPosatAnalytic />
          </Grid>
        </Grid>
      </Container>
    );
};

export default EditPosteAnalytic;
