import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice'
import RapportMission from '../../../../components/home/Missions/gereRapport/Rapport';


const GereRapport = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
            <RapportMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default GereRapport;