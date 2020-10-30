
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import ProfileCreateStartPage from "./ProfileCreateStartPage";
import BrandCategoryPage from "./BrandCategoryPage";
import BrandProfileCreateStartPage from "./BrandProfileCreateStartPage";
import BrandDetailPage from "./BrandDetailPage";
import BrandSocialMediaPage from "./BrandSocialMediaPage";
import BrandPostCampaignPage from "./BrandPostCampaignPage";

const Stack = createStackNavigator();

const BrandProfileCreationStack = () => {


    return (
        <NavigationContainer independent={true} >
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            
            <Stack.Screen name="BrandProfileCreateStartPage" component={BrandProfileCreateStartPage} options={{headerShown:false}} />   
            <Stack.Screen name="BrandCategoryPage" component={BrandCategoryPage} options={{headerShown:false}} />  
            <Stack.Screen name="BrandDetailPage" component={BrandDetailPage} options={{headerShown:false}} /> 
            <Stack.Screen name="BrandSocialMediaPage" component={BrandSocialMediaPage} options={{headerShown:false}} /> 
            <Stack.Screen name="BrandPostCampaignPage" component={BrandPostCampaignPage} options={{headerShown:false}} /> 
            
            {/* <Stack.Screen name="ProfileSixthPage" component={ProfileSixthtPage} options={{headerShown:false}} />  */}
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default BrandProfileCreationStack;