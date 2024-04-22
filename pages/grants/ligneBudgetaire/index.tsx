import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../layouts/backOffice'
import ListBudgetLine from '../../../components/ligneBudgetaire/ligneBudgetaire'

const LigneBudgetaire = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <ListBudgetLine/>
        </Container>
    </BackOfficeLayout>
  )
}

export default LigneBudgetaire;