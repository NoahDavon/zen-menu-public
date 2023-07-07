import { defineStyleConfig } from '@chakra-ui/react';
import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: 'gray.900',
    color:'gray.300'
  },
})
export const cardTheme = defineMultiStyleConfig({ baseStyle})