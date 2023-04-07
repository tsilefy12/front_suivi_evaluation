import { Typography, Link, Grid, IconButton } from '@mui/material'
import React from 'react'
import Layout from './layout/Layout';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "@mui/icons-material/Home";
import Container from "@mui/material/Container";
import { useRouter } from 'next/router';
import Image from 'next/image';
import useBasePath from '../../hooks/useBasePath';

const PageNotFound = () => {
    const router = useRouter();
    const basePath = useBasePath();
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
                            <Image src={`${basePath}/images/error/404.png`} alt='404' width={860} height={571} />
                        <Typography variant="h4" color="initial" sx={{my: 2}}>Cette page n&apos;existe pas encore !</Typography>
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