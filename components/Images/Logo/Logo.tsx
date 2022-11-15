import { styled } from '@mui/material'
import React from 'react'

const LogoContent = styled('img')(({src, theme }: any) => ({
    src: `url(${src})`,
    width: 100,
    height: 62,
}))

const Logo = () => {
  return <LogoContent src="/images/logo/logo.png" />
}

export default Logo