
import React, { useEffect, useState, createContext, useReducer } from "react"
import { AsyncStorage } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import profilePage from './Profilepage';
import Tabbar from "./Tabbar";
import Choose from "./Choose";
import PhoneNumber from "./PhoneNumber";
import OTP from "./OTP";
import Logo from "./Logo";
import ProfileCreatePage from "./ProfileCreateStartPage";
import ProfileCreationStack from "./ProfileCreationStack";
import { reducer, initState } from "../reducer/reducer"

const Stack = createStackNavigator();



export const MyContext = createContext()



const AppStartStack = () => {


    const [state, dispatch] = useReducer(reducer, initState)
    const {isloggedin,uploadeduser} = state;




   
    const [loading, setloading] = useState(true)

    useEffect(() => {
        setloading(true)
        const func = async () => {
            const a = await AsyncStorage.getItem("loggedin")
            const b = await AsyncStorage.getItem("datauploadeduser")
            setloading(false)
            dispatch({type:"ADD_LOGGEDIN",payload:a})
            dispatch({type:"ADD_UPLOADEDUSER",payload:b})



        }
        func()
    }, [])

    return (
        <MyContext.Provider value={
            { state, dispatch }
        }>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >

                    {loading ?
                    <Stack.Screen name="Logo" component={Logo} options={{ headerShown: false  ,animationEnabled:false}} />
                    :
                    isloggedin ?
                        uploadeduser ?
                            <Stack.Screen name="Tabbar" component={Tabbar} options={{ headerShown: false ,animationEnabled:false}} />
                            :
                            <Stack.Screen name="ProfileCreateStack" component={ProfileCreationStack} options={{ headerShown: false }} />

                        :
                        <>
                            <Stack.Screen name="Choose" component={Choose} options={{ headerShown: false }} />
                            <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ headerShown: false }} />
                            <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
                            {/* <Stack.Screen name="ProfileCreationStack" component={ProfileCreationStack} options={{ headerShown: false }} />
                            <Stack.Screen name="Tabbar" component={Tabbar} options={{ headerShown: false }} /> */}
                        </>

                }



                </Stack.Navigator>
            </NavigationContainer>
        </MyContext.Provider>
    );
}

export default AppStartStack;