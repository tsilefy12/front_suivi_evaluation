import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice'
import AddNewBudgetLine from '../../../../../components/ligneBudgetaire/[id]/add'

const AddBudgetLine = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <AddNewBudgetLine />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddBudgetLine;