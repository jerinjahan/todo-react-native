
//@ts-ignore

import React, { useState } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
    View,
    Image, 
    TextInput,
    ToastAndroid,
    LogBox, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, 
    Dimensions,
    Platform,
    StyleSheet,
    Button 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    '[2024-07-20T08:18:49.252Z]',
    'Firebase: Error (auth/invalid-credential).'
]);
const LoginScreen = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async() => {
        if(email && password){
            try {
                const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
                const user  = userCredential.user;
                console.log('\n\n logged in user data => ',JSON.stringify(user));
                await AsyncStorage.setItem('@user',JSON.stringify(user));
                return user;
            } catch (error) {
                console.log('got error => ', error.message)
                ToastAndroid.showWithGravityAndOffset(
                    error,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                throw error;
            }
        }else{
            console.log('enter else function');
            ToastAndroid.showWithGravityAndOffset(
                'Please enter email and password',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    }
    return (
        // <KeyboardAwareScrollView>
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View className="flex-1 bg-white" style={{ backgroundColor: colors.theme }}>
                        <SafeAreaView className="flex">
                            <View className="flex-row justify-start">
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Welcome" as never)} 
                                    className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-8"
                                >
                                    <AntDesign name="arrowleft" size={20} color={colors.black} />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row justify-center">
                                <Image 
                                    source={require('../assets/images/login_2.png')} style={{ width : width * .5, height: width * .5}}
                                    className="rounded-full"
                                    // className="rounded-full w-36 h-36"
                                />
                            </View>
                        </SafeAreaView>

                        {/* Form */}
                        <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingBottom: 16}}>
                            <View className="form space-y-2">
                                <Text className="text-gray-700 ml-4">Email Address</Text>
                                <TextInput 
                                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                    value={email}
                                    onChangeText={value => setEmail(value)}
                                    placeholder="Enter Email"
                                />

                                <Text className="text-gray-700 ml-4">Password</Text>
                                <TextInput 
                                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={value => setPassword(value)}
                                    placeholder="Enter Password"
                                />

                                <TouchableOpacity className="flex items-end mb-5">
                                    <Text className="text-gray-700">Forgot Password?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={handleSubmit}>
                                    <Text className="font-xl font-bold text-center text-gray-700">
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text className="text-xl text-gray-700 font-bold text-center py-2">
                                Or
                            </Text>

                            <View className="flex-row justify-center space-x-5">
                                <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                                    <Image 
                                        source={require('../assets/icon/google.png')}
                                        className="w-10 h-10"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                                    <Image 
                                        source={require('../assets/icon/apple.png')}
                                        className="w-10 h-10"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                                    <Image 
                                        source={require('../assets/icon/facebook.png')}
                                        className="w-10 h-10"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row justify-center my-4">
                                <Text className="text-gray-500 font-semibold">Don't have an account? </Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('SignUp' as never)}
                                >
                                    <Text className="text-yellow-500 font-semibold">Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        // </KeyboardAwareScrollView>

            // </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: 'space-around',
    },
    header: {
      fontSize: 36,
      marginBottom: 48,
    },
    textInput: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36,
    },
    btnContainer: {
      backgroundColor: 'white',
      marginTop: 12,
    },
  });

  
export default LoginScreen;