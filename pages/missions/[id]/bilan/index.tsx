import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice';


const Bilan = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          {/* <ListMissions /> */}
          Bilan
        </Container>
    </BackOfficeLayout>
  )
}

export default Bilan;