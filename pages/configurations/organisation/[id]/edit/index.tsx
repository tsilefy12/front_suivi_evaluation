import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditOrganisation from '../../../../../components/configurations/organisation/[id]/edit';

const EditOrganisationForm = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditOrganisation />
        </Container>
    </BackOfficeLayout>
  )
}

export default EditOrganisationForm;