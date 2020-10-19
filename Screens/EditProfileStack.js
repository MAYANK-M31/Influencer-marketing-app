
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import Profile from "./Profile";
import Browser from "./Browser";
import Gallery from "./Gallery";
import EditProfile from "./EditProfile"
import  Settings  from "./Settings";
import EditLocation from "./EditLocation";
import EditAge from "./EditAge";
import EditPayMode from "./EditPayMode";
import EditBudget from "./EditBudget";
import EditName from "./EditName";
import EditCategory from "./EditCategory";
import EditSocialMedia from "./EditSocialMedia";

const Stack = createStackNavigator();

const EditProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}} />
            <Stack.Screen name="EditLocation" component={EditLocation} options={{headerShown:false}} />
            <Stack.Screen name="EditAge" component={EditAge} options={{headerShown:false}} />
            <Stack.Screen name="EditPayMode" component={EditPayMode} options={{headerShown:false}} />
            <Stack.Screen name="EditBudget" component={EditBudget} options={{headerShown:false}} />
            <Stack.Screen name="EditName" component={EditName} options={{headerShown:false}} />
            <Stack.Screen name="EditCategory" component={EditCategory} options={{headerShown:false}} />
            <Stack.Screen name="EditSocialMedia" component={EditSocialMedia} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default EditProfileStack;