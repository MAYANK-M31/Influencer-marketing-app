
import React, { useContext, useEffect } from "react"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import BrandPostCampDetail from "./BrandPostCampDetail";
import BrandSocialConnect from "./BrandSocialConnect";
import BrandCampUpload from "./BrandCampUpload";
import { MyContext } from "./AppStartStack";
import BrandPostedCamp from "./BrandPostedCamp";

const Stack = createStackNavigator();

const InsideBrandPostCamp = () => {



    return (

        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >


            <Stack.Screen name="BrandPostedCamp" component={BrandPostedCamp} options={{ headerShown: false }} />
            <Stack.Screen name="BrandPostCampDetail" component={BrandPostCampDetail} options={{ headerShown: false }} />
            <Stack.Screen name="BrandSocialConnect" component={BrandSocialConnect} options={{ headerShown: false }} />
            <Stack.Screen name="BrandCampUpload" component={BrandCampUpload} options={{ headerShown: false }} />




            {/* <Stack.Screen name="ProfileSixthPage" component={ProfileSixthtPage} options={{headerShown:false}} />  */}
        </Stack.Navigator>

    );
}

export default InsideBrandPostCamp;