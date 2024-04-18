import { Container } from '@mui/material'
import React from 'react'
import EditGrant from '../../../../../components/GrantsEnCours/[id]/edit'
import BackOfficeLayout from '../../../../../layouts/backOffice'

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditGrant />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;