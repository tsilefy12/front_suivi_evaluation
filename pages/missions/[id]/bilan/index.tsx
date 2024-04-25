import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice';
import BilanMission from '../../../../components/home/Missions/bilan/Bilan';


const Bilan = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <BilanMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default Bilan;