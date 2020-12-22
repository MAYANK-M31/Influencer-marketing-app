import React, { useState, useCallback, useEffect, useRef,useContext } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage, BackHandler, Alert, AppState,ToastAndroid
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import { MyContext } from "../Screens/AppStartStack"
import database from '@react-native-firebase/database';

import { GiftedChat, Send, InputToolbar, Bubble } from 'react-native-gifted-chat'

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]

const BrandToInfluencerChat = ({ navigation, route }) => {


    const { state, dispatch } = useContext(MyContext)

    const [messages, setMessages] = useState([]);
    const [messagedata, setmessagedata] = useState([])
    const [myid, setmyid] = useState(null)
    const [headingData, setheadingData] = useState({ influencerimage: images[0], influencername: "name" })

    const [online, setonline] = useState(false)



    const backAction = () => {
        if (route.params.backaction == false) {

        } else {
            navigation.navigate("Search")
            return true;
        }

    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


   


    useEffect(() => {

        const chatdata = route.params.ChatData.find((data) => data.ChatRoom_Id == route.params.ChatRoom_Id) //Heading data like profileimage influencer name etc
        setheadingData(chatdata)
        // console.log(chatdata);

        const myfunc = async () => {
            const uid = await AsyncStorage.getItem("uid")
            setmyid(uid)

        }
        myfunc()

        database()
            .ref(route.params.ChatRoom_Id + "/ChatData")
            .on('value', snapshot => {
                // setmessagedata(snapshot.val())
                // setMessages(snapshot.val())
                if (snapshot.val()) {
                    const data = Object.values(snapshot.val())


                    data.sort(function (a, b) {
                        var dateA = new Date(a.createdAt).getTime();
                        var dateB = new Date(b.createdAt).getTime();
                        var Sortedarray = dateB - dateA
                        return Sortedarray
                    })
                    // console.log('User data: ', data);

                    setMessages(data)
                    // console.log("second");

                }

            });


        // To get Influencer Is online or not
        database()
            .ref(route.params.ChatRoom_Id)
            .on('value', snapshot => {
                // setmessagedata(snapshot.val())
                // setMessages(snapshot.val())
                if (snapshot.val().onlineInfluencer) {
                    setonline(snapshot.val().onlineInfluencer)

                } else {
                    setonline(false)
                }

            });


        //TO Add User(Me Brand) is online or offline
        const ref = database().ref(route.params.ChatRoom_Id)
        ref.update({ onlineBrand: true })
        dispatch({ type: "ADD_CURRENTCHATROOMID", payload: route.params.ChatRoom_Id })


        return () =>
            ref.update({ onlineBrand: false })

    }, [])

    const onSend = useCallback((messages = []) => {
        // setMessages(previousMessages => {
        //     GiftedChat.append(previousMessages, messages)
        // }
        // )

        const ref = database().ref(route.params.ChatRoom_Id + "/ChatData")
        const id = messages[0]._id
        const createdAt = database.ServerValue.TIMESTAMP
        const text = messages[0].text
        const user = messages[0].user
        const type = "influencer"

        const datas = { _id: id, createdAt: createdAt, text: text, user: user, sent: true ,type:type}
        //    console.log(datas);

        ref.push(datas)
            .then(() => {
                // GiftedChat.append(previousMessages, messages)
                // console.log('Data set.')
            })


        // console.log(messages);


        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderSend = (props) => {
        return (
            <Send {...props} containerStyle={{ width: 45, height: 45, justifyContent: "center", alignItems: "center", top: -2 }} >
                <View style={{ height: 45, width: 45, justifyContent: "center", alignItems: "center" }} >
                    <View style={{ height: 35, width: 35, backgroundColor: "#007bff", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                        <Ionicons style={{ alignSelf: "center" }} name={"arrow-right"} size={20} color={"white"} />
                    </View>
                </View>
            </Send>
        )
    }




    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: "white"
                    },
                    left: {
                        color: "black"
                    }
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f2f5',
                        borderRadius: 10,

                    },
                    right: {
                        borderRadius: 10,
                    }
                }}
            />
        )
    }

    const renderMessage = (props) => {
        return (
            <View style={{ height: 30 }}  >

            </View>
        )
    }

    // const renderInputToolbar = (props)=>{
    //     return(
    //         <InputToolbar {...props} containerStyle={{backgroundColor:"red"}} />
    //     )
    // }

    const renderComposer = (props) => {
        return (
            <View style={{ height: 60, width: WiDTH }} >
                <View style={{ height: "100%", width: "100%" }} >
                    <TextInput placeholder={"grey"} underlineColorAndroid={"transparent"} />
                </View>

            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >

            <View style={style.header} >
                <TouchableOpacity onPress={() => route.params.backaction == false ? navigation.goBack() : navigation.navigate("Search")} style={style.back} >
                    <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />

                </TouchableOpacity>

                <View style={style.heading} >

                    <View style={{ width: 30, height: 30, backgroundColor: "#f0f2f5", borderRadius: 100, marginRight: 5, overflow: 'hidden', }}>
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: headingData.influencerimage ? headingData.influencerimage : images[0] }} />
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", textTransform: "capitalize" }} >{headingData.influencername}</Text>




                </View>
                <TouchableOpacity onPress={() => { }} style={style.chat} >
                    <Ionicons color={"#404852"} size={22} name={"more-vertical"} />
                </TouchableOpacity>
            </View>

            <View style={{ height: 20, width: 50, backgroundColor: "white", borderWidth: 1, borderRadius: 10, borderColor: online ? "#01e491" : "#e7164c", position: "absolute", alignSelf: "center", top: 80, zIndex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 9, fontWeight: "bold", color: online ? "#01e491" : "#e7164c" }} >{online ? "Online" : "Offline"}</Text>
            </View>

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: myid
                }}
                renderSend={renderSend}
                minComposerHeight={45}
                maxComposerHeight={100}
                renderBubble={renderBubble}
                // renderInputToolbar={renderInputToolbar}
                listViewProps={{
                    style: {
                        backgroundColor: "white",
                        paddingBottom: 100
                    }
                }}
                showAvatarForEveryMessage={true}
                showUserAvatar={true}
                renderSystemMessage={renderMessage}
                renderAvatar={() => null}

                alignTop={true}

            />
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
        left: 5,
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
    chat: {
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

export default BrandToInfluencerChat