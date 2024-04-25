import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice';
import GereEtat from '../../../../components/home/Missions/gereEtat/gereEtat';

const PageGereEtat = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <GereEtat />
        </Container>
    </BackOfficeLayout>
  )
}

export default PageGereEtat;