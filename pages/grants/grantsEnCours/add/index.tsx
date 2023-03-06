import { Container } from '@mui/material'
import React from 'react'
import AddNewGrantsEnCours from '../../../../components/GrantsEnCours/add/AddNewGrantsEnCours'
import BackOfficeLayout from '../../../../layouts/backOffice'

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <AddNewGrantsEnCours />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;