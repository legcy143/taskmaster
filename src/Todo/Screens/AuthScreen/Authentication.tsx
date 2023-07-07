import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, ToastAndroid , Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Btn, Input, Line, PressableView, RBSheetModel, ScreenLayout, Texts } from '../../../Component/LegcyUI'
import { useUser } from '../../../Supplier/Zustand/useUser'
import Toast from 'react-native-toast-message';


export default function Authentication({ navigation }: any) {
  const { getOtp, verifyOtp, isValidEmail, isLoading, isLogged }: any = useUser()
  const [email, setemail] = useState('')

  const handleGetOtp = () => {
    const emailRegex = /@gmail\.com$/;
    if (emailRegex.test(email) && email.length <= 30) {
      getOtp({ email })
      { isValidEmail && navigation.push("VerifyOtp", { email }) }
    }
    else {
      console.log("please enter correct email");
      Toast.show({
        type: 'error',
        text1: 'not a valid email'.toUpperCase(),
        text2: 'Please Enter Correct Email Addres',
      });
    
    }
  }
  useEffect(() => {
    { isValidEmail && navigation.push("VerifyOtp", { email }) }
    { isLogged && navigation.replace("Home") }
  }, [isValidEmail])


  return (
    <ScreenLayout class="min-h-0" style={{ flex: 1 }} >
      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={0} style={{ marginTop: "auto", flex: 1 }}>
        {/* ui text filed */}
        <View className='h-[35%] p-2 bg-green-500'>
          <Texts class="text-5xl font-bold mt-auto text-gray-100">Authenticate to continue</Texts>
          <Texts class="text-xl mb-auto text-gray-100">write , done , grow repeat</Texts>
        </View>
        {/* ui auth field */}
        <ScrollView showsVerticalScrollIndicator={false} className='p-2 h-[30%]'>
          <View className='my-2'>
            <Texts class="font-semibold opacity-70 text-lg">email</Texts>
            <Input
              placeholder={"eg : email@gmail.com"}
              value={email}
              onChangeText={(e: string) => setemail(e)}
            />
            {
              isLoading ?
                <Btn class="mt-3">loading . .</Btn>
                :
                <Btn class="mt-3" onPress={() => { handleGetOtp() }}>continue</Btn>
            }
          </View>
          <View className='flex-row items-center justify-center p-5'>
            <Line class="flex-1" />
            <Texts class="mx-5">or</Texts>
            <Line class="flex-1" />
          </View>
          <Texts class="text-center">comming sooon</Texts>
          {/* <Btn class="mt-auto">continue</Btn> */}
        </ScrollView>

        <PressableView>
          <Texts class="text-center my-2">By login you accept our terms and condition</Texts>
        </PressableView>
        {/* ui auth field */}
      </KeyboardAvoidingView>
    </ScreenLayout>
  )
}

const HeaderAuth = () => {
  // compo
}