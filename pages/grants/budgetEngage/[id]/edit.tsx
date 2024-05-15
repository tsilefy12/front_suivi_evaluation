import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice';
import BudgetEngagedForm from '../../../../components/budgetEngage/add/BudgetEngagedForm';

const EditBudgetEngaged = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <BudgetEngagedForm />
        </Container>
    </BackOfficeLayout>
  )
}

export default EditBudgetEngaged;