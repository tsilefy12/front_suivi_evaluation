import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { Container, Grid } from "@mui/material";
import SiteForm from "../../SiteForm";
import ListeSites from "../../table/ListSite";
import { editSite } from "../../../../../redux/features/site";

const EditSite = () => {
    const router = useRouter();
    const dispatch: any = useAppDispatch();
    React.useEffect(() => {
        if (router.query.id) {
          getSite(router.query.id as string);
        }
    }, [router.query]);

    const getSite = async (id: string) => {
        await dispatch(editSite({ id }));
    };
    return (
        <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <SiteForm/>
          </Grid>
          <Grid item xs={12} md={8}>
            <ListeSites />
          </Grid>
        </Grid>
      </Container>
    );
};

export default EditSite;