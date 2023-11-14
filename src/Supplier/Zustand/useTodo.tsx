import { create } from "zustand";
import { API_URL } from "../../Constants/URL";
import axios from "axios";
import { getData, removeData, setData } from "../LocalStorage";
import Toast from 'react-native-toast-message';

export const useTodo: any = create((set: any) => ({
    allTodos: [],
    onProgressTodo: [],
    completedTodo: [],
    isFetchedTodo: false,
    // loading state
    isLoading: { fetchTask: false, addTask: false, updateTask: false, deleteTask: false },
    // create
    addTodo: async (data: any) => {
        let token: string | number | undefined = await getData("authToken")
        useTodo.getState().isLoading.addTask = true
        if (token == -1) {
            useTodo.getState().isLoading.addTask = false
            return 0;
        }
        await axios.post(`${API_URL}/api/add-task`, { token, ...data }).then((e) => {
            if (e.data.success) {
                useTodo.getState().fetchTodo()
            }
        }).catch((e) => {
            console.log(e.response || e.message)
        }).finally(() => {
            useTodo.getState().isLoading.addTask = false
        })
    },
    // read
    fetchTodo: async () => {
        let token: string | number | undefined = await getData("authToken")
        useTodo.getState().isLoading.fetchTask = true
        set(() => ({
            isFetchedTodo: false,
        }))
        if (token == -1) {
            set(() => ({
                isFetchedTodo: true,
            }))
            useTodo.getState().isLoading.fetchTask = false
            return 0;
        }
        await axios.post(`${API_URL}/api/all-task`, { token }).then((e) => {
            if (e.data.success) {
                set({
                    allTodos: e?.data?.task?.reverse(),
                    onProgressTodo: e?.data?.task?.filter((e: any) => e = e.status === "onprogress"),
                    completedTodo: e?.data?.task?.filter((e: any) => e = e.status === "completed")
                })
            }
        }).catch((e) => {
            console.log(e.response)
        }).finally(() => {
            set({ isFetchedTodo: true })
            useTodo.getState().isLoading.fetchTask = false
        })
    },
    // update
    updateTodo: async (data:any) => {
        let token: string | number | undefined = await getData("authToken")
        useTodo.getState().isLoading.updateTask = true
        if (token == -1) {
            useTodo.getState().isLoading.updateTask = false
            return 0;
        }
        await axios.patch(`${API_URL}/api/update-task`, {token, ...data} ).then((e) => {
            if (e.data.success) {
                useTodo.getState().fetchTodo()
            }
        }).catch((e) => {
            console.log(e.response.data || e.message)
        }).finally(() => {
            useTodo.getState().isLoading.updateTask = false
        })
    },
    // delete
    deleteTodo: async (_id: number | string) => {
        let token: string | number | undefined = await getData("authToken")
        useTodo.getState().isLoading.deleteTask = true
        if (token == -1) {
            useTodo.getState().isLoading.deleteTask = false
            return 0;
        }
        await axios.delete(`${API_URL}/api/delete-task`, { data: { token, taskId:_id }}).then((e) => {
            if (e.data.success) {
                useTodo.getState().fetchTodo()
            }
        }).catch((e) => {
            console.log(e.response || e.message)
        }).finally(() => {
            useTodo.getState().isLoading.deleteTask = false
        })
    },


}))