import { Container } from '@mui/material'
import React from 'react'
import AddNewGrantsAdmin from '../../../../components/grantsAdmin/add/AddNewGrantsAdmin'
import BackOfficeLayout from '../../../../layouts/backOffice'

const AddGrantsAdmin = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <AddNewGrantsAdmin />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsAdmin;