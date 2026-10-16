import { supabase } from '@/lib/supabase'
import { borrarTaskService, crearTareaService, editarTaskService, getTareasService } from '@/services/crud'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View, StyleSheet, Image } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'


const TaskScreen = () => {

    const [title, setTitle] = useState('')
    const [list, setList] = useState<any[]>([])
    const [user_id, setUserId]=useState<string|undefined>('')


    const router = useRouter()
    const {picture} = useLocalSearchParams()
    


    useEffect(()=>{
        async function getTareas(){
            const respuesta = await supabase.auth.getUser()
            setUserId(respuesta.data.user?.id)
            const data = await getTareasService()
            setList(data)
        }
        getTareas()
    },[list])

    return (
        <View>
            <Text>Tareas</Text>
            <TextInput
                placeholder='titulo de la tarea'
                onChangeText={setTitle}
            />

            {picture && <Image source={{uri:picture?.toString()}}
             style={{width:200, height:200}} />
            
            }
            <Pressable 
                onPress={()=>crearTareaService(title, false, user_id)}
                style={{backgroundColor:'#AEAC78'}}>
                <Text>Crear</Text>
            </Pressable>

            <FlatList
                data={list}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=><Pressable 
                                        onPress={()=>{editarTaskService(item.id, !item.finish)}}
                                        onLongPress={()=>{borrarTaskService(item.id)}}
                                        style={{padding:8, marginBottom:16, backgroundColor:item.finish?'#AEAC78':'#FCF0DA'}}>
                    <Text>{item.title}</Text>
                </Pressable>}
                ListEmptyComponent={()=><Text>Sin Tareas</Text>}
            />

            <Pressable 
            onPress ={()=>{{router.replace('../camera')}}}
            
            style = {styles.fab}>

                <Ionicons name='camera' size={28} color={'#fff'} />


            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#368a1d',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

// camara 
 capture: {
        position: 'absolute',
        bottom: 120,
        backgroundColor: 'transparent',

    },
    gallery: {
        position: 'absolute',

        bottom: 130,
        backgroundColor: 'transparent',
    },
    back: {
        position: 'absolute',
        top: 54,
        left: 24,
        backgroundColor: 'transparent',
    },

})


export default TaskScreen

