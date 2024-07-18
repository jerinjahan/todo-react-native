import { 
    View, 
    StyleSheet, 
    TextInput, 
    SafeAreaView, 
    Pressable, 
    FlatList,
    Text,
    ToastAndroid,
    KeyboardAvoidingView,
    Keyboard 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { 
    doc, 
    setDoc, 
    addDoc, 
    collection, 
    deleteDoc, 
    onSnapshot, 
    updateDoc, 
    getDocs,
    arrayUnion, arrayRemove
} from 'firebase/firestore';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { AntDesign, Ionicons,Entypo } from '@expo/vector-icons';
import colors from '../Colors';


// interface Todo {
// 	id: string;
// 	name: string;
// 	color: string;
//     done: boolean;
//     todos: any [];
// }

interface Todo {
	id: string;
	title : string;
	completed : boolean;
}
   
const TodoModal = ({ selectedItem,closeModal }) => {
    const [ todos, setTodos] = useState(selectedItem.todos);
    const [ taskName, setTaskName] = useState(selectedItem.name);
    const [ newTodo, setNewTodo ] = useState("");
    const taskCount = selectedItem.todos.length;
    const completedCount = selectedItem.todos.filter(todo => todo.completed).length;
    
    // Selected Task Document Reference
    const taskDocRef = doc(FIRESTORE_DB, 'task-lists', `${selectedItem.id}`);


    const toggleTodoCompleted = async (index) => {
        todos[index].completed = !todos[index].completed;
        try {
            await updateDoc(taskDocRef, {
                todos: todos
            });
        } catch (error) {
            console.log('Error occured ', error);
        }
    }

    const taskNameUpdate = async() => {
        const taskDocRef = doc(FIRESTORE_DB, `task-lists/${selectedItem.id}`);
        try {
            await updateDoc(taskDocRef, {
                name: taskName,
            })
            ToastAndroid.showWithGravityAndOffset(
                'Task name updated',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
        } catch (err) {
            console.log('Erroe occured during update', err);
        }
    }

    const addTodo = async () => {
        // collection -> document -> subCollection -> document
        try {
            await updateDoc(taskDocRef, {
                todos: arrayUnion({
                    title : newTodo,
                    completed : false
                })
            });
            // console.log("\n \n Document written with ID: ", taskDocRef);
            ToastAndroid.showWithGravityAndOffset(
                'New todo added!',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
            todos.push({
                title : newTodo,
                completed : false
            });
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
                'Error occurred during creating new todo!',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
        }
        setNewTodo("");
        Keyboard.dismiss();
    }
    const removeTodo = async (selectedTodo, index) => {
        try {
            await updateDoc(taskDocRef, {
                todos: arrayRemove(selectedTodo)
            });
            ToastAndroid.showWithGravityAndOffset(
                'Todo deleted!',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
            const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
            setTodos(newTodos);
        } catch (error) {
            console.error(error);
            ToastAndroid.showWithGravityAndOffset(
                'Error occured!',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
        }
    }
    const renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <Pressable onPress={() => toggleTodoCompleted(index)}>
                    <Ionicons 
                        name={todo.completed? 'checkbox' : 'square-outline'} 
                        size={24} 
                        color={colors.gray} 
                        style={{ width : 32 }} 
                    />
                </Pressable>
                <Text style={[styles.todo, {textDecorationLine: todo.completed ? "line-through": "none", color: todo.completed ? colors.gray : colors.black } ]}>{todo.title}</Text>
                <Ionicons 
                    name="trash-bin-outline" 
                    size={24} 
                    color="red" 
                    onPress={() => removeTodo(todo,index)} 
                />
            </View>
        );
    }

	return (
		<KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <SafeAreaView style={styles.container}>
                <Pressable 
                    style={{position: "absolute", top: 16, right: 32, zIndex:10 }}
                    onPress={closeModal}
                >
                    <AntDesign name="close" size={24} color={colors.black} />
                </Pressable>

                <View style={[styles.section, styles.header,{ borderBlockColor: selectedItem.color }]}>
                    <View>
                        <Text style={styles.title}>{selectedItem.name}</Text>
                        <Text style={styles.taskCount}>{completedCount} of {taskCount} tasks</Text>
                    </View>
                </View>

                <View style={[styles.section, {flex: 3}]}>
                    <FlatList 
                        data={todos}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item,index }) => renderTodo(item,index) } 
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <View style={[styles.section, styles.footer]}>
                    <TextInput 
                        style={[styles.input, {borderColor: selectedItem.color}]} 
                        onChangeText={text => setNewTodo(text)} 
                        value={newTodo}
                    />
                    <Pressable 
                        style={[styles.addTodo, {backgroundColor: selectedItem.color }]}
                        onPress={() => addTodo()}
                        disabled={newTodo === '' ? true : false}
                    >
                        <AntDesign name="plus" size={16} color={colors.white} />
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",                                           
        alignItems: "center",
        borderColor: "red",
        borderWidth: 0
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title:{
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "800"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderWidth:0,
        borderColor:'black'
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16,
        flex: 1
    }
})

export default TodoModal;