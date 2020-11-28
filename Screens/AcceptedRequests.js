
import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage,
    Picker,
    Image,
    ImageBackground

} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import { TextInput, DefaultTheme, TouchableRipple, Modal, Dialog, Paragraph, ActivityIndicator, Button } from "react-native-paper"
import ImagePicker from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { MyContext } from './AppStartStack';
import { FlatList } from 'react-native-gesture-handler';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


var _ = require('underscore');


const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg"

]

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
    quality: 0.6,
};



const AcceptedRequests = ({ navigation, route }) => {




    function timeTo12HrFormat(time) {   // Take a time in 24 hour format and format it in 12 hour format
        var time_part_array = time.split(":");
        var ampm = 'AM';

        if (time_part_array[0] >= 12) {
            ampm = 'PM';
        }

        if (time_part_array[0] > 12) {
            time_part_array[0] = time_part_array[0] - 12;
        }

        var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;

        return formatted_time;
    }

    const DateandTime = (item) => {
        var date = item
        var time = date.split(" ")[3]
        var formatdate = date.split(" ")[2] + " " + date.split(" ")[1] + " " + date.split(" ")[4]
        var newDate = new Date().toLocaleString().split(" ")[2]
        if (newDate == date.split(" ")[2]) {
            return "Today," + " " + timeTo12HrFormat(time)
        } else if (newDate - 1 == date.split(" ")[2]) {
            return "Yesterday," + " " + timeTo12HrFormat(time)
        } else {
            return formatdate
        }

    }
   


    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Accepted Requests</Text>
                    </View>
                    <View onPress={() => {  }} style={style.chat} >
                        
                    </View>
                </View>


                <FlatList
                    data={route.params.AcceptedRequests}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <TouchableRipple rippleColor={"rgb(0,0,0,0.32)"} onPress={() => { }} style={{ width: "100%", height: 150, paddingTop: 15, paddingHorizontal: 10, marginTop: 0, backgroundColor: "#f0f2f500" }} >
                            <>
                                <View style={{ flexDirection: "row", height: 75 }}>
                                    <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.influencerprofile ? item.influencerprofile : images[0] }} />
                                    </View>
                                    <View style={{ width: WiDTH * 0.45, height: 100, backgroundColor: "#f0f2f500", paddingLeft: 10, justifyContent: "center" }} >
                                        <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#2a3659", fontSize: 17, textTransform: "capitalize", position: "absolute", top: 0, left: 10 }} >{item.influencername}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >You got a request</Text>
                                        </View>
                                        <View style={{ width: WiDTH * 0.65, height: 30, marginTop: 5 }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", height: "100%" }}>
                                                {/* <View style={{ width: WiDTH * 0.06, height: WiDTH * 0.06, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.profileimage ? item.profileimage : images[0] }} />
                                            </View> */}
                                                <View style={{ width: "100%", height: "100%", backgroundColor: "#f0f2f500", flexDirection: "row" }} >
                                                    <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#2a3659", fontSize: 13, textTransform: "capitalize" }} >For {item.campaigntitle}</Text>
                                                    <Image style={{ width: 20, height: 20, borderRadius: 100, marginLeft: 5 }} source={{ uri: item.profileimage ? item.profileimage : images[0] }} />
                                                </View>
                                            </View>
                                        </View>


                                    </View>
                                    <View style={{ width: WiDTH * 0.30, height: 45, justifyContent: "center", }} >

                                        <View style={{ width: "100%", height: "75%", alignItems: "flex-end", alignSelf: "center", justifyContent: "flex-start" }}>
                                            <Text style={{ color: "grey", fontSize: 12 }}>{DateandTime(item.CreatedAt)} </Text>
                                        </View>


                                    </View>
                                </View>

                                {!item.accepted ?
                                    <View style={style.buttondiv} >

                                        <TouchableRipple onPress={() => { decline(item) }} borderless={true} rippleColor={"rgb(0,0,0,0.32)"} style={style.button1} >
                                            <View>
                                                <Text style={style.button1text} >Decline</Text>
                                            </View>
                                        </TouchableRipple >



                                        <TouchableRipple onPress={() => { accept(item) }} borderless={true} rippleColor={"rgb(0,0,0,0.32)"} style={style.button2} >
                                            <View  >
                                                <Text style={style.button2text} >Accept</Text>
                                            </View>
                                        </TouchableRipple >


                                    </View>
                                    :
                                    <View style={style.buttondiv} >




                                        <TouchableRipple onPress={() => { }} borderless={true} rippleColor={"rgb(0,0,0,0.32)"} style={[style.button2, { width: "98%" }]} >
                                            <View  >
                                                <Text style={style.button2text} >Chat now</Text>
                                            </View>
                                        </TouchableRipple >


                                    </View>
                                }

                            </>
                        </TouchableRipple>
                    )}
                />

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
        alignItems: "center",
        
    },
    heading: {
        height: "100%",
        width: WiDTH / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    chat: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },
    buttondiv: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button1: {
        width: WiDTH / 2.3,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#de4229",
        borderWidth: 1.5,

    },
    button2: {
        width: WiDTH / 2.3,
        height: 45,
        backgroundColor: "#409cff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#409cff",
        borderWidth: 1.5,


    },
    button1text: {
        fontSize: 16,
        color: "#de4229",
        fontWeight: 'bold'
    },
    button2text: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold'
    },
    


})


export default AcceptedRequests;

