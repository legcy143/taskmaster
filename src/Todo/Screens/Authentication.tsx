import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Texts, ScreenLayout, Btn, IconCard, PressableView, Line, Input, RBSheetModel } from "../../Component/LegcyUI"
import { useUser } from '../../Supplier/Zustand/useUser'
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from '@react-navigation/native';

export default function Authentication() {
    let toast = useToast();
    let navigation:any = useNavigation();
    const { createAccount, message , navigate }: any = useUser();
    const [userName, setuserName] = useState('')
    const [bio, setbio] = useState('')
    let userData = { userName, bio }
    const handleAuth = () => {
        console.log("working")
        if (userName.length >= 3) {
            createAccount(userData)
            {
                message && toast.show(message || "name is to short",
                    {
                        type: "danger",
                    }
                );
            }
        }
        else {
            toast.show(message || "name is to short",
                {
                    type: "danger",
                }
            );
        }
    }
    useEffect(() => {
     {navigate && navigation.replace("Home")}
    }, [navigate])
    
    return (
        <ScreenLayout class=" justify-center">
            <BgDot class="top-2 left-5" />
            <BgDot class="top-16 right-[-52]" />
            <View className='my-5 flex-col items-center justify-center mt-auto relative'>
                <Texts class="text-9xl font-semibold text-green-400 absolute opacity-40 top-[-100]">Login</Texts>
                <Texts class="text-7xl font-bold text-green-500">todo</Texts>
                <Texts class="text-green-500">write , done , grow , repeat</Texts>
            </View>
            <View className='p-3'>
                <View >
                    <Texts class="text-lg font-medium">name </Texts>
                    <Input placeholder="Enter Title" autoFocus={true} value={userName} onChangeText={(e: string) => { setuserName(e) }} />
                </View>
                <View className='mt-5'>
                    <Texts class="text-lg font-medium">bio </Texts>
                    <Input placeholder="Enter Title" class="max-h-35" multiLine={true} textAlignVertical="center" value={bio} onChangeText={(e: string) => { setbio(e) }} />
                </View>
            </View>
            <View className='mt-auto p-2'>
                <Btn onPress={() => { handleAuth() }}>Continue</Btn>
                <Texts class="text-center my-2">our Terms and codition</Texts>
            </View>

        </ScreenLayout>

    )
}

const BgDot = (props: any) => {
    const { position } = props;
    return (
        <View className={` absolute ${props.class}`}>
            <Text className='text-green-500  text-5xl leading-5'>...........</Text>
            <Text className='text-green-500  text-5xl leading-5'>...........</Text>
            <Text className='text-green-500  text-5xl leading-5'>...........</Text>
            <Text className='text-green-500  text-5xl leading-5'>...........</Text>
        </View>
    )
}