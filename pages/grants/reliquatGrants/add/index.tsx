import { Container } from '@mui/material'
import React from 'react'
import AddNewReliquatsGrants from '../../../../components/reliquetGrant/add/AddNewReliquatsGrants'
import BackOfficeLayout from '../../../../layouts/backOffice'

const AddReliquatsGrants = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <AddNewReliquatsGrants />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddReliquatsGrants;