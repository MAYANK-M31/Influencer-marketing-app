
import React from "react"
import {createStackNavigator,CardStyleInterpolators} from "@react-navigation/stack"
import EditBrandProfile from "./EditBrandProfile";
import BrandProfile from "./BrandProfile";


const Stack = createStackNavigator();

const BrandProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} >
            <Stack.Screen name="BrandProfile" component={BrandProfile} options={{headerShown:false}} />
            <Stack.Screen name="EditBrandProfile" component={EditBrandProfile} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default BrandProfileStack;