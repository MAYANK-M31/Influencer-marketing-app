import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage, ToastAndroid,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { MyContext } from './AppStartStack';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg"

]

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

var _ = require('underscore');

const Chats = () => {

    const { dispatch, state } = useContext(MyContext)
    const { Chats } = state;
    const [type, settype] = useState("influencer")
    const [acceptedrequests, setacceptedrequests] = useState([])
    const navigation = useNavigation();

    useEffect(() => {



        const myfunc = async () => {

            const uid = await AsyncStorage.getItem("uid")
            const type = await AsyncStorage.getItem("type")
            settype(type)

            if (type == "influencer") {
                const ref = await firestore().collection("influencer").where("uid", "==", uid)
                ref.onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().chats) {
                            dispatch({ type: "ADD_CHATS", payload: doc.data().chats })
                        } else {
                            dispatch({ type: "ADD_CHATS", payload: [] })
                        }
                        // console.log(doc.data().chats)


                    })


                })
            } else {
                const ref = await firestore().collection("brandaccount").where("uid", "==", uid)


                ref.onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().chats) {
                            dispatch({ type: "ADD_CHATS", payload: doc.data().chats })
                        } else {
                            dispatch({ type: "ADD_CHATS", payload: [] })
                        }
                        // console.log(doc.data().chats)


                    })


                })
            }
        }
        myfunc()
    }, [])


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
        var x = new Date(item).toLocaleString()  // To Date Format from numbers

        var date = x
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








    const BrandToInfluencerChat = (item) => {
        navigation.navigate("BrandToInfluencerChat", { ChatRoom_Id: item.ChatRoom_Id, ChatData: [{ ChatRoom_Id: item.ChatRoom_Id, CreatedAt: (new Date()).toString(), influencername: item.influencername, influencerimage: item.influencerimage }], backaction: false })

    }


    const InfluencerToBrandChat = (item) => {
        navigation.navigate("InfluencerToBrandChat", { ChatRoom_Id: item.ChatRoom_Id, ChatData: [{ ChatRoom_Id: item.ChatRoom_Id, CreatedAt: (new Date()).toString(), BrandName: item.brandname, BrandImage: item.profileimage }] })

    }



    return (

        <View >

            {type == "influencer" ?
                <FlatList
                    data={Chats}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <TouchableRipple onPress={() => { InfluencerToBrandChat(item) }} rippleColor={"rgb(0,0,0,0.32)"}>
                            <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5" }} >
                                    <View style={{ width: "100%", height: "100%", borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.profileimage ? item.profileimage : images[0] }} />
                                    </View>
                                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", position: "absolute", right: 1, bottom: 2, zIndex: 1, borderWidth: 1.5, borderColor: "white" }}>
                                    </View>
                                </View>
                                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                                    <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >{item.brandname}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                                            <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                                        </View>
                                        <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableRipple>
                    )}
                />

                :

                <FlatList
                    data={Chats}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <TouchableRipple onPress={() => { BrandToInfluencerChat(item) }} rippleColor={"rgb(0,0,0,0.32)"}>
                            <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", marginTop: -10 }} >
                                    <View style={{ width: "100%", height: "100%", borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.influencerimage ? item.influencerimage : images[0] }} />
                                    </View>
                                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", position: "absolute", right: 1, bottom: 2, zIndex: 1, borderWidth: 1.5, borderColor: "white" }}>
                                    </View>
                                </View>
                                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", top: -5, justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >

                                    <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5, textTransform: "capitalize" }} >{item.influencername}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                                            <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                                        </View>
                                        <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableRipple>
                        // <TouchableRipple onPress={()=>{BrandToInfluencerChat(item)}}  >
                        //   <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }}>
                        // <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5" }} >
                        //     <View style={{ width: "100%", height: "100%", borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                        //         <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.influencerimage ? item.influencerimage : images[0] }} />
                        //     </View>
                        //     <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", position: "absolute", right: 1, bottom: 2, zIndex: 1, borderWidth: 1.5, borderColor: "white" }}>
                        //     </View>
                        // </View>
                        //     <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                        //         <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >{item.influencername}</Text>
                        //         <View style={{ flexDirection: "row", alignItems: "center" }}>
                        //             <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                        //                 <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                        //             </View>
                        //             <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >You got a new message</Text>
                        //         </View>
                        //     </View>
                        //     </View>
                        // </TouchableRipple>
                    )}
                />

            }
        </View>



    )
}

const style = StyleSheet.create({
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
        borderColor: "#e7164c",
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
        color: "#e7164c",
        fontWeight: 'bold'
    },
    button2text: {
        fontSize: 16,
        color: "white",
        fontWeight: 'bold'
    },
})



export default Chats