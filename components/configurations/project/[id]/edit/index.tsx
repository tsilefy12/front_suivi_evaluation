import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import PostAnalyticForm from "../../PostAnalyticForm";
import { editPostAnalytic } from "../../../../../redux/features/postAnalytique";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { Container, Grid } from "@mui/material";
import PostAnalyticForm from "../../ProjectForm";
import ListPosatAnalytic from "../../table/ListProject";
import ProjectForm from "../../ProjectForm";
import ListProject from "../../table/ListProject";
import { editProject } from "../../../../../redux/features/project";

const EditProject = () => {
    const router = useRouter();
    const dispatch: any = useAppDispatch();
    React.useEffect(() => {
        if (router.query.id) {
          getProject(router.query.id as string);
        }
    }, [router.query]);

    const getProject = async (id: string) => {
        await dispatch(editProject({ id }));
    };
    return (
        <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <ProjectForm/>
          </Grid>
          <Grid item xs={12} md={8}>
            <ListProject />
          </Grid>
        </Grid>
      </Container>
    );
};

export default EditProject;