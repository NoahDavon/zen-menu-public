import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const base = defineStyle({
  bg:'gray.700',
  color:'gray.300',
})

export const buttonTheme = defineStyleConfig({
  variants: { base },
  defaultProps:{
    variant:'base'
  }
})