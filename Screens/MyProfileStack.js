
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import Profile from "./Profile";
import Browser from "./Browser";
import Gallery from "./Gallery";
import EditProfile from "./EditProfile"
import  Settings  from "./Settings";
import EditProfileStack from "./EditProfileStack";
import AddAbout from "./AddAbout";
import AddAchievements from "./AddAchievements";
import AddExperience from "./AddExperience";
import ImageReview from "./ImageReview";
import ProfilePicture from "./ProfilePicture";
import ProfileBackground from "./ProfileBackground";

const Stack = createStackNavigator();

const MyProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
            <Stack.Screen name="Browser" component={Browser} options={{headerShown:false}} />  
            <Stack.Screen name="Gallery" component={Gallery} options={{headerShown:false,animationEnabled:false}} />   
            <Stack.Screen name="EditProfileStack" component={EditProfileStack} options={{headerShown:false}} /> 
            <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}} />   
            <Stack.Screen name="AddAbout" component={AddAbout} options={{headerShown:false}} />
            <Stack.Screen name="AddAchievements" component={AddAchievements} options={{headerShown:false}} />
            <Stack.Screen name="AddExperience" component={AddExperience} options={{headerShown:false}} />
            <Stack.Screen name="ImageReview" component={ImageReview} options={{headerShown:false,animationEnabled:false}} />   
            <Stack.Screen name="ProfilePicture" component={ProfilePicture} options={{headerShown:false,animationEnabled:false}} /> 
            <Stack.Screen name="ProfileBackground" component={ProfileBackground} options={{headerShown:false,animationEnabled:false}} /> 
        </Stack.Navigator>
    );
}

export default MyProfileStack;