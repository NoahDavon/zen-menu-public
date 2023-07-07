import React from 'react'
import { Flex, Button, Text, Spacer } from '@chakra-ui/react'
export default function QuantityButton({item}) {
  return (
    <Flex>
        <Button onClick={(e)=>{updateItemQuantity(item.id, item.quantity - 1)}} px='0.3rem' size='2xs' fontSize='s'>-</Button>
        <Text fontSize='sm' fontWeight='bold' mx={'0.5rem'}>x{item.quantity}</Text>
        <Button onClick={(e)=>{updateItemQuantity(item.id, item.quantity + 1)}} px='0.3rem' size='2xs' fontSize='s'>+</Button>
    
        <Spacer/>
        <Text fontSize='sm'>{item.itemTotal} EGP</Text>
    </Flex>)
}
