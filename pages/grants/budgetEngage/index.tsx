import { Container } from '@mui/material'
import React from 'react'
import ListBudgetEngage from '../../../components/budgetEngage/ListBudgetsEngage'
// import ListBudgetInitial from '../../../components/budgetInitial/ListBudgetsInitial'
import BackOfficeLayout from '../../../layouts/backOffice'

const BudgetEngage = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListBudgetEngage />
        </Container>
    </BackOfficeLayout>
  )
}

export default BudgetEngage;