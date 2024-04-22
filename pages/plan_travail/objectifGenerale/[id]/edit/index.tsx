import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice'
import EditObjectifGeneral from '../../../../../components/planTravail/objectifGeneral/[id]/edit'

const AddGrantAdmin = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditObjectifGeneral />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantAdmin;