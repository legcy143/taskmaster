import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState, Component } from 'react'
import { Btn, Input, NavigationHeader, PressableView, ScreenLayout, Texts } from '../../Component/LegcyUI';
import { useUser } from '../../Supplier/Zustand/useUser';
import Toast from 'react-native-toast-message';

export default function EditProfile({ navigation, route }: any) {
    const { isLoading, updateProfile }: any = useUser();
    let userCurrentDetail = route.params
    const [name, setName] = useState(userCurrentDetail?.userDetail?.name)
    const [bio, setBio] = useState(userCurrentDetail?.userDetail?.bio)
    const [gender, setGender] = useState(userCurrentDetail?.userDetail?.gender)
    const hanldeupdateProfile = () => {
        let newUserDetail = { name, bio, gender };
        updateProfile(newUserDetail)
    }
    return (
        <ScreenLayout class="min-h-0" style={{ flex: 1 }} >
            <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={0} style={{ marginTop: "auto", flex: 1 }}>
                <NavigationHeader pageName="edit profile" />
                <ScrollView showsVerticalScrollIndicator={false} className='p-3 h-[30%]'>
                    <Texts className="m-1 mt-5 text-lg font-semibold">name</Texts>
                    <Input
                    className={`${name.length>=20 && "border-red-500"}`}
                        placeholder="name"
                        value={name}
                        onChangeText={(e: string) => { setName(e) }}
                        maxLength={20}
                    />
                    <Texts className="m-1 mt-5 text-lg font-semibold">bio</Texts>
                    <Input
                        className={`${bio.length > 59 && "border-red-500"}`}
                        placeholder="something about your . . . "
                        value={bio}
                        onChangeText={(e: string) => { setBio(e) }}
                        maxLength={60}
                    />
                    <SelectGender option={[{ key: 1, option: "male" }, { key: 2, option: "female" }, { key: 3, option: "prefer's not to say" }]} selected={gender} setter={setGender} />
                    {/* <RadioButton  PROP={[{key:1 , text:"male"},{key:2 , text:"female"},{key:3 , text:"prefer's not to say"}]} currentGender={gender} setGender={setGender}/> */}

                    {/* <Btn class="mt-auto">continue</Btn> */}
                </ScrollView>
                {
                    isLoading ?
                        <Btn class="m-2">loading ..</Btn>
                        :
                        <Btn class="m-2" onPress={() => { hanldeupdateProfile() }}>uppdate profile</Btn>
                }
                {/* ui auth field */}
            </KeyboardAvoidingView>
        </ScreenLayout>
    )
}

type Checkbox = {
    option?: Array<{ key: string | number, option: string } | undefined>
    selected?: string,
    setter?: any
}
const SelectGender = (props: Checkbox) => {
    const { option, selected, setter } = props
    const [value, setvalue] = useState(selected)
    return (
        <View>
            <Texts className="m-1 mt-5 text-lg font-semibold">select gender</Texts>
            {option?.map((res: any) => {
                return (
                    <View key={res.key} className=' my-1 flex-row , items-center justify-between p-1'>
                        <Texts className={'text-base font-medium'}>{res.option}</Texts>
                        <TouchableOpacity
                            style={styles.radioCircle}
                            className='border-green-600'
                            onPress={() => {
                                setvalue(res.option)
                                setter(res.option)
                            }}>
                            {value === res.option && <View className='w-full h-full  rounded-full bg-green-500' />}
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    radioCircle: {
        height: 25,
        width: 25,
        borderRadius: 100,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
    },

});

