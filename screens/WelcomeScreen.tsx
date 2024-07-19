// @ts-nocheck

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../Colors';

const WelcomeScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 py-4 space-y-6" style={{backgroundColor: colors.theme}}>
            <View className="flex-1 flex justify-around">
                <Text className="text-white font-bold text-4xl text-center">
                    Let's Get Started!
                </Text>
            </View>

            <View className="flex-row justify-center py-10 mb-10">
                <Image 
                    source={require('../assets/images/welcome.png')}
                    style={{width:300, height: 300}}
                    className="rounded-full"
                />
            </View>
            <View className="space-y-4">
                <TouchableOpacity className="py-3 bg-yellow-400 mx-7 rounded-xl" onPress={() => navigation.navigate('SignUp')}>
                    <Text className="text-xl font-bold text-center text-gray-700">Sign Up</Text>
                </TouchableOpacity>
                
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Aleready have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-400" >Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>


            
        </SafeAreaView>
    )
}

export default WelcomeScreen;