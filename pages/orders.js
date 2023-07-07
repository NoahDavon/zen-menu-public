import React, { useEffect, useState } from 'react'
import { onSnapshot, collection } from '@firebase/firestore';
import OrderCard from '@/components/OrderCard';
import { Wrap } from '@chakra-ui/layout';
import { db } from '@/app/firebase';
export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [audio, setAudio] = useState(null)

    useEffect(() => {

        setAudio(new Audio('https://mingosounds.com/wp-content/uploads/2021/06/Bleep-SoundBible.com-1927126940.mp3')) // only call client

    }, [])
    const unsub = onSnapshot(collection(db, 'Orders'), (snapshot) =>
    {
        const newOrders = []
        snapshot.forEach(doc => {
            newOrders.push({table: doc.id, order: doc.data()})
        })
        if(newOrders.length > orders && audio) audio.play();
        setOrders(newOrders);
    })
    useEffect(()=>
    {
        return unsub;
    },[])
  return (
    <Wrap>
    {orders.map((order) => {return <OrderCard order={order}/>})}
    </Wrap>
  )
}
