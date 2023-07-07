import { Button, Center, Checkbox, Divider, Flex, Heading, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Spacer, Stack, Text, UnorderedList } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {useCart} from 'react-use-cart'
import { getAdditions } from '@/app/firebase'
function AdditionRadio({options, handleAddition}){
    const optionKeys = Object.keys(options);
    const [value, setValue] = useState(optionKeys.find(key => options[key] === 0));
    const lastChoice = useRef(null)
    function radioHandler(key){
        var currentOption = {name: key, price: options[key]}
        setValue(key);
        handleAddition(currentOption, lastChoice.current);
        lastChoice.current = currentOption;
    }
    return <RadioGroup onChange={radioHandler} value={value}>
                <Stack p={3} spacing={3}>
                {optionKeys.map(key =>{
                    let option = {name: key, price: options[key]}
                    return <Flex minWidth="max-content" alignItems="center" gap={2}>
                                <Radio
                                value={key}
                                >{option.name}
                                </Radio> <Spacer/> {option.price > 0 &&<Text fontSize="xs">+{option.price} EGP</Text>}
                            </Flex>
                    })}
                </Stack>
            </RadioGroup>
}

export default function MenuItem(props) {
    const [additions, setAdditions] = useState(null);
    async function getData(){
        let adds = await getAdditions(props.item);
        setAdditions(adds);
    }

    useEffect(() => {
        if(props.item){
            getData();
        }
        return () => {}
    },[props])
    const {addItem} = useCart();
    const [totalPrice, setTotalPrice] = useState(props.item.Price);
    const [currentAdditionState, setCurrentAdditions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const {isOpen, onOpen, onClose} = useDisclosure()
    var currentAdditions = []
    var itemID = props.item.Name;
    function handleAdditions(e, addition){
        currentAdditions = currentAdditionState;
        if(!e.target.checked){
            currentAdditions.splice(currentAdditions.indexOf(addition),1);
            setTotalPrice(totalPrice - addition.price);
        }
        else{
            currentAdditions.push(addition);
            setTotalPrice(totalPrice + addition.price);
        }
        setCurrentAdditions(currentAdditions);
    }
    function handleRadio(addition, lastChoice){
        currentAdditions = currentAdditionState;
        currentAdditions.splice(currentAdditions.indexOf(lastChoice),1);
        currentAdditions.push(addition);
        let priceToDeduct = 0
        if(lastChoice?.price) priceToDeduct = lastChoice.price
        setTotalPrice(totalPrice + addition.price - priceToDeduct);
        setCurrentAdditions(currentAdditions);
    }
    function addItemToCart()
    {
        currentAdditions = currentAdditionState;
        currentAdditions.forEach(addition => {itemID += addition.name})
        var itemToAdd = {
            id: itemID,
            name: props.item.Name,
            basePrice: props.item.Price,
            price: totalPrice,
            additions: currentAdditions,
            category: props.category,
        }
        addItem(itemToAdd,quantity);
    }
    
  return (
    <>
        <Button onClick={onOpen}>{props.item.Name}</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Stack justify='center' position="center">
                        <div>{props.item.Name}</div>
                    </Stack>
                    <Flex alignItems='center'>
                    <Text fontSize="sm">{props.item.Price} EGP</Text>
                        <Spacer/>
                        <Button onClick={(e)=>{setQuantity(Math.max(quantity - 1, 1))}} px='0.3rem' size='2xs' fontSize='s'>-</Button>
                        <Text fontSize='sm' fontWeight='bold' mx={'0.5rem'}>x{quantity}</Text>
                        <Button onClick={(e)=>{setQuantity(Math.max(quantity + 1, 1))}} px='0.3rem' size='2xs' fontSize='s'>+</Button>
                    </Flex>
                    </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack p={3} spacing={3}>
                        {additions && <Heading size="sm">Additions</Heading>}
                        {
                            additions?.map(addition =>{
                                console.log(addition)
                                return <><Divider/><Text>{addition.Name}</Text>{addition.isOption == true? <>
                                <AdditionRadio options={addition.Options} handleAddition={handleRadio}/>
                                </>
                                :Object.keys(addition.Options).map((key) =>{
                                    let option = {name: key, price: addition.Options[key]}
                                    return <Flex minWidth="max-content" alignItems="center" gap={2}>
                                        <Checkbox
                                    onChange={(e) => handleAdditions(e, option)}
                                    >{option.name}</Checkbox> <Spacer/> {option.price > 0 &&<Text fontSize="xs">+{option.price} EGP</Text>}
                                    </Flex>
                                })} </>
                                
                            
                            })
                        }
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick= {addItemToCart}>Add To Order</Button> <Spacer/> <Text fontSize="xs">Total: {totalPrice * quantity} EGP</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
        
    )
}



