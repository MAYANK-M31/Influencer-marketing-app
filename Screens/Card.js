
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
    Image
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import { TouchableRipple } from 'react-native-paper';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
import { useNavigation } from '@react-navigation/native';
import { MyContext } from './AppStartStack';


const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]

var abbreviate = require('number-abbreviate')

const Card = (props) => {

    const { dispatch, state } = useContext(MyContext)
    const { AllBrandAccountData } = state;

    const navigation = useNavigation()

    const [followers, setfollowers] = useState(null)
    const [instaposts, setinstaposts] = useState(null)
    const [subs, setsubs] = useState(null)
    const [views, setviews] = useState(null)
    const [profileimage, setprofileimage] = useState(null)
    const [backgroundimage, setbackgroundimage] = useState(null)


    useEffect(() => {

       

        if (props.instausername == undefined) {

        } else {
            // console.log(JSON.parse(props.instausername).data[0].username); 
            const func = async () => {
                await axios.get(`https://www.instagram.com/${JSON.parse(props.instausername).data[0].username}/?__a=1`).then((res) => {
                    setfollowers(res.data.graphql.user.edge_followed_by.count)
                    // console.log(res.data.graphql.user.edge_followed_by.count);
                    // console.log(JSON.parse(props.instausername).data.length);

                    setinstaposts(JSON.parse(props.instausername).data.length)
                })
            }
            func()
        }

        if (props.youtubedata == undefined) {

        } else {
            setsubs(JSON.parse(props.youtubedata).items[0].statistics.subscriberCount)
            setviews(JSON.parse(props.youtubedata).items[0].statistics.viewCount)
            // console.log(JSON.parse(props.youtubedata).items[0].statistics);

        }

        const image = props.profileimage
        // profile image logic
        if (image !== undefined) {
            setprofileimage(JSON.parse(image))


        }



    }, [])



    return (
        <>
            <View style={style.card} >
                <View style={style.insidecard} >
                    <View style={style.cardleft} >
                        <View style={{ borderRadius: 120 / 2, height: 100, width: 100, overflow: "hidden", elevation: 5 }}>
                            <Image style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6" }} source={{ uri: profileimage ? profileimage : images[0] }} />
                        </View>
                    </View>
                    <View style={style.cardright} >
                        <View style={{ height: "100%" }} >
                            <Text style={style.name} >{props.name}</Text>
                            <Text style={style.category} >{props.category}</Text>
                            {subs || views ?
                                <View style={{ width: "100%", height: 30, flexDirection: "row", alignItems: "center", marginTop: 3 }}>
                                    <Image style={{ width: 25, height: 25 }} source={require("../Icons/youtube.png")} />
                                    <Text style={{ fontSize: 14, marginLeft: 20, color: "#878ca0", left: -10, fontWeight: "bold" }} ><Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }} >{abbreviate(subs)} </Text>Subscribers  |</Text>
                                    <View style={{ width: 60, height: 30, flexDirection: "row", justifyContent: "space-around", left: -5, alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }}>{abbreviate(views)} </Text>
                                        <Ionicons name={"eye"} size={20} color={"gray"} />
                                    </View>
                                </View>
                                :
                                null
                            }

                            {followers ?
                                <View style={{ width: "100%", height: 30, flexDirection: "row", alignItems: "center", marginTop: 3 }}>
                                    <Image style={{ width: 25, height: 25 }} source={require("../Icons/instagram.png")} />
                                    <Text style={{ fontSize: 14, marginLeft: 20, color: "#878ca0", left: -10, fontWeight: "bold" }} ><Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold" }} >{abbreviate(followers)} </Text>Followers  |</Text>
                                    <View style={{ width: 60, height: 30, flexDirection: "row", justifyContent: "space-around", left: -5, alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold" }}>{abbreviate(instaposts)} <Text style={{ fontSize: 14, color: "#878ca0", fontWeight: "bold" }} >Posts</Text> </Text>
                                    </View>
                                </View>

                                :

                                null
                            }

                        </View>

                    </View>
                </View>

                <View style={style.buttondiv} >
                    <TouchableRipple borderless={true} rippleColor={"rgb(0,0,0,0.32)"} onPress={() => { }} style={style.button1} style={style.button1} >
                        <Text style={style.button1text} >Save for Review</Text>
                    </TouchableRipple>
                    {props.chats ?
                        <>
                            {props.chats.map((chatroomId) =>

                                AllBrandAccountData.chats.find((data) =>
                                    data.ChatRoom_Id == chatroomId.ChatRoom_Id

                                ) ? <TouchableRipple borderless={true} rippleColor={"rgb(0,0,0,0.32)"} onPress={() => { navigation.navigate("BrandToInfluencerChat", { UserId: props.uid, profileimage: profileimage, name: props.name,ChatRoom_Id:chatroomId.ChatRoom_Id,ChatData:AllBrandAccountData.chats }) }} style={[style.button2,{backgroundColor:"#409cff"}]} style={[style.button2,{backgroundColor:"#409cff"}]} >
                                        <View>
                                            <Text style={[style.button2text,{color:"white"}]} >Contacted</Text>
                                        </View>
                                    </TouchableRipple>
                                    :
                                    <TouchableRipple borderless={true} rippleColor={"rgb(0,0,0,0.32)"} onPress={() => { navigation.navigate("BrandSendMessage", { UserId: props.uid, profileimage: profileimage, name: props.name,chats:props.chats }) }} style={style.button2} style={style.button2} >
                                        <View>
                                            <Text style={style.button2text} >Contact</Text>
                                        </View>
                                    </TouchableRipple>

                            )}
                        </>
                        :
                        <TouchableRipple borderless={true} rippleColor={"rgb(0,0,0,0.32)"} onPress={() => { navigation.navigate("BrandSendMessage", { UserId: props.uid, profileimage: profileimage, name: props.name,chats:props.chats }) }} style={style.button2} style={style.button2} >
                            <View>
                                <Text style={style.button2text} >Contact</Text>
                            </View>
                        </TouchableRipple>
                    }


                </View>

            </View>
        </>

    )


}


const style = StyleSheet.create({
    card: {
        width: WiDTH,
        height: WiDTH / 2,
    },
    insidecard: {
        width: WiDTH,
        height: "60%",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 0,
    },
    cardleft: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    cardright: {
        width: "70%",
        paddingLeft: 15,
        height: "100%",

    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#202946",
        textTransform: "capitalize"

    },
    category: {
        fontSize: 13,
        fontWeight: "100",
        color: "#878ca0",
        textTransform: "capitalize"
    },
    buttondiv: {
        width: "100%",
        height: "40%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    button1: {
        width: WiDTH / 2.5,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#de4229",
        borderWidth: 1.5,
        marginLeft: 10
    },
    button2: {
        width: WiDTH / 2.5,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#409cff",
        borderWidth: 1.5,
        marginRight: 10
    },
    button1text: {
        fontSize: 16,
        color: "#de4229",
        fontWeight: 'bold'
    },
    button2text: {
        fontSize: 16,
        color: "#409cff",
        fontWeight: 'bold'
    }



})


export default Card;
