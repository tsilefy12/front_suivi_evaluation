import { Container } from '@mui/material'
import React from 'react'
import ListPeriodeGrants from '../../../components/periode/ListPeriodeGrants'
import BackOfficeLayout from '../../../layouts/backOffice'

const PeriodeGrants = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ListPeriodeGrants />
        </Container>
    </BackOfficeLayout>
  )
}

export default PeriodeGrants;