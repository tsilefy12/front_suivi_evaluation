import { Container } from '@mui/material'
import React from 'react';
import BackOfficeLayout from '../../../layouts/backOffice';
import ListResume from '../../../components/plan_travail/resume';

const Resume = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <ListResume/>
        </Container>
    </BackOfficeLayout>
  )
}

export default Resume;