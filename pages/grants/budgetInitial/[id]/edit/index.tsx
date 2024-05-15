import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditBudgetInitial from '../../../../../components/budgetInitial/[id]/edit';

const AddGrantAdmin = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditBudgetInitial />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantAdmin;