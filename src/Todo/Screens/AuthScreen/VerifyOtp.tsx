import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native'
import React, { useRef, useState , forwardRef, useEffect } from 'react'
import { Btn, IconCard, Input, Line, NavigationHeader, PressableView, ScreenLayout, Texts } from '../../../Component/LegcyUI'
import { ICONS } from '../../../Icons/ICONS'
import { useUser } from '../../../Supplier/Zustand/useUser'
import Toast from 'react-native-toast-message';


export default function VerifyOtp({ navigation, route }: any) {
  let userEmail = route.params
  const {verifyOtp , getOtp , defaultSetup , isLoading , isLogged , userDetail , verifyOtpRes}:any = useUser()
  const [otp, setotp] = useState('')
  useEffect(() => {
    // defaultSetup()
    {isLogged && navigation.replace("Home")}
      console.log(userDetail)
    }, [isLogged])

  const showToast = ({t1 , t2}:any)=>{
    console.log("who toast")
    console.log(verifyOtpRes)
  }
  const hanldeVerfiy =  async()=>{
    if(userEmail?.email , otp.length>4){
     await verifyOtp({email:userEmail?.email , otp})
     while(isLoading);
     showToast("")
    }
    else{
      Toast.show({
        type: 'error',
        text1: 'invalid a credentials'.toUpperCase(),
        text2: `${otp.length<=6 ?"opt contain 6 digt":"Please Enter otp or try again resend otp"}`,
      });
    }
  }
  
  const resendOtp = ()=>{
    if (userEmail) {
      getOtp({email:userEmail?.email})
    }
    else{
      console.log("please enter correct email");
      Toast.show({
        type: 'error',
        text1: 'not a valid email'.toUpperCase(),
        text2: 'Please Enter Correct Email Addres',
      });
    }
    console.log("resend")
  }
  const hanldeOnChangeOtp = (e:string)=>{
    setotp(e)
  }
  return (
    <ScreenLayout class="min-h-0" style={{ flex: 1 }} >
      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={0} style={{ marginTop: "auto", flex: 1 }}>
        {/* ui text filed */}
        <View className='h-[30%] p-2 bg-green-500'>
          {/* <NavigationHeader class="bg-transparent" /> */}
          <IconCard iconSrc={ICONS.back} onPress={() => { navigation.goBack();defaultSetup()}} class="mt-2" style={{ tintColor: "white" }} />
          <Texts class="text-4xl font-bold mt-auto text-gray-100">Otp verification</Texts>
          <Texts class="text-base mb-auto text-gray-100">verify to acces your task</Texts>
        </View>
        {/* ui otp field */}
        <ScrollView showsVerticalScrollIndicator={false} className='p-3 h-[30%]'>
          <View className='flex-row flex-wrap items-center'>
            <Texts class="text-base">Check your email </Texts>
            <Texts class="font-bold text-lg normal-case">
              {userEmail?.email}
            </Texts>
            <Texts class="text-base"> for otp</Texts>
          </View>
          <Texts className="m-1 mt-5 text-lg font-semibold">Enter otp</Texts>
          <Input
          placeholder = "eg : 000000"
          value={otp}
          onChangeText = {(e:string)=>{hanldeOnChangeOtp(e)}}
          maxLength={6}
          keyboardType="numeric"
          />
          <View className='flex-row justify-between items-centers m-2'>
            <PressableView onPress={()=>resendOtp()}>
              <Texts class="text-base">resend otp</Texts>
            </PressableView>
            <Texts>timer</Texts>
          </View>

          {/* <Btn class="mt-auto">continue</Btn> */}
        </ScrollView>
        {
          isLoading ?
          <Btn class="m-2">loading ..</Btn>
          :
          <Btn class="m-2" onPress={hanldeVerfiy}>Verify otp</Btn>
        }
        <PressableView >
          <Texts class="text-center my-2">By login you accept our terms and condition</Texts>
        </PressableView>
        {/* ui auth field */}
      </KeyboardAvoidingView>
    </ScreenLayout>
  )
}





// update in future

const OtpView = () => {
  const [otp1, setotp1] = useState('')
  const [otp2, setotp2] = useState('')
  const [otp3, setotp3] = useState('')
  const [otp4, setotp4] = useState('')
  const [otp5, setotp5] = useState('')
  const [otp6, setotp6] = useState('')
  let otpArr:Array<string|number> = []
  let ref1 = useRef<TextInput>()
  const handleChangeText = (e)=>{
  //  some opertion
  }
  const handleOTPKeyPress = (e)=>{
    console.log("hi")
    if(e.nativeEvent.key === "backspace"){
console.log("opk")
    }
  }
  return (
    <View className='my-5 flex-row items-center justify-center'>
      <InputBox />
      <InputBox />
      <InputBox />
      <InputBox />
      <Btn onPress={()=>{console.log(otpArr)}}>show</Btn>
    </View>
  )
}

const InputBox = forwardRef((props: any , ref) => {
  const childRef = useRef<TextInput>();
  React.useImperativeHandle(ref, () => childRef.current);
  return (
    <Input
      className="flex-1 m-1 text-center"
      maxLength={1}
      placeholder="0"
      keyboardType="numeric"
      {...props}
      ref={ref}
    />
  )
})