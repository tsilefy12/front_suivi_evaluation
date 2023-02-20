import { Container } from '@mui/material'
import React from 'react'
import AddNewMission from '../../../components/home/Missions/add/AddNewMission'
// import AddNewMission from '../../../components/Missions/add/AddNewMission'
import BackOfficeLayout from '../../../layouts/backOffice'

const AddMission = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <AddNewMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddMission;