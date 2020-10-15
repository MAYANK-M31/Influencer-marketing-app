
import React, { useEffect, useState } from "react"
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

const Stack = createStackNavigator();

const AppStartStack = () => {
    const [loggedin, setloggedin] = useState(null)
    const [loading, setloading] = useState(true)
    const [uploadeduser, setuploadeduser] = useState(null)

    useEffect(() => {
        setloading(true)
        const func = async () => {
            const a = await AsyncStorage.getItem("loggedin")
            const b = await AsyncStorage.getItem("datauploadeduser")
            // console.log(a);
            setloading(false)
            setloggedin(a)
            setuploadeduser(b)



        }
        func()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} >
                {loading ?
                    <Stack.Screen name="Logo" component={Logo} options={{ headerShown: false  ,animationEnabled:false}} />
                    :
                    loggedin ?
                        uploadeduser ?
                            <Stack.Screen name="Tabbar" component={Tabbar} options={{ headerShown: false ,animationEnabled:false}} />
                            :
                            <Stack.Screen name="ProfileCreateStack" component={ProfileCreationStack} options={{ headerShown: false }} />

                        :
                        <>
                            <Stack.Screen name="Choose" component={Choose} options={{ headerShown: false }} />
                            <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ headerShown: false }} />
                            <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
                            <Stack.Screen name="ProfileCreationStack" component={ProfileCreationStack} options={{ headerShown: false }} />
                            <Stack.Screen name="Tabbar" component={Tabbar} options={{ headerShown: false }} />
                        </>

                }



            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppStartStack;