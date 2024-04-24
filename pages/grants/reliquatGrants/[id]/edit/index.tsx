import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditReliquatGrant from '../../../../../components/reliquetGrant/[id]/edit';

const AddNewReliquatsGrants = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditReliquatGrant />
        </Container>
    </BackOfficeLayout>
  )
}

export default AddNewReliquatsGrants;