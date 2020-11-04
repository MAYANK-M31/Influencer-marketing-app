
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import ProfileCreateStartPage from "./ProfileCreateStartPage";
import BrandCategoryPage from "./BrandCategoryPage";
import BrandProfileCreateStartPage from "./BrandProfileCreateStartPage";
import BrandDataUpload from "./BrandDataUpload";
import BrandPostCampDetail from "./BrandPostCampDetail";
import BrandSocialConnect from "./BrandSocialConnect";
import BrandCampUpload from "./BrandCampUpload";

const Stack = createStackNavigator();

const BrandPostCampStack = () => {


    return (
    
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            
            <Stack.Screen name="BrandPostCampDetail" component={BrandPostCampDetail} options={{headerShown:false}} /> 
            <Stack.Screen name="BrandSocialConnect" component={BrandSocialConnect} options={{headerShown:false}} /> 
            <Stack.Screen name="BrandCampUpload" component={BrandCampUpload} options={{headerShown:false}} /> 
           
            {/* <Stack.Screen name="ProfileSixthPage" component={ProfileSixthtPage} options={{headerShown:false}} />  */}
        </Stack.Navigator>
       
    );
}

export default BrandPostCampStack;