import { Container } from '@mui/material'
import React from 'react'
import ListGrantsEnCours from '../../../components/GrantsEnCours/ListGrants'
import BackOfficeLayout from '../../../layouts/backOffice'

const GrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <ListGrantsEnCours />
        </Container>
    </BackOfficeLayout>
  )
}

export default GrantsEnCours;