import { getProductsService } from '@/services/crud'
import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

const HomeScreen = () => {

    const [list, setList]=useState<any[]>([])

    useEffect(()=>{
        async function getProducts(){
            const data = await getProductsService()
            console.log(data)
            setList(data)
        }
        getProducts()
    },[])


    return (
        <View>
            <Text>HomeScreen</Text>
            <FlatList
                data={list}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=><Text>{item.name} ${item.price}</Text> }
                ListEmptyComponent={()=><Text>No hay productos</Text>}
            />
        </View>
    )
}

export default HomeScreen