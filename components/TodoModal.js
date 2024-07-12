import { 
    Text, 
    StyleSheet, 
    View, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
    TextInput, 
    SafeAreaView,
    FlatList,
    Keyboard 
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from "../Colors";
import tempData from "../tempData";

export default class TodoModal extends React.Component {
    state = {
        newTodo : ""
    }

    toggleTodoCompleted = index => {
        let list = this.props.list;
        console.log('before click ', list.todos[index]);
        list.todos[index].completed = !list.todos[index].completed;
        console.log('after click ', list.todos[index]);

        this.props.updateList(list);
    }

    addTodo = () => {
        let list = this.props.list;
        list.todos.push({
            title : this.state.newTodo,
            completed : false
        });
        this.setState({ newTodo: "" });
        Keyboard.dismiss();
    }

    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Ionicons 
                        name={todo.completed? 'checkbox' : 'square-outline'} 
                        size={24} 
                        color={colors.gray} 
                        style={{ width : 32 }} 
                    />
                </TouchableOpacity>
                <Text style={[styles.todo, {textDecorationLine: todo.completed ? "line-through": "none", color: todo.completed ? colors.gray : colors.black } ]}>{todo.title}</Text>
            </View>
        );
    }

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed).length;

        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity 
                        style={{position: "absolute", top: 16, right: 32, zIndex:10 }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name="close" size={24} color={colors.black} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header,{ borderBlockColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>{completedCount} of {taskCount} tasks</Text>
                        </View>
                    </View>

                    <View style={[styles.section, {flex: 3}]}>
                        <FlatList 
                            data={list.todos}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item,index }) => this.renderTodo(item,index) } 
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]}>
                        <TextInput 
                            style={[styles.input, {borderColor: list.color}]} 
                            onChangeText={text => this.setState({newTodo : text})} 
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity 
                            style={[styles.addTodo, {backgroundColor: list.color }]}
                            onPress={() => this.addTodo()}
                        >
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

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