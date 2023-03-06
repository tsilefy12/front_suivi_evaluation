import { Container } from '@mui/material'
import React from 'react'
import ListTacheCles from '../../../components/planTravail/tachesCles/ListTacheCles'
import BackOfficeLayout from '../../../layouts/backOffice'

const TacheCles = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListTacheCles />
        </Container>
    </BackOfficeLayout>
  )
}

export default TacheCles;