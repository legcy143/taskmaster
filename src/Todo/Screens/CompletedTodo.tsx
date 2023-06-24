import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Btn, IconCard, Line, NavigationHeader, PressableView, ScreenLayout, Texts } from '../../Component/LegcyUI'
import { useTodo } from '../../Supplier/Zustand/useTodo'
import { ICONS } from '../../Icons/ICONS'
import { CompletedtaskCard, OnProgresCard } from '../Components/Card'

export default function CompletedTodo() {
  const { completedTodo, deleteTodo, fetchTodo }: any = useTodo()
  return (
    <ScreenLayout>
      <NavigationHeader pageName="completed todo" />
      <ScrollView
        className='relative h-1'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <>
          {completedTodo.length <= 0 ? <View>
            <Texts class="text-center my-5 text-xl font-bold">No completed task found</Texts>
          </View> :

            <>
              {completedTodo?.map((e: any) => {
                return <CompletedtaskCard key={e?._id} uid={e?._id} title={e.title} createdAt={e?.createdAt} description={e?.description} />
              })}

            </>
          }
        </>
      </ScrollView>
    </ScreenLayout>
  )
}