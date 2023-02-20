import { Container } from '@mui/material'
import React from 'react'
import GereEtat from '../../../../components/home/Missions/gereEtat/gereEtat'
import BackOfficeLayout from '../../../../layouts/backOffice'


const PageGereEtat = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" sx={{backgroundColor: '#fff'}}>
          <GereEtat />
        </Container>
    </BackOfficeLayout>
  )
}

export default PageGereEtat;