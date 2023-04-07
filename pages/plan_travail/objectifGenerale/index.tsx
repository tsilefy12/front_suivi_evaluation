import { Container } from '@mui/material'
import React from 'react'
import ListObjectifGeneral from '../../../components/planTravail/objectifGeneral/ListObjectifGeneral'
import BackOfficeLayout from '../../../layouts/backOffice'

const ObjectifGenerale = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <ListObjectifGeneral />
        </Container>
    </BackOfficeLayout>
  )
}

export default ObjectifGenerale;