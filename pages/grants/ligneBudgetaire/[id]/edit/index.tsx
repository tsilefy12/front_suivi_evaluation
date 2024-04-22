import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice'
import EditBudgetLine from '../../../../../components/ligneBudgetaire/[id]/edit'

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditBudgetLine />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;