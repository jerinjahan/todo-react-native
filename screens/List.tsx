import { 
    View, 
    StyleSheet, 
    Pressable, 
    FlatList,
    Text,
    ToastAndroid,
    Modal,
    ActivityIndicator, 
    Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { AntDesign } from '@expo/vector-icons';

import colors from '../Colors';
import AddListModal from '../modals/AddListModal';
import TodoModal from '../modals/TodoModal';

const List = () => {
	const [todos, setTodos] = useState<any[]>([]);

	const [addTodoVisiable, setAddTodoVisiable] = useState(false);
	const [loading, setLoading] = useState(true);
	const [lists, setLists] = useState<any[]>([]);
	const [selectedItem, setSelectedItem] = useState(null);

    const [showlistVisible, setShowlistVisible] = useState(false);

    const toggleAddTodoModal = () => {
        setAddTodoVisiable(!addTodoVisiable );
    }
    const toggleListModal = (item) =>{
        setSelectedItem(item);
        setShowlistVisible(!showlistVisible);
    }

    const createTwoButtonAlert = (item) =>
        Alert.alert('', 'Are you sure want to delete this task?', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'OK', onPress: async () => {
            const ref = doc(FIRESTORE_DB, `task-lists/${item.id}`);
            try {
                await deleteDoc(ref);
                ToastAndroid.showWithGravityAndOffset(
                    'Task deleted!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            } catch (error) {
                ToastAndroid.showWithGravityAndOffset(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
        }},
    ]);

    useEffect(() => {

        // const querySnapshot = await getDocs(collection(FIRESTORE_DB, "task-lists"));
        //     querySnapshot.forEach((doc) => {
        //     console.log(`${doc.id} => ${doc.data()}`);
        // });

        const todoRef = collection(FIRESTORE_DB, 'task-lists');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: any[] = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                // console.log('all tasks = ',todos);
                setLists(todos);
                setLoading(false);
            }
        });
    
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const renderTodo = ({ item }: any) => {
        const ref = doc(FIRESTORE_DB, `task-lists/${item.id}`);
        const completedCount = item.todos.filter(todo => todo.completed).length;
        const remainingCount = item.todos.length - completedCount;

        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done });
        };

        return (
            <View>
                <Pressable 
                    style={ [styles.listContainer, { backgroundColor:item.color }]}
                    onPress={() => toggleListModal(item)} 
                    onLongPress={() => createTwoButtonAlert(item)}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {item.name}
                    </Text>
        
                    <View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>
        
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.remaining}>Completed</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        );
    };

    const addList = async ({ name, color }: any) => {
        try {
            console.log('\n \n newly added todo = ',name , color);
            const docRef = await addDoc(collection(FIRESTORE_DB, 'task-lists'), {
                name: name,
                color: color,
                done: false,
                todos: []
            });
            console.log('Document written with ID: ', docRef.id);
            ToastAndroid.showWithGravityAndOffset(
                'New task creacted!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        } catch (e) {
            console.error('Error adding document: ', e);
            ToastAndroid.showWithGravityAndOffset(
                'Error creating task!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    };
    const updateList = ({ list }: any) => {
        // this.setState({
        //     lists : this.state.lists.map(item => {
        //         return item.id === list.id ? list : item;
        //     })
        // })
    };

	return (
		<View style={styles.container}>
            <Modal 
                animationType="slide" 
                visible={addTodoVisiable}
                onRequestClose={() => toggleAddTodoModal()}
            >
                <AddListModal 
                    addList={addList} 
                    closeModal={() => toggleAddTodoModal()} 
                />
            </Modal>

            <View style={{flexDirection : "row"}}>
                <View style={styles.divider} />
                <Text style={styles.title}>
                    Todo <Text style={{fontWeight: "300", color: colors.blue}}>Lists</Text>
                </Text>
                <View style={styles.divider} />
            </View>

            <View style={{ marginVertical: 48 }}>
                <Pressable style={styles.addList} onPress={() => toggleAddTodoModal() }>
                    <AntDesign name="plus" size={16} color={colors.blue} />
                </Pressable>

                <Text style={styles.add}>Add List</Text>
            </View>

            {loading && (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size="large" color={colors.blue} />
                </View>
            )}

            {lists.length > 0 && !loading  && (
                <View style={{height: 275, paddingLeft: 16 }}>
                    <FlatList 
                        data={lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderTodo}
                        keyboardShouldPersistTaps="always"
                    />
                    <Modal 
                        animationType="slide" 
                        visible={showlistVisible} 
                        onRequestClose={ () => toggleListModal(selectedItem) }
                    >
                        <TodoModal 
                            selectedItem={selectedItem} 
                            closeModal={() => toggleListModal(selectedItem)} 
                        />
                    </Modal>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 0
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center"
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8
    },
    indicatorContainer: {
        // flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        // borderColor: 'red',
        borderWidth: 0
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
        color: colors.white,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white
    },
    subtitle: {
        color: colors.white
    },
    remaining: {
        color: colors.white
    }
});

export default List;