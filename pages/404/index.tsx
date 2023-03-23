import { styled, Typography, useTheme, Grid, IconButton } from '@mui/material'
import React from 'react'
import ImgNotFound from './Image/ImgNotFound'
import Layout from './layout/Layout';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import Container from "@mui/material/Container";

const PageNotFound = () => {
    const theme = useTheme();
    return (
        <Layout>
            <Container  >
                <Grid justifyContent= "center"
                alignItems= "center"
                align="center"
                 container mt={2}>
                    <Grid item xs={12} md={2} lg={2}>
                        <IconButton color="success">
                            <ArrowBackIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Typography variant="h4" color="initial" sx={{my: 2}}>Oops !</Typography>
                            <ImgNotFound/>
                        <Typography variant="h4" color="initial" sx={{my: 2}}>Cette page n'existe pas encore !</Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <IconButton color="success">
                            <Home/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
      ) 
}


export default PageNotFound