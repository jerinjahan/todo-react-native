import { View, Text, SafeAreaView,Image } from 'react-native';
import React from 'react';

const SplashScreen = () => {
    return (
        <SafeAreaView className="flex-1 justify-center items-center py-4">
            <Image 
                source={require('../assets/adaptive-icon.png')}
                className="rounded-full w-40 h-40"
            />
        </SafeAreaView>
    )
}

export default SplashScreen;