
import React, { useEffect, useState, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Alert,
    View,
    Text,
    StatusBar,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ToastAndroid
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { MyContext } from './AppStartStack';
import { ActivityIndicator } from 'react-native-paper';


const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Loading = ({ navigation, route }) => {






    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={{ top: 100, justifyContent: "center", alignItems: "center" }} >
                    <Image style={{ height: 250, width: 250, borderRadius: 250, zIndex: 1 }} source={require("../Icons/illustartion1.jpg")} />
                    <ActivityIndicator color={"#11ece5"} size={260} style={{ top: -255 }} />
                </View>

                <Text style={{ alignSelf: "center", fontSize: 28, fontWeight: "bold", color: "#404852", textTransform: "capitalize" }} >Loading</Text>

            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    heading: {
        top: 20,
        left: 15,
        position: "absolute",
    }



})


export default Loading;
