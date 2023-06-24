import { View, Text, ScrollView } from 'react-native'
import React ,{useState}from 'react'
import { Btn, IconCard, Line, NavigationHeader, PressableView, ScreenLayout, Texts } from '../../Component/LegcyUI'
import { useTodo } from '../../Supplier/Zustand/useTodo'
import { AddCardLoader, OnProgresCard } from '../Components/Card'

export default function OnProgressTodo() {
    const { onProgressTodo }: any = useTodo()
    return (
        <ScreenLayout>
            <NavigationHeader pageName="on progress todo"/>
            <ScrollView
                className='relative h-1'
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
               <>
                    {onProgressTodo.length <= 0 ? <View>
                        <Texts class="text-center my-5 text-xl font-bold">No progress task found</Texts>
                    </View> :

                        <>
                            {onProgressTodo.map((e: any) => {
                                // onPressDone={()=>{handleCompleteTodo(e._id)}}
                                return (
                                    <OnProgresCard key={e?._id} uid={e?._id} title={e.title} createdAt={e?.createdAt} description={e?.description} timeLeft={e?.timeLeft} />
                                )
                            })}

                        </>
                    }
                </>
            </ScrollView>
        </ScreenLayout>
    )
}
