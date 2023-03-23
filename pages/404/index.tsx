import { Typography, Link, Grid, IconButton } from '@mui/material'
import React from 'react'
import ImgNotFound from './Image/ImgNotFound'
import Layout from './layout/Layout';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import Container from "@mui/material/Container";
import { useRouter } from 'next/router';

const PageNotFound = () => {
    const router = useRouter();
    return (
        <Layout>
            <Container  >
                <Grid container justifyContent= "center"
                alignItems= "center" textAlign="center"
                  mt={2}>
                    <Grid item xs={12} md={2} lg={2}>
                            <IconButton color="success" onClick={() => router.back()}>
                                <ArrowBackIcon/>
                            </IconButton>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Typography variant="h4" color="initial" sx={{my: 2}}>Oops !</Typography>
                            <ImgNotFound/>
                        <Typography variant="h4" color="initial" sx={{my: 2}}>Cette page n'existe pas encore !</Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <Link href="/">
                            <IconButton color="success">
                                <Home/>
                            </IconButton>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
      ) 
}


export default PageNotFound