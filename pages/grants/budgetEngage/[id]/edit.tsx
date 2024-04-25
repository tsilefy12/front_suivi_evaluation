import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice';
import AddNewBudgetEngage from '../../../../components/budgetEngage/add/AddNewBudgetEngage';

const EditBudgetEngaged = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <AddNewBudgetEngage />
        </Container>
    </BackOfficeLayout>
  )
}

export default EditBudgetEngaged;