import { View, Text } from 'react-native'
import React , {useEffect}from 'react'
import { Texts, ScreenLayout, Btn, IconCard, PressableView, Line, Input, RBSheetModel, NavigationHeader } from "../../Component/LegcyUI"
import { ICONS } from '../../Icons/ICONS'
import { useUser } from '../../Supplier/Zustand/useUser'

export default function Profile() {
    const {fetchUserDetail , userDetail}:any  = useUser()
    useEffect(() => {
        fetchUserDetail()
    }, [])
    return (
        <ScreenLayout>
            <NavigationHeader pageName="Profile" />
            {/* profile detail */}
            <View className='flex-row  px-3 my-2'>
                <IconCard class="w-[100]" iconSrc={ICONS.profile} />
                <View className='mx-2 flex-1'>
                    <Texts class="opacity-50 font-medium text-base">hello ,</Texts>
                    <Texts class="font-extrabold text-xl leading-5">{userDetail[0]?.userName}</Texts>
                    <Texts class="font-normal text-base leading-5">{userDetail[0]?.bio}</Texts>
                </View>
            </View>
            <Line />
            {/* todo detail */}
        </ScreenLayout>
    )
}