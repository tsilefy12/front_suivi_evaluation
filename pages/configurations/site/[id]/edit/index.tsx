import { Container } from '@mui/material'
import React from 'react'
import BackOfficeLayout from '../../../../../layouts/backOffice';
import EditSite from '../../../../../components/configurations/site/[id]/edit';

const SiteForm = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <EditSite />
        </Container>
    </BackOfficeLayout>
  )
}

export default SiteForm;