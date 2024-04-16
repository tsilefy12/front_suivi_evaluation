import { Container } from '@mui/material'
import React from 'react'
import DetailGrantsEnCours from '../../../../components/GrantsEnCours/detail/DetailGrantsEnCours'
import BackOfficeLayout from '../../../../layouts/backOffice'

const DetailGrantsEnCoursPage = () => {
  return (
    <BackOfficeLayout>
        <Container maxWidth="xl">
          <DetailGrantsEnCours />
        </Container>
    </BackOfficeLayout>
  )
}

export default DetailGrantsEnCoursPage;