import { Flex, Heading, ListItem, Spacer, List, Text, Button, Stack } from '@chakra-ui/react'
import React from 'react'
import { useCart } from 'react-use-cart'
import QuantityButton from './QuantityButton';


export default function OrderItems({item}) {
  const {updateItemQuantity} = useCart();
  return (
    <>
      <Flex alignItems='center'>
        <Heading size='sm' pr='1rem'>
          {item.name}
        </Heading>
        <Spacer/>
        <Button onClick={(e)=>{updateItemQuantity(item.id, item.quantity - 1)}} px='0.3rem' size='2xs' fontSize='s'>-</Button>
        <Text fontSize='sm' fontWeight='bold' mx={'0.5rem'}>x{item.quantity}</Text>
        <Button onClick={(e)=>{updateItemQuantity(item.id, item.quantity + 1)}} px='0.3rem' size='2xs' fontSize='s'>+</Button>
      </Flex>
      <List>
          {item.additions.map(addition =>{
              return   <ListItem>
                        <Text>+ {addition.name}</Text>
                      </ListItem>
          })}
      </List>
      <Flex> 
        <Spacer/>
        <Text fontSize='sm'>{item.itemTotal} EGP</Text>
      </Flex>
    </>
  )
}
