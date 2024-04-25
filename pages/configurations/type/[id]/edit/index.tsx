import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditType from '../../../../../components/configurations/type/[id]/edit';

const EditTypeForm = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditType />
        </Container>
    </BackOfficeLayout>
  )
}

export default EditTypeForm;