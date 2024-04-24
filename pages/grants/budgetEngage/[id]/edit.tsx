import { Container } from '@mui/material'
import React from 'react'
import AddNewBudgetEngage from '../../../../components/budgetEngage/add/AddNewBudgetEngage'
import BackOfficeLayout from '../../../../layouts/backOffice'

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