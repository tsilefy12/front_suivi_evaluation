import { styled } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import img from '../../../public/images/error/404.png';




const ImageContent = styled('img')(({src, theme }: any) => ({
    src: `url(${src})`,
    width: "50%",
    height: "auto",
}))


const ImgNotFound = () => {
  return <Image src={img} />
}

export default ImgNotFound