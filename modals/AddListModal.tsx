import { Text, StyleSheet, View, KeyboardAvoidingView, Pressable, TextInput,ToastAndroid } from "react-native";
import React, { useState } from "react";
import { AntDesign } from '@expo/vector-icons';

import colors from '../Colors';

interface INewTaskEntryProps {
    addList : (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>; 
}


const AddListModal = ({ addList,closeModal }) => {
    const backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];
    const [name , setName] = useState("");
    const [color , setColor] = useState(backgroundColors[0]);

    const createTodo = () => {
        if(name === ''){
            ToastAndroid.showWithGravityAndOffset(
                'Please enter task name',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }else{
            addList({name, color});
            setName("");
            setColor(backgroundColors[0]);
            closeModal();
        }
        
    }

    const renderColors = () =>{
        return backgroundColors.map(color => {
            return (
                <Pressable 
                    key={color} 
                    style={[styles.colorSelect, {backgroundColor: color } ]} 
                    onPress={() => setColor(color)} 
                />
            )
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Pressable style={{ position: "absolute", top: 16, right:32 }} 
                onPress={() => closeModal()}
            >
                <AntDesign name="close" size={24} color={colors.black} />
            </Pressable>

            <View style={{alignSelf: "stretch", marginHorizontal: 32, borderColor: "red", borderWidth: 0 }}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="List Name" 
                    onChangeText={text => setName(text)} 
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                    {renderColors()}
                </View>

                <Pressable 
                    style={[styles.create, {backgroundColor : color}]}
                    onPress={createTodo}

                    // onPress={addList}
                >
                    <Text style={{color: colors.white, fontWeight: "600"}}>Create!</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",                                           
        alignItems: "center",
        borderColor: "red",
        borderWidth: 0
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width : 30,
        height: 30,
        borderRadius: 4
    }
})

export default AddListModal;