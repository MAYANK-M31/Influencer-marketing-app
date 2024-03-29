
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
import Jobs from "./Jobs";
import Chat from "./Chat";
import Requests from "./Requests";
import AcceptedRequests from "./AcceptedRequests";
import BrandToInfluencerChat from "./BrandToInfluencerChat";
import InfluencerToBrandChat from "./InfluencerToBrandChat";

const Stack = createStackNavigator();

const JobsStack = () => {

 

    return (
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
            <Stack.Screen name="Jobs" component={Jobs} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
            <Stack.Screen name="Requests" component={Requests} options={{ headerShown: false }} />
            <Stack.Screen name="AcceptedRequests" component={AcceptedRequests} options={{ headerShown: false }} />   
            <Stack.Screen name="BrandToInfluencerChat" component={BrandToInfluencerChat} options={{ headerShown: false }} />  
            <Stack.Screen name="InfluencerToBrandChat" component={InfluencerToBrandChat} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default JobsStack;