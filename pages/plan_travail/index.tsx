import { Container } from '@mui/material'
import React from 'react'
import ListObjectifStrategique from '../../components/planTravail/objectifStrategique'
import BackOfficeLayout from '../../layouts/backOffice'

const PlanTravail = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListObjectifStrategique />
        </Container>
    </BackOfficeLayout>
  )
}

export default PlanTravail;