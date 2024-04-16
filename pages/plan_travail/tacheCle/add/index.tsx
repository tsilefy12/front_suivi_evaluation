import { Container } from '@mui/material'
import React from 'react'
import AddNewTacheCle from '../../../../components/planTravail/tachesCles/add/AddNewTacheCle'
import BackOfficeLayout from '../../../../layouts/backOffice'

const AddTacheCle = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <AddNewTacheCle />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddTacheCle;