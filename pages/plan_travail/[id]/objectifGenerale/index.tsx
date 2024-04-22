import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../layouts/backOffice';
import ListObjectifGeneral from '../../../../components/plan_travail/organanisme/objectifGenerale/ListObjectifGeneral';

const ObjectifGenerale = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl" >
          <ListObjectifGeneral />
        </Container>
    </BackOfficeLayout>
  )
}

export default ObjectifGenerale;