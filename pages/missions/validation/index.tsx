import { Container } from '@mui/material'
import React from 'react'
import ValidateMission from '../../../components/home/Missions/validation/ValidateMission'
// import AddNewMission from '../../../components/Missions/add/AddNewMission'
import BackOfficeLayout from '../../../layouts/backOffice'

const ValidationMission = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <ValidateMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default ValidationMission;