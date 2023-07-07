import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    _checked:{
        bg:'white',
        color:'black',
    }
  },
})

export const checkboxTheme = defineMultiStyleConfig({ 
    defaultProps:{
        colorScheme: 'gray',
    }
 })