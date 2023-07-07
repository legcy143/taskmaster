import { View, Text } from 'react-native'
import React from 'react'
import { Btn, ScreenLayout, Texts } from '../../../Component/LegcyUI'
import { useUser } from '../../../Supplier/Zustand/useUser'

export default function NetworkError({ navigation }: any) {
    const {networkErrorHandler}:any = useUser()
    return (
        <ScreenLayout>
            <View>
                <Texts className={"p-10 text-center font-semibold text-lg"}>Network Error please check your internet connection or  try again later</Texts>
                <Btn className={"w-[90%] m-auto"} onPress={() => { navigation.replace("Splash"),networkErrorHandler()}}>try again</Btn>
            </View>
        </ScreenLayout>
    )
}