import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice'
import EditGrantAdmin from '../../../../../components/grantsAdmin/[id]/edit'

const AddGrantAdmin = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditGrantAdmin />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantAdmin;