
import React, { useContext, useEffect, useState } from "react"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import BrandPostCampDetail from "./BrandPostCampDetail";
import BrandSocialConnect from "./BrandSocialConnect";
import BrandCampUpload from "./BrandCampUpload";
import { MyContext } from "./AppStartStack";
import BrandPostedCamp from "./BrandPostedCamp";
import InsideBrandPostCamp from "./InsideBrandPostCamp";
import Loading from "./Loading";
import firestore from "@react-native-firebase/firestore"
import { AsyncStorage } from "react-native";
import ImageReview from "./ImageReview";
import ImageReviewScroll from "./ImageReviewScroll";

const Stack = createStackNavigator();

const BrandPostCampStack = () => {

    // const [loading, setloading] = useState(true)

    // const { state, dispatch } = useContext(MyContext)
    // // const { campaignposts, campaignpostedagain } = state;


  


    return (

        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >

       
                <Stack.Screen name="InsideBrandPostCamp" component={InsideBrandPostCamp} options={{ headerShown: false }} />
                
                {/* <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} /> */}
            

        </Stack.Navigator>

    );
}

export default BrandPostCampStack;