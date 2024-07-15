import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './screens/List';
// import TodoLists from './screens/TodoLists';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator  
                screenOptions={{
                headerShown: false
            }}>
				<Stack.Screen name="My Todos" component={List} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}