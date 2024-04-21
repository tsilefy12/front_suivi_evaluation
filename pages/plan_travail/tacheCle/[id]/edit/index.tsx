import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice'
import EditTacheCle from '../../../../../components/planTravail/tachesCles/[id]/edit'

const AddGrantAdmin = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditTacheCle />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantAdmin;