import { Container } from '@mui/material'
import React from 'react'
import ListBudgetInitial from '../../../components/budgetInitial/ListBudgetsInitial'
import BackOfficeLayout from '../../../layouts/backOffice'

const BudgetInitial = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListBudgetInitial />
        </Container>
    </BackOfficeLayout>
  )
}

export default BudgetInitial;