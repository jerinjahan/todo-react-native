import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './screens/List';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

export default function App() {
	const { user } = useAuth();
    if (user) {
		return (
			<NavigationContainer>
				<Stack.Navigator  
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName="Home"
				>
					<Stack.Screen name="Home" component={List} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	} else {
		return (
			<NavigationContainer>
				<Stack.Navigator  
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName="Welcome"
				>
					<Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
					<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}