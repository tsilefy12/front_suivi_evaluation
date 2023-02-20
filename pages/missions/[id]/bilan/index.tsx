import { Container } from '@mui/material'
import React from 'react'
import BilanMission from '../../../../components/home/Missions/bilan/Bilan';
// import BilanMission from '../../../../components/Missions/bilan/Bilan';
import BackOfficeLayout from '../../../../layouts/backOffice';


const Bilan = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <BilanMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default Bilan;