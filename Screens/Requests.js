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

const Requests = () => {

    const { dispatch, state } = useContext(MyContext)
    const { requestsent, RequestsGot } = state;
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
                        if (doc.data().requestssent) {
                            dispatch({ type: "ADD_REQUESTSENT", payload: doc.data().requestssent })
                        } else {
                            dispatch({ type: "ADD_REQUESTSENT", payload: [] })
                        }
                        // console.log(doc.data().requestssent)


                    })


                })
            } else {
                const ref = await firestore().collection("brandaccount").where("uid", "==", uid)
                ref.onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().requests) {
                            var NewRequests_array = []
                            var AcceptedRequests_array = []

                            for (var i = 0; i < doc.data().requests.length; i++) {
                                if (doc.data().requests[i].accepted == false) {
                                    NewRequests_array.push(doc.data().requests[i])
                                    var unique = _.uniq(NewRequests_array)
                                    dispatch({ type: "ADD_REQUESTSGOT", payload: unique })
                                } else if (doc.data().requests[i].accepted == true) {
                                    AcceptedRequests_array.push(doc.data().requests[i])
                                    var unique = _.uniq(AcceptedRequests_array)
                                    setacceptedrequests(unique)
                                }
                            }
                        } else {
                            dispatch({ type: "ADD_REQUESTSGOT", payload: [] })
                        }
                        // console.log(doc.data().requests)


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

    const accept = async (data) => {
        const docId = await AsyncStorage.getItem("DocId")
        const ref = await firestore().collection("brandaccount").doc(docId)

        var ChatRoom_Id = Math.random().toString(36).slice(2)  //Random ChatRoom Ids
        const ref3 = database().ref(ChatRoom_Id)  // Realtime database refernce 

        removeToUpdateInfluencer({ data, ChatRoom_Id })

        ref.update({
            requests: firestore.FieldValue.arrayRemove(data)
        }).then(async () => {
            const ref3 = database().ref(ChatRoom_Id)  // Realtime database refernce 
            ref3.set({ online: true })
                .then(async () => {
                    data.accepted = true
                    data.AcceptedOn = Date.now()
                    data.ChatRoom_Id = ChatRoom_Id
                    ref.update({
                        requests: firestore.FieldValue.arrayUnion(data),
                        chats: firestore.FieldValue.arrayUnion({ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), influencerimage: data.influencerprofile ? data.influencerprofile : null, influencername: data.influencername })   // Adding chat Information to Influenceraccount

                    }).then(async () => {
                        //    ref3.push(null)
                        ToastAndroid.show("Chat Now", ToastAndroid.SHORT)
                    })
                }).catch((e) => {
                    console.log(e);

                })

        })

    }


    const decline = (data) => {


    }


    const removeToUpdateInfluencer = async ({ data, ChatRoom_Id }) => {

        const ref2 = await firestore().collection("influencer").doc(data.InfluencerDocId)

        alert(ChatRoom_Id)

        ref2.update({
            requestssent: firestore.FieldValue.arrayRemove(data)
        }).then(async () => {
            const ref3 = database().ref(ChatRoom_Id)  // Realtime database refernce 
            ref3.set({ online: true })
                .then(async () => {
                    data.accepted = true
                    data.AcceptedOn = Date.now()
                    data.ChatRoom_Id = ChatRoom_Id
                    ref2.update({
                        requestssent: firestore.FieldValue.arrayUnion(data),
                        chats: firestore.FieldValue.arrayUnion({ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), profileimage: data.profileimage ? data.profileimage : null, brandname: data.campaigntitle })   // Adding chat Information to Influenceraccount
                    }).then(async () => {
                        alert("send")
                    }).catch((e) => {
                        console.log(e);

                    })
                }).catch((e) => {
                    console.log(e);

                })

        })
    }

const ChatRoom = (item)=>{
    navigation.navigate("BrandToInfluencerChat", { ChatRoom_Id: item.ChatRoom_Id, ChatData: [{ ChatRoom_Id: item.ChatRoom_Id, CreatedAt: (new Date()).toString(), influencername: item.influencername, influencerimage:item.influencerimage}],backaction:false  })

}


const InfluencerSideChat = (item)=>{
    navigation.navigate("InfluencerToBrandChat", { ChatRoom_Id: item.ChatRoom_Id, ChatData: [{ ChatRoom_Id: item.ChatRoom_Id, CreatedAt: (new Date()).toString(), BrandName:item.campaigntitle, BrandImage:item.profileimage }] })

}



    return (

        <View >
            {acceptedrequests.length > 0 ?
                <View style={{ width: "100%", height: 60, flexDirection: "row", backgroundColor: "#f0f2f500", alignItems: "center", paddingHorizontal: 15, borderBottomColor: "#f0f2f5", borderBottomWidth: 0.2 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("AcceptedRequests", { AcceptedRequests: acceptedrequests })} style={{ width: "30%", height: "65%", flexDirection: "row", backgroundColor: "#f0f2f5", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#2a365a" }} >Accepted</Text>
                        <View style={{ height: 14, width: 14, backgroundColor: "#00ca95", justifyContent: "center", alignItems: "center", borderRadius: 50, left: 5, top: 0 }}>
                            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{acceptedrequests.length}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                null
            }
            {type == "influencer" ?
                <FlatList
                    data={requestsent}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => (
                        <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                            <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.profileimage ? item.profileimage : images[0] }} />
                            </View>
                            <View style={{ width: WiDTH * 0.50, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                                <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#2a3659", fontSize: 17, top: -5, textTransform: "capitalize" }} >{item.campaigntitle}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {/* <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                                       <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                                         </View> */}
                                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >{!item.accepted ? "Your request is sent" : "Your request is accepted"}</Text>
                                </View>
                            </View>
                            <View style={{ width: WiDTH * 0.25, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                                <View style={{ width: 80, height: 30, backgroundColor: "white", borderWidth: 1, alignSelf: "center", borderColor: item.accepted ? "#e7164c" : "#409cff", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity activeOpacity={1} onPress={()=> item.accepted ?  InfluencerSideChat(item) : null } style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "center" }}>
                                        <Text style={{ color: item.accepted ? "#e7164c" : "#409cff" }}>{item.accepted ? " Chat now" : "Sent"} </Text>
                                        {item.accepted ?
                                            null
                                            :
                                            <Ionicons size={15} color={"#409cff"} name={"check"} />
                                        }
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )}
                />

                :

                <FlatList
                    data={RequestsGot}
                    contentContainerStyle={{ paddingBottom: 150 }}
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




                                        <TouchableRipple onPress={() => {ChatRoom(item) }} borderless={true} rippleColor={"rgb(0,0,0,0.32)"} style={[style.button2, { width: "98%" }]} >
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



export default Requests