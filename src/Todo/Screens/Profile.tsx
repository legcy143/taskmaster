import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Texts, ScreenLayout, Btn, IconCard, PressableView, Line, Input, RBSheetModel, NavigationHeader } from "../../Component/LegcyUI"
import { ICONS } from '../../Icons/ICONS'
import { useUser } from '../../Supplier/Zustand/useUser'

export default function Profile({ navigation }: any) {
    const { fetchUserDetail, userDetail }: any = useUser()
    useEffect(() => {
        if (!userDetail) {
            navigation.replace("Splash")
        }
    }, [])
    return (
        <ScreenLayout>
            <NavigationHeader pageName="Profile" rightTab={
                <IconCard iconSrc={ICONS.pencil} class="p-2" onPress={() => navigation.push("EditProfile" , {userDetail})} />
            } />
            {/* profile detail */}

            <ScrollView>
                <View className='flex-col items-center justify-center px-3 my-2'>
                    <IconCard class="w-[100]" iconSrc={ICONS.profile} />
                    <Texts class="font-extrabold text-xl">{userDetail?.name}</Texts>
                    <Texts class="font-normal text-base normal-case">{userDetail?.email}</Texts>
                    <Texts class="font-normal text-base">{userDetail?.bio}</Texts>
                </View>
                <Line className={"m-2"} />
                <PressableView onPress={() => {
                    console.log("logout under process")
                }}>
                    <View className='p-1 m-2 flex-row'>
                        <View className='flex-1 bg-red-500'>
                            <Texts>total task</Texts>
                        </View>
                        <View className='flex-1 bg-red-500'>
                            <Texts>on progress</Texts>
                        </View>
                        <View className='flex-1 bg-red-500'>
                            <Texts>completed</Texts>
                        </View>
                    </View>
                    <Texts className={"p-1 px-3 text-red-500 font-semibold text-xl"}>Logout</Texts>
                </PressableView>
            </ScrollView>
            {/* todo detail */}
        </ScreenLayout>
    )
}