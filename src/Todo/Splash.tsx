import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, memo } from 'react'
import { ScreenLayout, Texts } from '../Component/LegcyUI'
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../Supplier/Zustand/useUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTodo } from '../Supplier/Zustand/useTodo';

const Splash = () => {
  const { fetchUserDetail, isLogged, fetchUserProfile, userDetail, isFetchedUser, fetchUserProfileRes }: any = useUser()
  const { fetchTodo }: any = useTodo()
  const navigation: any = useNavigation()
  const scaleValue = useRef(new Animated.Value(1)).current;
  const animatePulse = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.85,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animatePulse();
    });
  };

  useEffect(() => {
    animatePulse();
  }, []);

  useEffect(() => {
    fetchUserProfile();
    fetchTodo()
  }, []);
  useEffect(() => {
    if (isFetchedUser) {
      if (fetchUserProfileRes?.error) {
        // console.log("err => ",fetchUserProfileRes.error)
        return navigation.replace("NetworkError")
      }
      // console.log("am i wokring")
      try {
        { isLogged ? navigation.replace("Home") : navigation.replace("Authentication") }
      } catch (error) {
        // console.log(error)        
      }
    }
  }, [isLogged, isFetchedUser, fetchUserProfileRes]);

  return (
    <ScreenLayout class="relative flex-col items-center justify-center">
      <BgDot class="top-5 left-5" />
      <Texts class="text-9xl font-extrabold text-green-500 opacity-20">Todo</Texts>
      <Animated.Text className="animate-bounce text-[150px] font-medium text-green-500 opacity-100 absolute" style={{ transform: [{ scale: scaleValue }] }}>
        Todo
      </Animated.Text>
      <Texts class="text-9xl font-extrabold text-green-500 mt-52 opacity-5">Todo</Texts>
      <BgDot class="bottom-[50%] left-[10%] opacity-20" />
      <BgDot class="bottom-5 right-5" />
    </ScreenLayout>
  )
}
export default memo(Splash)
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