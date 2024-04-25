import { useRouter } from "next/router";
import { useEffect } from "react";
import TypeForm from "../../TypeForm";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { Container, Grid } from "@mui/material";
import ListType from "../../table/ListType";
import { editType } from "../../../../../redux/features/type";

const EditType = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getPoste(router.query.id as string);
        }
    }, [router.query]);

    const getPoste = async (id: string) => {
        await dispatch(editType({ id }));
    };
    return (
        <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <TypeForm/>
          </Grid>
          <Grid item xs={12} md={8}>
            <ListType />
          </Grid>
        </Grid>
      </Container>
    );
};

export default EditType;
