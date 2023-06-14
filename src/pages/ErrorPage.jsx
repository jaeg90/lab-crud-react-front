import { Box, Center, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <Box>
      <Heading textAlign={"center"}>¿Cómo has llegado hasta aquí?</Heading>
      <Center mt="24px">
        <Link to="/"><Text>Volver a casa</Text></Link>
      </Center>
    </Box>
  )
}
