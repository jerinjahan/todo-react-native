import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Pressable, 
    FlatList,
    Modal,
    ActivityIndicator 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from './Colors';
import tempData from './tempData';
import TodoLists from './components/TodoLists';
import AddListModal from './components/AddListModal';
import Fire from './Fire';

import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from './FirebaseConfig';

// import {db,collection, getDocs,addDoc,doc,setDoc, query,where,deleteDoc} from "./Config";
// import { collection, getDocs,doc,getDoc,query  } from "firebase/firestore";
// import { db } from "./Firebase";


export default class App extends React.Component {

    state = {
        addTodoVisiable : false,
        lists : tempData,
        user : {},
        loading : true
    }
    

    fetchMessages = async () => {
        console.log('in fet function');



        // const val = doc(db,"users",'lists');
        // const collectinVal = collection(val,"todos");

        // const getValue = await getDocs(collectinVal);

        // console.log('\n\n\n getValue ',getValue);
        // // setData(getValue.docs.map((doc)=>({...doc.data(),id:doc.id})))
        
        // getValue.docs.map((doc) => {
        //     console.log('doc id  = ', doc.id);
        //     // this.setState({lists, user}, () => {
        //     //     this.setState({ loading : false });
        //     // })   
        // });

        
        // const querySnapshot = await getDocs(collection(db, "task-lists"));
        // querySnapshot.forEach((doc) => {
        //     this.setState({lists: [...this.state.lists, {...doc.data(), id: doc.id }] });
        // });

        // db.collection('users').onSnapshot(snapshot =>{
        //     snapshot.docs.map(doc=>({
        //       doc.collection('userPosts').onSnapshot(snapshot =>{
        //         setPosts(
        //           snapshot.docs.map(doc=>({
        //             id: doc.id,
        //             post : doc.data()
        //         })));
        //       });
        //     }));
        //  });

        // await getDocs(collection(db, "task-lists"))
        //     .then((querySnapshot)=>{           
        //         const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
        //         console.log('\n\n newData => ',newData);
        //         console.log('temp data length =' ,this.state.lists.length);
        //         console.log('fetch data length =' ,newData.length);
        //         this.setState({
        //             loading : false,
        //             lists : []
        //         });
        //     })

        // const query = db.collection('lists');
        // query.onSnapshot((snapshot) => {
        //     snapshot.docChanges().forEach((change) => {
        //         const messageObj = {}
        //         messageObj.data = change.doc.data()
        //         messageObj.id = change.doc.id
        //         this.setState({
        //             ...this.state,
        //             lists: [messageObj, ...this.state.messages]
        //         })
        //     })
        // })
    }


    componentDidMount = async () =>{
        console.log("\n Connecting to firebase \n ");



        // await getDocs(collection(db, "task-lists"))
        //     .then((querySnapshot)=>{           
        //         const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
        //         console.log('\n\n newData => ',newData);
        //         console.log('temp data length =' ,this.state.lists.length);
        //         console.log('fetch data length =' ,newData.length);
        //         this.setState({
        //             loading : false,
        //             lists : []
        //         });
        //     })

        // firebase = new Fire((error, user) => {
        //     if(error){
        //         return alert("Uh oh, something went wrong");
        //     }
        // });

        // firebase.getLists(lists => {
        //     this.setState({lists, user}, () => {
        //         this.setState({ loading : false });
        //     })   
        // });


        const todoRef = collection(FIRESTORE_DB, 'task-lists');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const lists = [];
                snapshot.docs.forEach((doc) => {
                    const todos = [];
                    // console.log('\n\n\n id => ', doc.id);
                    // console.log('has todos  => ', doc.data().todos);
                    // console.log();
                    // if(doc.data().todos !== undefined){
                    //     console.log('has value');
                    // }
                    lists.push({
                        id: doc.id,
                        name : doc.data().name,
                        color : doc.data().color,
                        todos :   doc.data().todos
                    });
                });
                this.setState({
                    lists: lists,
                    loading : false
                })
                console.log('todos => ',this.state.lists);
            }
        });
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }

    componentWillUnmount() {
        // playersRef.off("value");
        // firebase.detach();
    }

    toggleAddTodoModal() {
        this.setState({ addTodoVisiable: !this.state.addTodoVisiable });
    }

    renderList = list => {
        return <TodoLists list = {list} updateList={this.updateList} />
    }

    addList = async(list) => {
        try {
            // console.log('newly added todo = ',list);
            const docRef = await addDoc(collection(FIRESTORE_DB, 'task-lists'), {
                name: list.name,
                color: list.color,
                todos: []
            });
            // this.setState({lists: [...this.state.lists, {...list, id: docRef.id, todos: [] }] });
            // console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    updateList = list => {
        this.setState({
            lists : this.state.lists.map(item => {
                return item.id === list.id ? list : item;
            })
        })
    };

    render() {
        
        // const usersCollectionRef = collection(db, "users");
        // const createUser = async () => {
        //     await addDoc(usersCollectionRef, { name: newName, marks: Number(newMarks) });
        //     getUsers();
        // };
        
        // const updateUser = async (id, marks) => {
        //     const userDoc = doc(db, "users", id);
        //     const newFields = { marks: marks + 1 };
        //     await updateDoc(userDoc, newFields);
        //     getUsers();
        // };
        
        // const deleteUser = async (id) => {
        //     const userDoc = doc(db, "users", id);
        //     await deleteDoc(userDoc);
        //     getUsers();
        // };
        
        // const getUsers = async () => {
        //     const data = await getDocs(usersCollectionRef);
        //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // };


        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={colors.blue} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Modal 
                    animationType="slide" 
                    visible={this.state.addTodoVisiable}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
                </Modal>

                <View>
                    {/* <Text>User: {this.state.user.uid} </Text> */}
                </View>

                <View style={{flexDirection : "row"}}>
                    <View style={styles.divider} />
                    <Text style={styles.title}>
                        Todo <Text style={{fontWeight: "300", color: colors.blue}}>Lists</Text>
                    </Text>
                    <View style={styles.divider} />
                </View>

                <View style={{ marginVertical: 48 }}>
                    <Pressable style={styles.addList} onPress={() => this.toggleAddTodoModal() }>
                        <AntDesign name="plus" size={16} color={colors.blue} />
                    </Pressable>

                    <Text style={styles.add}>Add List</Text>
                </View>

                <View style={{height: 275, paddingLeft: 32 }}>
                    <FlatList 
                        data={this.state.lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => this.renderList(item) } 
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});
