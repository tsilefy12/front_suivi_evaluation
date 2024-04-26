import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditLineBudget from '../../../../../components/configurations/lineBudget/[id]/edit';

const EditLineBudgetForm = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditLineBudget />
        </Container>
    </BackOfficeLayout>
  )
}

export default EditLineBudgetForm;