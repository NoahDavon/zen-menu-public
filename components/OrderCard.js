import { CardBody, CardFooter, CardHeader, Card } from '@chakra-ui/card'
import { Flex, Heading, ListItem, Spacer, List, Text, Button, Stack, Divider } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/checkbox'
import React from 'react'
import { closeOrder } from '@/app/firebase'

export default function OrderCard({order}) {
  return (
    <>
    {order.order.order&&
        <Card>
        <CardHeader>Table: {order.table}</CardHeader>
        <CardBody>
            {order.order.order.map((item) => {return <Stack spacing={4} m='1.5rem'>
            <Flex alignItems='center'>
              <Heading size='sm' pr='1rem'>
                {item.name}
              </Heading>
              <Spacer/>
              <Text mx='1rem'>x{item.quantity}</Text>
              <Spacer/>
              <Text>{item.category}</Text>
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
            <Divider/>
        </Stack>
            })}
        </CardBody>
        <CardFooter>
            <Checkbox m='2rem'>Served</Checkbox>
            <Checkbox m='2rem' onChange={(e)=> {if(e.target.checked) closeOrder(order.table);}}>Paid</Checkbox>
        </CardFooter>
    </Card>
    }
    </>
    
  )
}
