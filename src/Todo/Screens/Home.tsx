import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useRef, useState, useEffect, memo, useCallback ,useMemo } from 'react'
import { Texts, ScreenLayout, Btn, IconCard, PressableView, Line, Input, RBSheetModel } from "../../Component/LegcyUI"
import { ICONS } from '../../Icons/ICONS'
import { useTodo } from '../../Supplier/Zustand/useTodo'
import { useNavigation } from '@react-navigation/native'
import { AddTaskCard, CompletedtaskCard, OnProgresCard } from '../Components/Card'
import { useUser } from '../../Supplier/Zustand/useUser'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dimensions } from 'react-native';

export default function Home() {
    const [isSheet, setisSheet] = useState(false)
    const { isLogged, fetchUserProfile, userDetail, logout }: any = useUser()
    const {fetchTodo , allTodos}:any = useTodo();

    useEffect(() => {
        if (!isLogged) {
            fetchUserProfile()
        }
        if(allTodos.length<1){
            fetchTodo();
        }
    }, [isLogged])
    return (
        <ScreenLayout>
            <HeaderNav userName={userDetail?.name.length > 16 ? userDetail?.name.slice(0, 15) + "..." : userDetail?.name} />
            <ScrollView className='relative h-1'>
                <OnProgresView onOpenAddTodo={() => { setisSheet(true) }} />
                <CompletedtaskView />
            </ScrollView>
            <RBSheetModel isSheetOpen={isSheet} onClose={() => { setisSheet(false) }}>
                <AddTaskCard onCancel={() => { setisSheet(false) }} />
            </RBSheetModel>
            <Btn class="m-1 mt-0" onPress={() => setisSheet(true)}>+ Add task</Btn>
        </ScreenLayout>
    )
}

const HeaderNav = (props: any) => {
    const navigation: any = useNavigation();
    const { logout, checkMe }: any = useUser()
    return (
        <View className='flex-row justify-between items-center h-[70] px-3'>
            <PressableView onPress={() => { navigation.push("Profile") }} class='flex-row items-center'>
                <IconCard class="w-[50]" iconSrc={ICONS.profile} onPress={() => { navigation.push("Profile") }} />
                <View className='mx-2'>
                    <Texts class="opacity-50 font-medium text-base">hello ,</Texts>
                    <Texts class="font-extrabold text-xl leading-5">{props.userName}</Texts>
                </View>
            </PressableView>
            {/* notify icon and calender icons */}
            <View className='flex-row items-center'>
                <IconCard iconSrc={ICONS.notification} label="" onPress={() => { navigation.push("Notification") }} />
                {/* <IconCard iconSrc={ICONS.notification} /> */}
            </View>
        </View>
    )
}

const LinearHeader = (props: any) => {
    const navigation: any = useNavigation()
    return (
        <View className='flex-row items-center justify-between p-3 pb-1'>
            <View className='flex-row items-center'>
                <Texts class="text-lg font-bold">{props.title}</Texts>
                <Texts class="text-base font-medium opacity-70 ml-2">{props.length && `( ${props.length} )`}</Texts>
            </View>
            {/* <Texts class={"text-blue-500"}>see all</Texts> */}
            <Btn class="m-1 mt-0" varient="link" textClass="text-base" onPress={() => { props.redirect && navigation.navigate(props.redirect); }}>see all</Btn>
        </View>
    )
}

const OnProgresView = memo((props: any) => {
    const { onProgressTodo }: any = useTodo()
    return (
        <View className='py-1'>
            <LinearHeader title="on progress" length={onProgressTodo?.length} redirect="OnProgressTodo" />
            <ScrollView horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                className=''
            >
                <>
                    {onProgressTodo?.length <= 0 ? <AddCardLoader onOpenAddTodo={props.onOpenAddTodo} /> :

                        <>
                            {onProgressTodo?.map((e: any) => {
                                // onPressDone={()=>{handleCompleteTodo(e._id)}}
                                return (
                                    <OnProgresCard key={e?._id} uid={e?._id} title={e.title} createdAt={e?.createdAt} description={e?.description} timeLeft={e?.timeLeft} class="" />
                                )
                            })}

                        </>
                    }
                </>
            </ScrollView>
        </View>
    )
})

const CompletedtaskView = () => {
    const { completedTodo }: any = useTodo()
    return (
        <View className='py-1'>
            <LinearHeader title="completed task" length={completedTodo?.length} redirect="CompletedTodo" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {completedTodo?.map((e: any) => {
                    return <CompletedtaskCard key={e?._id} uid={e?._id} title={e.title} createdAt={e?.createdAt} description={e?.description} />
                })}
            </ScrollView>
        </View>
    )
}


const AddCardLoader = memo((props: any) => {
    const w = Dimensions.get('window').width;
    return (
        <View className=" w-[250] m-auto h-[200] flex-col items-center justify-center rounded" style={{ width: w }} >
            <View className='bg-gray-200 p-5 w-[90%] h-[80%] rounded-xl flex-col items-center justify-center' style={style.shadow}>
                <Texts class="text-xl font-semibold mb-2 text-center opacity-70">no todo found</Texts>
                <Btn class="p-1 px-5" onPress={props.onOpenAddTodo}>Add task</Btn>
            </View>
        </View>
    )
})

const style = StyleSheet.create({
    shadow: {
        shadowColor: "rgba(0 , 0 , 0 , 0.8)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 10,
        borderColor: "rgba(0 , 0 , 0 ,0.1)",
        borderWidth: 1,
        borderStyle: "solid"
    }
})