import { Container } from '@mui/material'
import React from 'react'
import ListGrantsAdmin from '../../../components/grantsAdmin/ListGrants'
import BackOfficeLayout from '../../../layouts/backOffice'

const GrantsAdmin = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListGrantsAdmin />
        </Container>
    </BackOfficeLayout>
  )
}

export default GrantsAdmin;