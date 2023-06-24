import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const  useUser =  create((set)=>({
    userDetail : [],
    isLoading : [],
    isLogged : false,
    message:"",
    navigate:false,

    createAccount : async(data:any)=>{
        let user = JSON.stringify([data])
        let setData =  await AsyncStorage.setItem("userDetail" , user);
        let detail = await AsyncStorage.getItem("userDetail");
        let userDetail:any;
        if(detail !== null){
            userDetail = await JSON.parse(detail)
        }
        set(()=>({
            userDetail,
            navigate:true,
        }))
    },

    fetchUserDetail : async()=>{
        let userDetail:any = await AsyncStorage.getItem("userDetail");
        console.log("uerdetial laoding")
        console.log("uerdetial laoding" , userDetail)
        if(userDetail !== null){
            userDetail = JSON.parse(userDetail)
            set(()=>({
                userDetail : userDetail,
                navigate:true,
                isLogged:true,
            }))
        }
        else{
            set(()=>({
                isLogged:false,
            }))
        }
    }
}))