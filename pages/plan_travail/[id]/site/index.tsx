import { Container } from '@mui/material'
import React from 'react';
import BackOfficeLayout from '../../../../layouts/backOffice';
import ListSite from '../../../../components/plan_travail/organanisme/site';

const AddGrantsEnCours = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <ListSite />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddGrantsEnCours;