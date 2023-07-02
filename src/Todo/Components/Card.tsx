import { View } from "react-native"
import { Btn, IconCard, Input, Line, PressableView, RBSheetModel, Texts } from "../../Component/LegcyUI"
import { ICONS } from "../../Icons/ICONS"
import { useState } from "react"
import { useTodo } from "../../Supplier/Zustand/useTodo"

type todo = {
    title?: string,
    createdAt?: string,
    description?: string,
    timeLeft?: string,
    onPressDone?: any,
    onPressEdit?: any,
    onPressDelete?: any,
    class?: string
    uid?: string | number
}
export const OnProgresCard = (props: todo) => {
    const { completedTodo, completeTodo, fetchTodo }: any = useTodo()
    const { title, createdAt, description, timeLeft, onPressDone, onPressEdit, uid } = props
    const [isSheet, setisSheet] = useState(false)
    const hanldePressDone = (id: string | number | undefined) => {
        completeTodo(id);
        setTimeout(() => {
            fetchTodo()
        }, 100);
    }
    return (
        <>
            <PressableView class={`p-3 rounded-xl bg-white flex-col m-2 border-b-4 border-solid border-red-400 max-w-[350] min-w-[300] ${props.class}`}>
                {/* header */}
                <View className='flex-row items-center justify-between'>
                    <Texts class="text-lg font-semibold break-words flex-1" numberOfLines={2}>{title}</Texts>
                    <IconCard iconSrc={ICONS.pencil} class="w-[40] ml-3 bg-yellow-200 p-2" style={{ tintColor: "brown" }} onPress={()=>{setisSheet(true)}} />
                </View>
                <Texts class={"opacity-50 text-sm font-normal"}>{createdAt}</Texts>
                <Line class="my-2" />
                {/* description */}
                <View>
                    <Texts class={"opacity-50 text-sm font-normal"}>description : </Texts>
                    <Texts class="text-base font-medium" numberOfLines={3}>{description}</Texts>
                </View>
                {/* action card*/}
                <View className='p-1 mt-auto'>
                    <View className='flex-row items-end justify-between mt-2'>
                        <View>
                            <Texts class={"opacity-50 text-sm font-normal"}>time left : </Texts>
                            <Texts class="text-base font-medium">{timeLeft}</Texts>
                        </View>

                        <View className='flex-row items-center'>
                            <Btn class="m-1 mt-0 p-1 px-2" textClass="text-base" onPress={() => hanldePressDone(uid)}>
                                mark as done
                            </Btn>
                        </View>
                    </View>
                </View>
            </PressableView>
            <RBSheetModel isSheetOpen={isSheet} onClose={() => { setisSheet(false) }}>
                <AddTaskCard onCancel={() => { setisSheet(false) }} propsId={uid} propsTitle={title} propsDescription={description} />
            </RBSheetModel>
        </>
    )
}


export const CompletedtaskCard = (props: todo) => {
    const { title, createdAt, description, timeLeft, onPressDelete, uid } = props;
    const { completedTodo, deleteTodo, fetchTodo }: any = useTodo()
    const [isSheet, setisSheet] = useState(false)
    const hanleDeleteTodo = (id: string | number | undefined) => {
        deleteTodo(id);
        setTimeout(() => {
            fetchTodo()
        }, 100);
        setisSheet(false)
    }
    return (
        <>
            <PressableView class='p-3 rounded-xl bg-white m-1 mx-2 border-l-8 border-solid border-red-400 '>
                {/* <Texts>complted</Texts> */}
                <View>
                    <View className='flex-row items-center justify-between'>
                        <Texts class="text-lg font-semibold flex-1" numberOfLines={2}>{title}</Texts>
                        <IconCard class="w-[30]" iconSrc={ICONS.done} />
                    </View>
                    <Texts class="text-base font-normal opacity-80" numberOfLines={3}>{description}</Texts>
                    <Line class="m-0 my-2" />
                    <View className='flex-row items-center justify-between'>
                        <Texts class={"opacity-50 text-sm font-normal"}>{createdAt}</Texts>
                        <IconCard class="w-[30]" iconSrc={ICONS.deleteIcon} onPress={() => setisSheet(true)} />
                    </View>
                </View>
            </PressableView>
            <RBSheetModel isSheetOpen={isSheet} height={250} onClose={() => { setisSheet(false) }}>
                <View className="flex-col h-full p-2 pb-6">

                    <Texts class="text-lg font-semibold border-l-8 border-solid border-red-400 p-3 py-1 rounded" numberOfLines={2}>{title}</Texts>
                    <Texts class="text-lg font-semibold mt-auto" numberOfLines={3}>are you sure want to delte this</Texts>
                    <View className='flex-row items-center justify-center my-1'>
                        <Btn class="flex-1" varient="outline" onPress={()=>{setisSheet(false)}}>no , keep</Btn>
                        <Btn class="flex-1 ml-1" onPress={()=>{hanleDeleteTodo(uid)}}>yes , delete</Btn>
                    </View>
                </View>
            </RBSheetModel>
        </>

    )
}

export const CardLoader = ()=>{
    return(
        <View>
            <Texts>hii there</Texts>
        </View>
    )
}

type AddTaskProps =  {
    propsId ?: string | number | undefined
    propsTitle ?:string | undefined
    propsDescription ?: string | undefined
    onCancel ?: any
}

export const AddTaskCard = (props: AddTaskProps) => {
    const {propsId , onCancel , propsTitle , propsDescription} = props
    const { onProgressTodo, addTodo, fetchTodo }: any = useTodo()
    const [title, settitle] = useState(propsTitle || '')
    const [description, setdescription] = useState(propsDescription || '')
    let _id = Math.floor(Math.random() * 100000)
    const date = new Date().toLocaleString();
    const todoData = {
        _id, title, description, date
    }
    console.log({propsId , onCancel , propsTitle , propsDescription})
    function handleAddTodo() {
        addTodo(todoData)
        clearAllState();
        setTimeout(() => {
            fetchTodo();
        }, 1000);
    }
    const clearAllState = () => {
        settitle('');
        setdescription('');
    }
    return (
        <View className="bg-white p-2 pb-8 h-full">
            <Texts class="text-center capitalize text-2xl font-bold mb-3">add new task</Texts>
            <Line />
            {/* input field */}
            <View>
                <Texts class="text-lg font-medium">tittle Task</Texts>
                <Input placeholder="Enter Title" autoFocus={true} value={title} onChangeText={(e: string) => { settitle(e) }} />
            </View>
            <View className='my-3'>
                <Texts class="text-lg font-medium">Description</Texts>
                <Input class="max-h-32" placeholder="Description" multiLine={true} numberOfLines={4} textAlignVertical="top" value={description} onChangeText={(e: string) => { setdescription(e) }} />
            </View>
            <View className='flex-row items-center justify-center my-1 mt-auto'>
                <Btn class="flex-1" varient="outline" onPress={() => { clearAllState();onCancel() }}>cancel</Btn>
                {propsId ? 
                <Btn class="flex-1 ml-1" onPress={() => { handleAddTodo(); onCancel() }}>Update</Btn>
                :
                <Btn class="flex-1 ml-1" onPress={() => { handleAddTodo(); onCancel() }}>add</Btn>
                }
            </View>
        </View>
    )
}