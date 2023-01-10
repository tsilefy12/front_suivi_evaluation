import { Container } from '@mui/material'
import React from 'react'
import ListGrants from '../../../components/GrantsEnCours/ListGrants'
import BackOfficeLayout from '../../../layouts/backOffice'

const GrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListGrants />
        </Container>
    </BackOfficeLayout>
  )
}

export default GrantsEnCours;