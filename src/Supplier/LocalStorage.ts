import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
  }
};


export const getData = async (key: any) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
    return -1
  } catch (error) {
  }
};

export const removeData = async (key: any) => {
  try {
    const value = await AsyncStorage.removeItem(key);
    if (value !== null || undefined) {
      console.log("remove dta " , value , " and key => " , key)
      return true;
    }
    return -1
  } catch (error) {
  }
};