import { useNavigation } from "@react-navigation/native";
import { useState, forwardRef, useRef, useImperativeHandle, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, TextInput, } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { ICONS } from "../Icons/ICONS";

export function ScreenLayout(props: any) {
    return (
        <View className={`min-h-[100vh] flex-col bg-blue-50 ${props.class}`}>{props.children}</View>
    )
}
export function NavigationHeader(props:any) {
    const navigation:any = useNavigation()
    return (
        <View className={`h-[60] flex-row items-center justify-between px-1 bg-blue-100 ${props.class}`}>
            <IconCard iconSrc={ICONS.back} onPress={()=>{navigation.goBack()}}/>
            <Text className="text-black text-xl capitalize font-semibold">{props.pageName}</Text>
            <Text className="w-[30]"></Text>
        </View>
    )
}

export function Input(props: any) {
    return (
            <TextInput
                className={`p-2 border-solid border-green-300 border-2 text-black rounded font-normal text-lg  focus:border-green-600 ${props.class}`}
                placeholder={props.placeholder}
                placeholderTextColor={"gray"}
                multiline={props.multiLine}
                numberOfLines={props.numberOfLines}
                autoFocus={props.autoFocus}
                value={props.value}
                onChangeText={props.onChangeText}
                textAlignVertical={props.textAlignVertical}
                selectionColor="green"
            />
    )
}
Input.defaultProps = {
    placeholder: "Enter Text",
    multiLine: false,
    autoFocus: false,
    numberOfLines: 1,
    textAlignVertical: "center",
}
export function Btn(props: any) {
    let varient = props.varient;
    let varientStyle = "bg-green-500"
    let varientText = ""
    switch (varient) {
        case "outline":
            varientStyle = ""
            varientText = "text-green-500";
            break;
        case "link":
            varientStyle = " border-transparent"
            varientText = "text-green-500";
            break;
        default:
            varientStyle = "bg-green-500"
            break;
    }
    return (
        <TouchableOpacity onPress={props.onPress} onLongPress={props.onLongPress} className={` p-2 w-fit rounded border-2 border-solid border-green-500 relative flex-row items-center justify-center ${varientStyle} ${props.class}`} activeOpacity={0.7}>
            <Text className={`text-lg font-medium capitalize text-center text-white ${varientText} ${props.textClass}`}>{props.children}</Text>
        </TouchableOpacity>
    )
}

export function Texts(props: any) {
    return (
        <Text className={` text-black capitalize ${props.class}`} numberOfLines={props.numberOfLines}>{props.children}</Text>
    )
}

export function PressableView(props: any) {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.7} className={` text-black ${props.class}`}>{props.children}</TouchableOpacity>
    )
}

export const IconCard = (props: any) => {
    const navigation: any = useNavigation()
    return (
        <TouchableOpacity onPress={props.onPress} className={`p-1 rounded-full flex items-center justify-center w-[40] aspect-square relative ${props.class}`} activeOpacity={0.7}>
            <Image className={`w-[100%] h-[100%] object-cover`} style={{ tintColor: "black", ...props.style }} source={props.iconSrc} />
            {props.label &&
                <View className="bg-red-500 absolute top-[-1] right-[-1] rounded-full w-[20] aspect-square flex-col items-center justify-center"><Text className="text-center text-xs">{props.label}</Text></View>
            }
        </TouchableOpacity>
    )
}

export const Line = (props: any) => {
    return (
        <View className={`h-[1.3px] bg-black opacity-10 ${props.class}`} />
    )
}

export const RBSheetModel = (props: any) => {
    const { isSheetOpen, children } = props
    const sheetRef = useRef<any>(null);
    useEffect(() => {
        if (isSheetOpen) {
            sheetRef.current?.open();
        } else {
            sheetRef.current?.close();
        }
    }, [isSheetOpen]);

    return (
        <>
            <RBSheet
                ref={sheetRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                onClose={props.onClose}
                animationType={'fade'}
                openDuration={10}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0 , 0 , 0 , 0.6)",
                        display: "flex",
                    },
                    draggableIcon: {
                        width: 100,
                        opacity: 0.7,
                        backgroundColor: "green"
                    },
                    container: {
                        width: "98%",
                        height: props.height || 400,
                        borderRadius: 5,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 5,
                    }
                }}
            >
                {children}
            </RBSheet>
        </>
    )
}

export const CostumToast = (props:any)=>{
    const {message , type} = props
    let typeStyle = 'border-green-500';
    switch (type) {
        case 'warning':
            typeStyle = 'border-orange-500';
            break;
        case 'danger':
            typeStyle = 'border-red-500';
            break;
    
        default:
            typeStyle = 'border-green-500';
            break;
    }
    return(
        <View className={`w-[90%] bg-white border-l-4 p-3 rounded-md border-solid ${typeStyle}`}>
            <Text className="text-black text-lg">{message}</Text>
        </View>
    )
}