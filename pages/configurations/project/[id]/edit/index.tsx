import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditProject from '../../../../../components/configurations/project/[id]/edit';

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditProject />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;