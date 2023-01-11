import { Container } from '@mui/material'
import React from 'react'
import ListReliquetsGrants from '../../../components/reliquetGrant/ListReliquetsGrants'
import BackOfficeLayout from '../../../layouts/backOffice'

const ReliquantGrants = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListReliquetsGrants />
        </Container>
    </BackOfficeLayout>
  )
}

export default ReliquantGrants;