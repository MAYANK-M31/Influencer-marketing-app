
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import profilePage from './Profilepage';
import Search from './Search';
import Browser from "./Browser";
import ProfileCreateStartPage from "./ProfileCreateStartPage";
import ProfileSecondPage from "./ProfileSecondPage";
import ProfileThirdPage from "./ProfileThirdPage";
import ProfileFourthPage from "./ProfileFourthPage";
import Tabbar from "./Tabbar";
import ProfileFifthtPage from "./ProfileFifthPage";
import ProfileSixthtPage from "./ProfileSixthPage";

const Stack = createStackNavigator();

const ProfileCreationStack = () => {


    return (
        <NavigationContainer independent={true} >
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            
            <Stack.Screen name="ProfileCreateStartPage" component={ProfileCreateStartPage} options={{headerShown:false}} />   
            <Stack.Screen name="ProfileSecondPage" component={ProfileSecondPage} options={{headerShown:false}} />  
            <Stack.Screen name="ProfileThirdPage" component={ProfileThirdPage} options={{headerShown:false}} /> 
            <Stack.Screen name="ProfileFourthPage" component={ProfileFourthPage} options={{headerShown:false}} /> 
            <Stack.Screen name="ProfileFifthPage" component={ProfileFifthtPage} options={{headerShown:false}} /> 
            <Stack.Screen name="ProfileSixthPage" component={ProfileSixthtPage} options={{headerShown:false}} /> 
            {/* <Stack.Screen name="Tabbar" component={Tabbar} options={{headerShown:false}} />  */}
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ProfileCreationStack;