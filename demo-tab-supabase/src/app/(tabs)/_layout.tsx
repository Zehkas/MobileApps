// app/(tabs)/_layout.tsx
import { signOut } from '@/services';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function TabsLayout() {


    const router = useRouter()

    const cerrarSesion = ()=>{
        signOut()
        router.replace('/')
    }

    return (
        <Tabs screenOptions={{
            tabBarShowLabel:true,
            headerRight:()=><Pressable 
                onPress={cerrarSesion}
                style={{marginRight:8}}>
                <Ionicons name='power-outline' size={28} color={'#4C4541'}/>
            </Pressable>
        }}
        
        >
            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    tabBarBadge:1
                }}
            />
            <Tabs.Screen
                name="tasks/index"
                options={{
                    title: 'Tareas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-attach-outline" size={size} color={color} />
                    ),
                }}
            />
            
        </Tabs>
    );
}