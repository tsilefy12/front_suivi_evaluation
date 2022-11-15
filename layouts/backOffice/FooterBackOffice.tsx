import { useTheme } from '@mui/material';
import { Paper, styled, Container, Typography, Box } from '@mui/material';
import React from 'react'

const FooterBackOffice = () => {
  const theme = useTheme()
  return (
    <ContainerFooter>
      <Container maxWidth="xl">
        <Box textAlign="center" sx={{py: 1}}>
          <Typography  variant="body2" sx={{color: theme.palette.grey[500]}}>Copyright HAISOA | 2022</Typography>
        </Box>
      </Container>
    </ContainerFooter>
  )
}

export default FooterBackOffice

const ContainerFooter = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  position: "absolute",
  bottom: 0,
  width: "100%",
  borderRadius: 0
}));