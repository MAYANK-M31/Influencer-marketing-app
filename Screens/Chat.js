import React, { useState, useCallback, useEffect } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import { MyContext } from "../Screens/AppStartStack"
import database from '@react-native-firebase/database';

import { GiftedChat, Send, InputToolbar, Bubble } from 'react-native-gifted-chat'

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height



const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [messagedata, setmessagedata] = useState([])
    const [myid, setmyid] = useState(null)


    useEffect(() => {

        const myfunc = async () => {
            const uid = await AsyncStorage.getItem("uid")
            setmyid(uid)

        }
        myfunc()

        database()
            .ref('/room1/')
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



    }, [])

    const onSend = useCallback((messages = []) => {
        // setMessages(previousMessages => {
        //     GiftedChat.append(previousMessages, messages)
        // }
        // )

        const ref = database().ref('/room1')
        const id = messages[0]._id
        const createdAt = database.ServerValue.TIMESTAMP
        const text = messages[0].text
        const user = messages[0].user

        const datas = { _id: id, createdAt: createdAt, text: text, user: user,sent:true }
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
            <View style={{height:60,width:WiDTH}} >
                <View style={{height:"100%",width:"100%"}} >
                <TextInput placeholder={"grey"} underlineColorAndroid={"transparent"}/>
                </View>
              
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >

            <View style={style.header} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                    <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />

                </TouchableOpacity>

                <View style={style.heading} >
                    <View style={{ width: 30, height: 30, backgroundColor: "#f0f2f5", borderRadius: 100, marginRight: 5, overflow: 'hidden', }}>
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Dream 11</Text>


                </View>
                <TouchableOpacity onPress={() => { }} style={style.chat} >
                    <Ionicons color={"#404852"} size={22} name={"more-vertical"} />
                </TouchableOpacity>
            </View>

            <View style={{ height: 20, width: 50, backgroundColor: "white", borderWidth: 1, borderRadius: 10, borderColor: "#01e491", position: "absolute", alignSelf: "center", top: 80, zIndex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 9, fontWeight: "bold", color: "#01e491" }} >online</Text>
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

export default Chat