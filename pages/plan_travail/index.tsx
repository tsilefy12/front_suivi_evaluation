import { Container } from '@mui/material'
import React from 'react'
import ListObjectifStrategique from '../../components/plan_travail/objectifStrategique'
import BackOfficeLayout from '../../layouts/backOffice'

const PlanTravail = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <ListObjectifStrategique />
        </Container>
    </BackOfficeLayout>
  )
}

export default PlanTravail;