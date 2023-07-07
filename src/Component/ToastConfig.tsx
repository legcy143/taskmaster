import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Texts } from './LegcyUI';
import { View } from 'react-native';

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props:any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    // error: (props:any) => (
    //  <View className={` w-[90%] p-3 rounded-lg bg-red-200 border-solid border-2 border-red-500`}>
    //     <Texts className={`text-base font-medium`}></Texts>
    //     <Texts className={`text-base font-medium`}>{props.text1}</Texts>
    //  </View>
    // ),
    error: (props:any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 15
        }}
        text2Style={{
          fontSize: 13,
          color:"red"
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }:any) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Texts>{text1}</Texts>
        <Texts>{props.uuid}</Texts>
      </View>
    )
  };