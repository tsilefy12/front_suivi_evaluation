import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice';
import EditMission from '../../../../components/home/Missions/[id]/edit';

const AddNewMission = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditMission />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddNewMission;