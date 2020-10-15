
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Button,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Logo = ({ navigation }) => {



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>

                <Text style={{ alignSelf: "center", fontSize: 42, fontWeight: "bold", color: "#404852" }} >𝐈𝐍𝐅𝐋𝐔𝐄𝐍𝐙𝐀</Text>

            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
  



})


export default Logo;
