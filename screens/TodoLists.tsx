import { 
    View, 
    StyleSheet, 
    TextInput, 
    Button, 
    SafeAreaView, 
    TouchableOpacity, 
    Pressable,
    FlatList,
    Text,
    ToastAndroid 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { Ionicons,Entypo } from '@expo/vector-icons';
import Colors from '../Colors';

// export interface Todo {
// 	id: string;
// 	name: string;
// 	color: string;
//     done: boolean;
//     todos: any [];
// }

const TodoLists = ({ list, updateList ,test}) => {
	const [todos, setTodos] = useState<any[]>([]);
	const [todo, setTodo] = useState('');
	const [showlistVisible, setShowlistVisible] = useState(false);

    // const list = this.props.list;
    // const completedCount = list.todos.filter(todo => todo.completed).length;
    // const remainingCount = list.todos.length - completedCount;

    const toggleListModal = () =>{
        setShowlistVisible(!showlistVisible);
    }

	// const addTodo = async () => {
    //     try {
    //         const docRef = await addDoc(collection(FIRESTORE_DB, 'task-lists'), {
    //             name: todo,
    //             color: "#CACACA",
    //             done: false,
    //             todos: []
    //         });
    //         setTodo('');
    //         console.log('Document written with ID: ', docRef.id);
    //     } catch (e) {
    //         console.error('Error adding document: ', e);
    //     }
    // };

    // useEffect(() => {
    //     const todoRef = collection(FIRESTORE_DB, 'task-lists');
    
    //     const subscriber = onSnapshot(todoRef, {
    //         next: (snapshot) => {
    //             const todos: any[] = [];
    //             snapshot.docs.forEach((doc) => {
    //                 todos.push({
    //                     id: doc.id,
    //                     ...doc.data()
    //                 });
    //             });
    
    //             setTodos(todos);
    //         }
    //     });
    
    //     // Unsubscribe from events when no longer in use
    //     return () => subscriber();
    // }, []);

    // const renderTodo = ({ item }: any) => {
    //     const ref = doc(FIRESTORE_DB, `task-lists/${item.id}`);
    
    //     const toggleDone = async () => {
    //         updateDoc(ref, { done: !item.done });
    //     };
    
    //     const deleteItem = async () => {
    //         deleteDoc(ref);
    //         ToastAndroid.showWithGravityAndOffset(
    //             'Task deleted!',
    //             ToastAndroid.LONG,
    //             ToastAndroid.BOTTOM,
    //             25,
    //             50,
    //         );
    //     };
    
    //     return (
    //         <View style={styles.todoContainer}>
    //             <TouchableOpacity onPress={toggleDone} style={styles.todo}>
    //                 {item.done && <Ionicons name="checkmark-circle" size={32} color="green" />}
    //                 {!item.done && <Entypo name="circle" size={32} color="black" />}
    //                 <Text style={styles.todoText}>{item.name}</Text>
    //             </TouchableOpacity>
    //             <Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
    //         </View>
    //     );
    // };

    console.log('\n\n in todo list component');
    console.log('list => ',
        test
    );

	return (
		// <View style={styles.container}>
        //     <View style={styles.form}>
        //         <TextInput
        //             style={styles.input}
        //             placeholder="Add new todo"
        //             onChangeText={(text) => setTodo(text)}
        //             value={todo}
        //         />
        //         <Button onPress={addTodo} title="Add Todo" disabled={todo === ''} />
        //     </View>

        //     {todos.length > 0 && (
        //         <View>
        //             <FlatList
        //                 data={todos}
        //                 renderItem={renderTodo}
        //                 keyExtractor={(todo) => todo.id}
        //                 // removeClippedSubviews={true}
        //             />
        //         </View>
        //     )}
        // </View>


        <View>
            {/* <Modal animationType="slide" visible={this.state.showlistVisible} onRequestClose={ () => this.toggleListModal() }>
                <TodoModal 
                    list={list} 
                    closeModal={() => this.toggleListModal()}  
                    updateList={this.props.updateList}
                />
            </Modal> */}


            <Pressable 
                // style={ [styles.listContainer, { backgroundColor:list.color }]}
                style={ [styles.listContainer, {  }]}
                onPress={() => toggleListModal()} 
                >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list}
                </Text>

                <View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>
                            {/* {completedCount} */}
                        </Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.count}>
                            {/* {remainingCount} */}
                        </Text>
                        <Text style={styles.remaining}>Completed</Text>
                    </View>

                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20
	},
	form: {
		marginVertical: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	},
	todo: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	todoText: {
		flex: 1,
		paddingHorizontal: 4
	},
	todoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
		marginVertical: 4
	},


    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        color: Colors.white
    },
    remaining: {
        color: Colors.white
    }
});


export default TodoLists;