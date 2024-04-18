import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditPosteAnalytic from '../../../../../components/configurations/postAnalytic/[id]/edit';

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditPosteAnalytic />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;