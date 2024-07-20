
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,SafeAreaView, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../Colors';
const { height, width } = Dimensions.get('window');

const WelcomeScreen = () => {

    const navigation = useNavigation();
    let WIDTH = (width *.5);
    let HEIGHT = (height *.25);

    return (
        <SafeAreaView className="flex-1 py-8 space-y-8" style={{backgroundColor: colors.theme}}>
            <View className="flex-1 flex pt-12">
                <Text className="text-white font-bold text-4xl text-center">
                    Let's Get Started!
                </Text>
            </View>
            <View className="flex-grow flex-row pt-8 justify-center">
                <Image 
                    source={require('../assets/images/welcome.png')}
                    style={{width: WIDTH, height: WIDTH}}
                    className="rounded-full"
                />
            </View>
            <View className="space-y-4">
                <TouchableOpacity className="py-3 bg-yellow-400 mx-7 rounded-xl" onPress={() => navigation.navigate('SignUp' as never)}>
                    <Text className="text-xl font-bold text-center text-gray-700">Sign Up</Text>
                </TouchableOpacity>
                
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Aleready have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                        <Text className="font-semibold text-yellow-400" >Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>


            
        </SafeAreaView>
    )
}

export default WelcomeScreen;