import { ChakraProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { CartProvider} from 'react-use-cart';
import { cardTheme } from '@/styles/card';
import { modalTheme } from '@/styles/modal';
import { buttonTheme } from '@/styles/button';
import { checkboxTheme } from '@/styles/checkbox';
import { useEffect } from 'react';
const theme = extendTheme({
  components:{
    Card: cardTheme,
    Modal: modalTheme,
    Button: buttonTheme,
    Checkbox: checkboxTheme
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'gray.700',
        color: 'gray.200',
      },
    },
  },
})
function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    return(() =>{
      if(localStorage.length > 2) localStorage.clear()
    });
  }, [])
  return (
    <CartProvider id={Math.random()}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </CartProvider>
  )
}

export default MyApp;