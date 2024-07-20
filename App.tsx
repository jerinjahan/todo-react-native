import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './screens/List';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import useAuth from './hooks/useAuth';
// import * as SplashScreen from 'expo-splash-screen';
import { LogBox } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
]);

export default function App() {
	// const { user } = useAuth();
	const [showSplash, setShowSplash] = useState(true);
	const [user, setUser] = useState({});
	const [initialRouteName, setInitialRoute] = useState("Welcome");


	useEffect(() => {
		getStoreData();
	},[]);

	const getStoreData = async() => {
		let userData = await AsyncStorage.getItem('@user');
		if( userData ){
			userData = JSON.parse(userData);
			// console.log('\n\n Data from local storage uid => ',userData.uid, '& email = ', userData.email);
			setInitialRoute("Home");
			setShowSplash(false);
			console.log('\nlogged in');
		}else{
			setInitialRoute("Welcome");
			setShowSplash(false);
		}
	}

	
	// SplashScreen.preventAutoHideAsync();
	// setTimeout(SplashScreen.hideAsync, 5000);

	return (
		<>
		{showSplash ? (
                <SplashScreen />
            ) : (
				<NavigationContainer>
					<Stack.Navigator  
						screenOptions={{
							headerShown: false,
						}}
						initialRouteName={initialRouteName}
					>
						<Stack.Screen name="Home" component={List} options={{ headerShown: false }} />
						<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
						<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
						<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</>
	);
}