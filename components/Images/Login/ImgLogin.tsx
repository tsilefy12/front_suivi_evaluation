import { styled } from '@mui/material'
import React from 'react'

const ImageContent = styled('img')(({src, theme }: any) => ({
    src: `url(${src})`,
    width: "100%",
    height: "auto",
}))


const ImgLogin = () => {
  return <ImageContent src="/images/login/login_img.png" />
}

export default ImgLogin