
import React, { useContext } from "react"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import profilePage from './Profilepage';
import Search from './Search';
import Browser from "./Browser";
import Gallery from "./Gallery";
import BrandSearch from "./BrandSearch";
import BrandDetail from "./BrandDetail";
import ImageReviewScroll from "./ImageReviewScroll";
import { MyContext } from "./AppStartStack";
import BrandSendMessage from "./BrandSendMessage";
import BrandToInfluencerChat from "./BrandToInfluencerChat";

const Stack = createStackNavigator();

const SearchStack = () => {

    const { state } = useContext(MyContext)
    const { type } = state;

    return (
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
            {
                type == "brand" ? 
                    <>
                        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                        <Stack.Screen name="Profilepage" component={profilePage} options={{ headerShown: false }} />
                        <Stack.Screen name="BrandSendMessage" component={BrandSendMessage} options={{ headerShown: false,animationEnabled:false }} />
                        <Stack.Screen name="BrandToInfluencerChat" component={BrandToInfluencerChat} options={{ headerShown: false }} />
                    </>
                    :
                    null
            }
            {
                type == "influencer" ?
                    <>
                        <Stack.Screen name="BrandSearch" component={BrandSearch} options={{ headerShown: false }} />                  
                        <Stack.Screen name="BrandDetail" component={BrandDetail} options={{ headerShown: false }} />
                        <Stack.Screen name="ImageReviewScroll" component={ImageReviewScroll} options={{ headerShown: false }} />
                       
                    </>
                    :
                    null
            }
            <Stack.Screen name="Browser" component={Browser} options={{ headerShown: false }} />
            <Stack.Screen name="Gallery" component={Gallery} options={{ headerShown: false, animationEnabled: false }} />
        </Stack.Navigator>
    );
}

export default SearchStack;