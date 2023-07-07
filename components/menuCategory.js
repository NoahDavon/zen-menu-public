import { Card, CardBody, CardHeader, Heading, Wrap } from '@chakra-ui/react'
import MenuItem from './MenuItem'

export default function MenuCategory({category, items}) {
  return (
    <Card mx="1rem">
        <CardHeader>
            <Heading size="md">
                {category}
            </Heading>
        </CardHeader>
        <CardBody>
            <Wrap justify='center' spacing={3}>
                {items && items.map(item =>{
                    return <MenuItem item = {item} category={category}/>;
                })}
            </Wrap>
        </CardBody>
    </Card>
  )
}

