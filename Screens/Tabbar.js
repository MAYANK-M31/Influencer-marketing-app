import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Feather"
import Icons from "react-native-vector-icons/Ionicons"
import Home from './Home';
import Search from './Search';
import Jobs from './Jobs';
import Profile from './Profile';
import SearchStack from './SearchStack';
import MyProfileStack from './MyProfileStack';
import { MyContext } from './AppStartStack';
import BrandProfile from './BrandProfile';
import BrandPostCampaignPage from './BrandPostCampaignPage';
import BrandPostCampStack from './BrandPostCampStack';


const Tab = createBottomTabNavigator();


const Tabbar = () => {

    const { state } = useContext(MyContext)
    const { type } = state;



    return (

        <Tab.Navigator backBehavior={"initialRoute"} initialRouteName={"Home"} screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'search' : 'search';
                } else if (route.name === 'Jobs') {
                    iconName = focused ? 'briefcase' : 'briefcase';
                } else if (route.name === 'Profile') {
                    iconName = focused ? "user" : "user"
                }else if (route.name === 'Campaign') {
                    iconName = focused ? "plus-circle" : "plus-circle"
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={26} color={color} />;
            }
        })}
            tabBarOptions={{
                activeTintColor: '#2989ff',
                inactiveTintColor: 'gray',
                tabStyle: [{ backgroundColor: "white" }],
                labelStyle: { fontWeight: "bold", bottom: 9, fontSize: 10, },
                style: { height: 60 },
                keyboardHidesTabBar: true
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={SearchStack} />

            {
            type == "brand" ?
                <Tab.Screen name="Campaign" component={BrandPostCampStack} />
                :
               null
            }

            <Tab.Screen name="Jobs" component={Jobs} />
            
            {
            type == "influencer" ?
                <Tab.Screen name="Profile" component={MyProfileStack} />
                :
                <Tab.Screen name="Profile" component={BrandProfile} />
            }

        </Tab.Navigator>


    );
}

export default Tabbar