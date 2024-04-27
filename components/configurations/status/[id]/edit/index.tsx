import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { Container, Grid } from "@mui/material";
import { editStatus } from "../../../../../redux/features/status";
import ListStatus from "../../table/ListStatus";
import StatusForm from "../../StatusForm";

const EditStatus = () => {
    const router = useRouter();
    const dispatch: any = useAppDispatch();
    React.useEffect(() => {
        if (router.query.id) {
          getStatus(router.query.id as string);
        }
    }, [router.query]);

    const getStatus = async (id: string) => {
        await dispatch(editStatus({ id }));
    };
    return (
        <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <StatusForm/>
          </Grid>
          <Grid item xs={12} md={8}>
            <ListStatus />
          </Grid>
        </Grid>
      </Container>
    );
};

export default EditStatus;