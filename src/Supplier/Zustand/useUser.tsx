import { create } from "zustand";
import { API_URL } from "../../Constants/URL";
import axios from "axios";
import { getData, removeData, setData } from "../LocalStorage";
import Toast from 'react-native-toast-message';

export const useUser = create((set) => ({
    // user detail
    userDetail: undefined,
    isLogged: false,
    // like loading
    isLoading: false,
    isFetchedUser: false,

    // response
    fetchUserProfileRes: undefined,
    verifyOtpRes: undefined,
    message: undefined,
    // for navigation
    navigate: false,
    isValidEmail: false,
    isNewUser: false,

    navigation: null,
    setNavigation: (navigation: any) => set({ navigation }),

    isTestMe: [],

    defaultSetup: async (data: string) => {
        if ("isLogged") {
            set({ isLogged: false, navigate: false })
        }
        else if ("isValidEmail") {
            set({ isLogged: false, isValidEmail: false, })
        }
        else {
            set({ isLogged: false, message: undefined, navigate: false, isLoading: false })
        }
    },
    networkErrorHandler: async () => {
        set({
            fetchUserProfileRes: undefined
        })
    },

    getOtp: async (data: any) => {
        console.log("ok start")
        set(() => ({
            isLoading: true
        }))
        await axios.post(`${API_URL}/api/get-otp`, data).then((e) => {
            console.log(e.data)
            console.log(e.data)
            if (e.data.success) {
                set(() => ({
                    isValidEmail: true,
                }))
            }
        }).catch((e) => {
            console.log(e.message)
        }).finally(() => {
            set(() => ({
                isLoading: false
            }))
        })
    },


    verifyOtp: async (data: any) => {
        set({
            isLoading: true
        })
        await axios.post(`${API_URL}/api/verify-user`, data).then(async (e) => {
            console.log(e.data)
            if (e.data.success) {
                await setData("authToken", e.data.JWT)
                set({
                    isLogged: true,
                    userDetail: e.data.userDetail
                })
            }
        }).catch((e) => {
            console.log(e.response.data)
            Toast.show({
                type: 'error',
                text1: 'invalid credentils'.toUpperCase(),
                text2: `${e.response.data.error}`,
            });
            set({
                verifyOtpRes: e.response.data
            })
        }).finally(() => {
            set({
                isLoading: false,
            })
        })
    },
    fetchUserProfile: async () => {
        let token = await getData("authToken")
        // console.log("token", token)
        set(() => ({
            isLoading: true,
            isFetchedUser: false,
        }))
        if (token == -1) {
            set(() => ({
                isLogged: false,
                isFetchedUser: true,
                isLoading: false,
            }))
            return;
        }
        await axios.post(`${API_URL}/api/fetch-user-profile`, { token }).then((e) => {
            if (e.data.success) {
                set(() => ({
                    isLogged: true,
                    isFetchedUser: true,
                    userDetail: e.data.userDetail
                }))
            }
            else {
                console.log("something went wrong")
            }
        }).catch((e) => {
            console.log(e.message)
            set({
                fetchUserProfileRes: { error: e.message }
            })
        }).finally(() => {
            set((e: any) => ({
                isFetchedUser: true,
                isLoading: false,
            }))
        })
    },
    updateProfile: async (data: any) => {
        let token = await getData("authToken")
        // console.log("token", token)
        set(() => ({
            isLoading: true,
        }))
        if (token == -1) {
            set(() => ({
                isLogged: false,
                isLoading: false,
            }))
            return;
        }
        await axios.post(`${API_URL}/api/update-profile`, { token, ...data }).then((e) => {
            if (e.data.success) {
                set(() => ({
                    isLogged: true,
                    userDetail: e.data.userDetail,
                }))
                Toast.show({
                    type: 'success',
                    text1: 'profile update succesfully'.toUpperCase(),
                });
            }
            else {
                console.log("something went wrong")
            }
        }).catch((e) => {
            console.log(e.message)
        }).finally(() => {
            set((e: any) => ({
                isLoading: false,
            }))
        })
    },
    logout: async () => {
        let removeToken = await removeData("authToken")
        // console.log("removeToken", removeToken)
        if (removeToken) {
            set({
                userDetail: undefined,
                isLoading: false,
                isLogged: false,
                message: undefined,
                navigate: false,
                isValidEmail: false,
                isNewUser: false,
            })
        }
        const navigation = useUser.getState().navigation;
        navigation.navigate('Splash');
    },
    // just for testing or for learning zustand
    checkMe: () => {
        // console.log("ok")
        // useUser.getState().logout();
        console.log(useUser.getState().isTestMe)
    }
}))