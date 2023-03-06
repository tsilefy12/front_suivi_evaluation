import { Container } from '@mui/material'
import React from 'react'
import AddNewPeriodeGrants from '../../../../components/periode/add/AddNewPeriodeGrants'
import BackOfficeLayout from '../../../../layouts/backOffice'

const AddPeriodeGrants = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <AddNewPeriodeGrants />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddPeriodeGrants;