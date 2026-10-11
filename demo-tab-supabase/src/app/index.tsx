import { supabase } from '@/lib/supabase'
import { signIn } from '@/services'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
    const router = useRouter()


    const [email, setEmail] = useState('')
    const [password,setPassword]=useState('')
    const [loading, setLoading]=useState(true)

    useEffect(()=>{
        async function verificaUser(){
            //accediendo al async storage
            const respuesta = await supabase.auth.getUser()
            if(respuesta.data.user!==null){
                router.replace('/(tabs)/home')
            }
            setLoading(false)
        }
        verificaUser()

    }, [])

    if(loading){
        return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={'large'} color={'#4C4541'}/>
            <Text>Cargando...</Text>
        </View>
    }

    const iniciarSesion= async ()=>{
        const data = await signIn(email, password);
        console.log(data)
        if(data!==null){
            router.replace('/(tabs)/home')
        }else{
            alert('Credenciales invalidas')
        }
    }




    return (
        <SafeAreaView style={styles.container} >

            <TextInput 
                placeholder='email'
                onChangeText={setEmail}
                keyboardType='email-address'
                style={styles.input}
            />
            <TextInput
                placeholder='password'
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
            />

            <Pressable 
                onPress={iniciarSesion}
                style={({pressed})=>[styles.button, {opacity:pressed?0.7:1}]} >
                <Text style={{color:'#fff'}}>Iniciar</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'#AEAC78',
        width:'100%',
        padding:8,
        marginBottom:16
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:16

    },
    button: {
        backgroundColor: '#AEAC78',
        paddingVertical:16,
        paddingHorizontal:40,
        borderRadius:4
    }
})

export default HomeScreen