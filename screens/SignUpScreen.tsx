//@ts-nocheck

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors';

const SignUpScreen = () => {
    const navigation = useNavigation();
    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: colors.theme }}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Welcome')} 
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-8"
                    >
                        <AntDesign name="arrowleft" size={20} color={colors.black} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center">
                    <Image 
                        source={require('../assets/images/signup.png')}
                        style={{width:200, height: 200}}
                        className="rounded-full"
                    />
                </View>
            </SafeAreaView>

            {/* Form */}
            <ScrollView>
                <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4">Full Name</Text>
                        <TextInput 
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            value="John Doe"
                            placeholder="Enter Name"
                        />


                        <Text className="text-gray-700 ml-4">Email Address</Text>
                        <TextInput 
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            value="john@gmail.com"
                            placeholder="Enter Email"
                        />

                        <Text className="text-gray-700 ml-4">Password</Text>
                        <TextInput 
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                            secureTextEntry
                            value="test1234"
                            placeholder="Enter Password"
                        />

                        <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl">
                            <Text className="font-xl font-bold text-center text-gray-700">
                                Sign Up
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

                    <View className="flex-row justify-center my-5">
                        <Text className="text-gray-500 font-semibold">Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-yellow-500 font-semibold">Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUpScreen;