import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import TypingAnimation from './HeadAnimation'

export default function Header() {
  return (
    <Box justifyItems="center" borderRadius="5px" pt="10px" h="80px" w="100%" border="2px solid red">
            <Heading fontSize="2.5rem" fontWeight="normal" mb="5px">MovieCrave</Heading>
            <TypingAnimation />
    </Box>
  )
}
