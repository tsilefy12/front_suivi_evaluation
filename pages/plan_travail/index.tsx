import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../layouts/backOffice';
import ListObjectifStrategique from '../../components/plan_travail/objectifStrategique';

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