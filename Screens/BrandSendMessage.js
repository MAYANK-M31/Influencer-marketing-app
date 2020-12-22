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
    Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage, ToastAndroid, Keyboard
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import { MyContext } from "../Screens/AppStartStack"
import database from '@react-native-firebase/database';
import { TouchableRipple } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]


const BrandSendMessage = ({ navigation, route }) => {


    const { dispatch, state } = useContext(MyContext)
    const { AllBrandAccountData, InfluencerChatData } = state;

    const [message, setmessage] = useState("")
    const [loading, setloading] = useState(true)
    const [loading2, setloading2] = useState(false)

    const InfluencerId = route.params.UserId

    // console.log(InfluencerId);

    useEffect(() => {

        if (InfluencerChatData.length > 0) {
            setloading(true)
            for (var i = 0; i < InfluencerChatData.length; i++) {
                if (InfluencerChatData[i].uid == InfluencerId) {
                    AllBrandAccountData.chats.find((data) =>
                        InfluencerChatData[i].ChatRoom_Id == data.ChatRoom_Id
                    ) ? navigation.navigate("BrandToInfluencerChat", { ChatRoom_Id: InfluencerChatData[i].ChatRoom_Id, ChatData: AllBrandAccountData.chats })
                        :
                        setloading(false)
                } else {
                    setloading(false)
                }



            }
        } else {
            setloading(false)
        }



    }, [])


    const Sendmessage = async () => {
        setloading(true)
        setloading2(true)
        const uid = await AsyncStorage.getItem("uid") // BrandAccount Id

        if (!/[^\s]/.test(message) == true) {
            ToastAndroid.show("Please Enter Message", ToastAndroid.SHORT)
        } else {
            var ChatRoom_Id = Math.random().toString(36).slice(2)  //Random ChatRoom Ids
            var RandomMessageId = Math.random().toString(36).slice(2)

            Keyboard.dismiss()

            const docid = await AsyncStorage.getItem("DocId")

            const ref = await firestore().collection("influencer").where("uid", "==", InfluencerId)
            const ref2 = await firestore().collection("brandaccount").doc(docid)

            ref.get().then(async (res) => {
                const InfluencerDocId = res._docs[0]._ref._documentPath._parts[1]
                const ref0 = await firestore().collection("influencer").doc(InfluencerDocId)
                ref0.update({
                    chats: firestore.FieldValue.arrayUnion({ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), profileimage: AllBrandAccountData.profileimage ? AllBrandAccountData.profileimage : null, brandname: AllBrandAccountData.brandname })   // Adding chat Information to Influenceraccount
                }).then(() => {
                    alert("success")
                    ref2.update({
                        chats: firestore.FieldValue.arrayUnion({ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), influencername: route.params.name, influencerimage: route.params.profileimage })   // Adding chat Information to brandaccount
                    }).then(() => {
                        const ref3 = database().ref(ChatRoom_Id+"/ChatData")
                        const id = RandomMessageId
                        const createdAt = database.ServerValue.TIMESTAMP
                        const text = message
                        const user = { _id: uid }

                        const datas = { _id: id, createdAt: createdAt, text: text, user: user, sent: true }
                        //    console.log(datas);

                        ref3.push(datas)
                            .then(() => {
                                if (AllBrandAccountData.chats) {  // If Brand has send alredy send messages previosly to push chat data 
                                    var chats = AllBrandAccountData.chats
                                    chats.push({ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), influencername: route.params.name, influencerimage: route.params.profileimage })
                                    AllBrandAccountData.chats = chats
                                    dispatch({ type: "ADD_ALLBRANDACCOUNTDATA", payload: AllBrandAccountData })

                                    // Influencer chat data update
                                    InfluencerChatData.push({ ChatRoom_Id: ChatRoom_Id, uid: InfluencerId })
                                    dispatch({ type: "ADD_INFLUENCERCHATDATA", payload: InfluencerChatData })

                                    navigation.navigate("BrandToInfluencerChat", { ChatRoom_Id: ChatRoom_Id, ChatData: [{ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), influencername: route.params.name, influencerimage: route.params.profileimage }] })
                                    setloading(false)
                                } else {
                                    AllBrandAccountData.chats = [{ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), influencername: route.params.name, influencerimage: route.params.profileimage }]
                                    dispatch({ type: "ADD_ALLBRANDACCOUNTDATA", payload: AllBrandAccountData })

                                    // Influencer chat data update
                                    InfluencerChatData.push({ ChatRoom_Id: ChatRoom_Id })
                                    InfluencerChatData.push({ ChatRoom_Id: ChatRoom_Id, uid: InfluencerId })

                                    navigation.navigate("BrandToInfluencerChat", { ChatRoom_Id: ChatRoom_Id, ChatData: [{ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString(), influencername: route.params.name, influencerimage: route.params.profileimage }] })
                                    setloading(false)
                                }


                            }).catch((e) => {
                                setloading(false)
                                console.log(e);
                                
                                ToastAndroid.show("Something went wrong Try Again1", ToastAndroid.SHORT)
                            })
                    }).catch((e) => {
                        setloading(false)
                        console.log(e);
                        ToastAndroid.show("Something went wrong Try Again2", ToastAndroid.SHORT)
                    })

                }).catch((e) => {
                    setloading(false)
                    ToastAndroid.show("Something went wrong Try Again", ToastAndroid.SHORT)
                })
            }).catch((e) => {
                setloading(false)
                ToastAndroid.show("Something went wrong Try Again", ToastAndroid.SHORT)
            })


            // ref.update({
            //     chats: firestore.FieldValue.arrayUnion({ ChatRoom_Id: ChatRoom_Id, CreatedAt: (new Date()).toString() })
            // }).then(() => {

            // })



        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >

            {loading ?
                <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}  >
                    <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "white", height: 300 }} >
                        <View style={{ height: 200, width: 200, borderRadius: 200, backgroundColor: "white", justifyContent: "center", position: "absolute", alignItems: "center", elevation: 3, zIndex: 10 }}>
                            <Image style={{ height: 100, width: 100 }} source={require("../Icons/chat.png")} />
                        </View>
                        <ActivityIndicator color={"#11ece5"} size={250} style={{ position: "absolute", zIndex: -10 }} />
                        {/* <Text style={{ alignSelf: "center", fontSize: 28, fontWeight: "bold", color: "#404852", textTransform: "capitalize" }} >Loading</Text> */}
                    </View>
                    {
                        loading2 ?
                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#003034" }} >Do not Press Any Button</Text>
                            :
                            null
                    }


                </View>
                :
                <>
                    <View style={style.header} >
                        <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                            <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"x"} />
                        </TouchableOpacity>

                        <View style={style.heading} >
                            <View style={{ width: 30, height: 30, backgroundColor: "#f0f2f500", borderRadius: 100, marginRight: 5, overflow: 'hidden', justifyContent: "center", alignItems: "center" }}>
                                <Image style={{ width: "70%", height: "70%" }} source={require("../Icons/navigation.png")} />
                            </View>

                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Send Message</Text>


                        </View>
                        <TouchableOpacity onPress={() => { }} style={style.BrandSendMessage} >
                            {/* <Ionicons color={"#404852"} size={22} name={"more-vertical"} /> */}
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.7 }} >
                        <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", paddingBottom: 150 }} >
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 50 }}>
                                <View style={{ width: 55, height: 55, borderRadius: 50, backgroundColor: "#f0f2f5", overflow: "hidden", right: -10, zIndex: 1, borderWidth: 2, borderColor: "white" }}>
                                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: AllBrandAccountData.profileimage ? AllBrandAccountData.profileimage : images[0] }} />
                                </View>
                                <View style={{ width: 55, height: 55, borderRadius: 50, backgroundColor: "#f0f2f5", overflow: "hidden", borderWidth: 2, borderColor: "white" }}>
                                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: route.params.profileimage ? route.params.profileimage : images[0] }} />
                                </View>
                            </View>
                            <View style={{ width: "70%" }}>
                                <Text style={{ fontSize: 19, color: "#404852", marginTop: 20, fontWeight: "bold", textAlign: "center" }} >Write a mesage to <Text style={{ textTransform: "capitalize" }} >{route.params.name}</Text> now!</Text>
                            </View>

                            <View style={{ width: "90%", maxHeight: 100, marginTop: 40 }}>
                                <TextInput value={message} onChangeText={(text) => { setmessage(text) }} placeholder={"Type Your message here"} multiline={true} style={{ fontSize: 16, maxHeight: 100 }} underlineColorAndroid={"#10bb67"} />
                            </View>

                        </ScrollView>

                    </View>

                    <View style={{ flex: 0.3, alignItems: "center" }}>
                        <TouchableRipple borderless={true} rippleColor={"white"} onPress={() => { Sendmessage() }} style={{ width: "90%", height: 50, backgroundColor: "#32d736", justifyContent: "center", alignItems: "center", borderRadius: 10, position: "absolute", bottom: 20 }}
                            style={{ width: "90%", height: 50, backgroundColor: "#32d736", justifyContent: "center", alignItems: "center", borderRadius: 10, position: "absolute", bottom: 20 }}>
                            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", textAlign: "center" }} >Send</Text>
                        </TouchableRipple>
                    </View>
                </>
            }
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        height: 50,
        width: WiDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    },
    back: {
        height: "100%",
        width: WiDTH * 0.25,
        left: 10,
        justifyContent: "center",


    },
    heading: {
        height: "100%",
        width: WiDTH * 0.50,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center"
    },
    BrandSendMessage: {
        height: "100%",
        width: WiDTH * 0.25,
        justifyContent: "center",
        alignItems: "flex-end",
        right: 15,
    },
    headingtext: {
        color: "#404852",
        fontSize: 22,
        fontWeight: "bold",
        left: 5

    },

    text: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold"

    },
})

export default BrandSendMessage