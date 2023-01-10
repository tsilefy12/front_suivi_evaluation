import { Container } from '@mui/material'
import React from 'react'
import AddNewGrantsEnCours from '../../../../components/GrantsEnCours/add/AddNewGrantsEnCours'
// import BackOfficeLayout from '../../../../layouts/backOffice'
// import ListGrants from '../../../components/GrantsEnCours/ListGrants'
// import BackOfficeLayout from '../../../layouts/backOffice'
import BackOfficeLayout from '../../../../layouts/backOffice'

const Contracts = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <AddNewGrantsEnCours />
        </Container>
    </BackOfficeLayout>
  )
}

export default Contracts