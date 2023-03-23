import { Stack, useTheme } from '@mui/material';
import { Paper, styled, Container, Typography } from '@mui/material';
import React from 'react'

const Footer = () => {
  const theme = useTheme()
  return (
    <ContainerFooter sx={{ mt: 2 }}>
      <Container maxWidth="xl">
        <Stack
          spacing={0}
          direction="column"
          alignItems="center"
          py={1}
        >
          <Typography
            variant="body2"
            sx={{ color: theme.palette.grey[500] }}
          >
            Copyright © 2022 | <Lien>HAISOA</Lien>{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.grey[500] }}
          >
            Version ¤ <Lien>1.0.0</Lien>, dernière mise à jour :{" "}
            <Lien>10/01/2023</Lien>{" "}
          </Typography>
        </Stack>
      </Container>
    </ContainerFooter>
  )
}

export default Footer

const ContainerFooter = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  // position: "absolute",
  bottom: 0,
  width: "100%",
  borderRadius: 0
}));
const Lien = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.main,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.info.main,
  },
}));