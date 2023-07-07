import MenuCategory from "@/components/menuCategory";
import OrderItems from "@/components/OrderItems";
import { Divider, Stack, Card, Flex, Button, Text, Spacer, useDisclosure,Modal,ModalBody,ModalFooter, ModalOverlay, ModalHeader, Heading, ModalCloseButton, ModalContent, Box } from "@chakra-ui/react";
import {useCart} from "react-use-cart";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import zenPhoto from "../app/zen.png"
import { getCategories, getAllItemsInCategory, addOrder } from "@/app/firebase";
import { useRouter } from "next/router";
var categories = (require("../dummyData/dummyMenu.json"))[0].categories;
export const getServerSideProps = async () => {
  const categories = await getCategories();
  const Items = {};
  console.log('getting items');
      await Promise.all(categories.map(async (category) => {
        if(!Items[category]) {
          Items[category] = await getAllItemsInCategory(category);
          console.log("category " + category +'=' + Items[category]);
        }
      }))
  return { props: { categories, Items } }
}
export default function Home({categories, Items}) {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {cartTotal, items, isEmpty, emptyCart} = useCart();
  useEffect(()=>{
    if(isEmpty) onClose();
  }, [isEmpty])

  async function placeOrder(){
    await addOrder({table: 15, items: items});
    emptyCart();
    router.push('/ordersuccess')
  }
    return (
    <>
      <Stack justifyItems='center' spacing={3}>
        <Flex justifyContent="center">
          <Box maxWidth='15rem'>
            <Image src={zenPhoto}></Image>
          </Box>
        </Flex>
        {categories.map(element => {
          return Items &&<MenuCategory key={Math.random()} category={element} items = {Items[element]}/>
        })}
        {!isEmpty&&<Card position='sticky' bottom={0}>
          <Flex align='center' minWidth="max-content" gap={2} p={4}>
            <Button onClick={onOpen}>Review Order</Button>
            <Spacer/>
            <Text fontSize='sm'>Order Total = {cartTotal} EGP</Text>
          </Flex>
        </Card>}
      </Stack>
      <Modal  m='1rem' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>
          <Heading>Order Details</Heading>
          <ModalCloseButton/>
        </ModalHeader>
        <ModalBody>
          <Stack spacing={2}>
          {items.map(item => {
            return <><OrderItems item={item}/><Divider/></>
          })}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Text fontSize='sm' mx='2rem'>Order Total = {cartTotal} EGP</Text>
          <Button onClick={placeOrder}>Place Order</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
    )
}
