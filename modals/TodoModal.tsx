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
    ToastAndroid,
    Modal,
    ActivityIndicator 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { AntDesign, Ionicons,Entypo } from '@expo/vector-icons';
import colors from '../Colors';

const TodoModal = () => {
	return (
		<View style={styles.container}>
            
        </View>
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
        alignItems: "center"
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    }
})

export default TodoModal;