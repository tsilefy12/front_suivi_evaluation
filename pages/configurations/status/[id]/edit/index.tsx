import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditStatus from '../../../../../components/configurations/status/[id]/edit';

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditStatus />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;