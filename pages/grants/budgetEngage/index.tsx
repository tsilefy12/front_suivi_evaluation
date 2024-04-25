import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../layouts/backOffice';
import ListBudgetEngage from '../../../components/budgetEngage/ListBudgetsEngage';

const BudgetEngage = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <ListBudgetEngage />
        </Container>
    </BackOfficeLayout>
  )
}

export default BudgetEngage;