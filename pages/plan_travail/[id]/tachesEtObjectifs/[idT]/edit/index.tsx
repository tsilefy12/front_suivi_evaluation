import { Container } from '@mui/material'
import React from 'react';
import BackOfficeLayout from '../../../../../../layouts/backOffice';
import EditTacheCle from '../../../../../../components/plan_travail/organanisme/tachesEtObjectifs/[id]/edit';

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditTacheCle />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;