import { Container } from '@mui/material'
import React from 'react'
import AddTacheEtObjectifForm from '../../../../../components/plan_travail/organanisme/tachesEtObjectifs/add/AddNewTacheEtObjectifs'
import BackOfficeLayout from '../../../../../layouts/backOffice'

const AddTacheEtObjectifs = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <AddTacheEtObjectifForm />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddTacheEtObjectifs;