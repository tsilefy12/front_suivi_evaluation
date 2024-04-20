import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice'
import EditPeriode from '../../../../../components/periode/[id]/edit'

const AddGrantAdmin = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditPeriode />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantAdmin;