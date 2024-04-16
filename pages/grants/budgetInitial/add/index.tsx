import { Container } from '@mui/material'
import React from 'react'
import AddNewBudgetInitial from '../../../../components/budgetInitial/add/AddNewBudgetInitial'
import BackOfficeLayout from '../../../../layouts/backOffice'

const AddBudgetInitial = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <AddNewBudgetInitial />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddBudgetInitial;