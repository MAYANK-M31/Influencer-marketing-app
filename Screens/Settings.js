
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const Settings = ({navigation}) => {





    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                    <Ionicons style={{marginRight:10}} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Settings</Text>
                    </View>
                    <TouchableOpacity  style={style.chat} >
                        {/* <Ionicons color={"#404852"} size={25} name={"settings"} /> */}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    header: {
        height: 50,
        width: WiDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 1
    },
    back: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        height: "100%",
        width: WiDTH / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    chat: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },


})


export default Settings;
