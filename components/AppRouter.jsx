import { useSelector } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { authRouters, publicRouters } from "@/routers";

const Stack = createNativeStackNavigator();

export function AppRouter() {
    const { IsAuth } = useSelector((state) => state.User);
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {(IsAuth ? authRouters : publicRouters).map(({ path, Component,options}) => (
                    <Stack.Screen 
                        key={path}
                        options={options}
                        name={path} 
                        component={Component}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}