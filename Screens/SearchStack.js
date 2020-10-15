
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import profilePage from './Profilepage';
import Search from './Search';
import Browser from "./Browser";
import Gallery from "./Gallery";

const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            <Stack.Screen name="Search" component={Search} options={{headerShown:false}} />
            <Stack.Screen name="Profilepage" component={profilePage} options={{headerShown:false}} />
            <Stack.Screen name="Browser" component={Browser} options={{headerShown:false}} />  
            <Stack.Screen name="Gallery" component={Gallery} options={{headerShown:false,animationEnabled:false}} />    
        </Stack.Navigator>
    );
}

export default SearchStack;