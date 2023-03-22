import { styled, Typography } from '@mui/material'
import React from 'react'
import ImgNotFound from './Image/ImgNotFound'

const Container = styled('div')(({ theme }) => ({
    padding: 56,
    minHeight: "100vh",
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
}))

const PageNotFound = () => {
  return (
    <Container>
        <Typography variant="h4" color="initial" sx={{my: 2}}>Oops !</Typography>
        <ImgNotFound/>
        <Typography variant="h4" color="initial" sx={{my: 2}}>Cette page n'existe pas encore !</Typography>
    </Container>
  )
}

export default PageNotFound