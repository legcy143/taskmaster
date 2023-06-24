import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTodo = create((set) => ({
    // read todo in array
    onProgressTodo: [],
    /**
      @sample_object_on_progress_todo
      {
        _id:"mathrandom value"
        title:"title of todo",
        description:"description of todo is the lorem ispum",
        date:"today 11:34 pm",
      } 
     */
    completedTodo: [],
    /**
      @sample_object_on_complete_todo
      {
        title:"title of todo",
        date:"today 11:34 pm",
        description:"description of todo is the lorem ispum",
      } 
     */

    // create
    addTodo: async (data: any) => {
        let stringData = JSON.stringify([data])
        try {
            const value = await AsyncStorage.getItem("onProgressTodo");
            if (value != null) {
                let oldTodo = JSON.parse(value)
                oldTodo.push(data)
                let finalData = JSON.stringify(oldTodo)
                await AsyncStorage.setItem("onProgressTodo", finalData);
            }
            else {
                await AsyncStorage.setItem("onProgressTodo", stringData);
            }
        } catch (error) {
        }
    },
    // read
    fetchTodo: async () => {
        try {
            const onProgress = await AsyncStorage.getItem('onProgressTodo');
            const completed = await AsyncStorage.getItem('completedTodo');
            if (onProgress != null) {
                let res = await JSON.parse(onProgress)
                set(() => ({
                    onProgressTodo: res.reverse()
                }))
            }
            if (completed != null) {
                let res = await JSON.parse(completed)
                set(() => ({
                    completedTodo: res.reverse()
                }))
            }
        } catch (error) {
        }
    },
    completeTodo: async (id: number | string | any) => {
        try {
            // const progressTodoList = await AsyncStorage.removeItem("onProgressTodo");
            // const completedList = await AsyncStorage.removeItem("completedTodo");
            const progressTodoList = await AsyncStorage.getItem("onProgressTodo");
            const completedList = await AsyncStorage.getItem("completedTodo");
            if (progressTodoList != null) {
                let oldTodo = JSON.parse(progressTodoList)
                let newTodo = oldTodo.filter((e: any) => e = e._id !== id)
                let completetodo;
                let completetodoStringify;
                if (completedList != null) {
                    completetodo = oldTodo.filter((e: any) => e = e._id === id)
                    let oldCompletedTodo = await JSON.parse(completedList)
                    oldCompletedTodo.push(...completetodo)
                    completetodoStringify = JSON.stringify(oldCompletedTodo)
                    await AsyncStorage.setItem("completedTodo", completetodoStringify);
                }
                else {
                    completetodo = oldTodo.filter((e: any) => e = e._id === id)
                    completetodoStringify = JSON.stringify(completetodo)
                    await AsyncStorage.setItem("completedTodo", completetodoStringify);
                }
                let newTodoStringfy = JSON.stringify(newTodo)
                await AsyncStorage.setItem("onProgressTodo" , newTodoStringfy);
            }
        } catch (error) {
        }
    },
    // update
    updateTodo: async () => {
        console.log("updaing todo")
    },
    // delete
    deleteTodo: async (id: number | string) => {
        try {
            const completedList = await AsyncStorage.getItem("completedTodo");
            if (completedList !== null) {
                let oldCompletedTodo = JSON.parse(completedList)
                let newCompletedTodo = oldCompletedTodo.filter((e: any) => e = e._id !== id)
                let completetodoStringify = JSON.stringify(newCompletedTodo)
                await AsyncStorage.setItem("completedTodo", completetodoStringify);
            }

        } catch (error) {

        }
    }


}))