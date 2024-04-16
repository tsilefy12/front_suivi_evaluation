import { Container } from '@mui/material'
import React from 'react'
import ListTacheCles from '../../../components/planTravail/tachesCles/ListTacheCles'
import BackOfficeLayout from '../../../layouts/backOffice'

const TacheCles = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <ListTacheCles />
        </Container>
    </BackOfficeLayout>
  )
}

export default TacheCles;