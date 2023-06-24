import { View, Text } from 'react-native'
import React from 'react'
import { Texts, ScreenLayout, Btn, IconCard, PressableView, Line, Input, RBSheetModel, NavigationHeader} from "../../Component/LegcyUI"

export default function Notification() {
  return (
    <ScreenLayout>
        <NavigationHeader pageName="notification"/>
      <Texts class="text-lg text-center my-5">no Notification found</Texts>
    </ScreenLayout>
  )
}