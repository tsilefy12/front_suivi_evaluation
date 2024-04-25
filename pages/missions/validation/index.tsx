import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../layouts/backOffice';
import ValidationPrevisionMission from '../../../components/validation/valdationPrevisionMission/ValidatioPrevisionMission';

const ValidationMission = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ValidationPrevisionMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default ValidationMission;