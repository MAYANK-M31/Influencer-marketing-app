
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import Profile from "./Profile";
import Browser from "./Browser";
import Gallery from "./Gallery";
import EditProfile from "./EditProfile"
import  Settings  from "./Settings";
import EditProfileStack from "./EditProfileStack";

const Stack = createStackNavigator();

const MyProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
            <Stack.Screen name="Browser" component={Browser} options={{headerShown:false}} />  
            <Stack.Screen name="Gallery" component={Gallery} options={{headerShown:false,animationEnabled:false}} />   
            <Stack.Screen name="EditProfileStack" component={EditProfileStack} options={{headerShown:false}} /> 
            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}} />   
        </Stack.Navigator>
    );
}

export default MyProfileStack;