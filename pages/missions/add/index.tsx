import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../layouts/backOffice';
import AddNewMission from '../../../components/home/Missions/add/AddNewMission';

const AddMission = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <AddNewMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddMission;