import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen} from "../screens/Home"
import { Menu } from './Menu';


const Stack = createNativeStackNavigator();

export const Navigator = () => {
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{title:"Меню"}} name = "Menu" component={Menu}/>
            <Stack.Screen options={{title:"Главная"}} name = "Home" component={HomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
}