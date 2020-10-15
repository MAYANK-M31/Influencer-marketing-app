
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

var abbreviate = require('number-abbreviate')

const Card = (props) => {

    const [followers, setfollowers] = useState(null)
    const [instaposts, setinstaposts] = useState(null)
    const [subs, setsubs] = useState(null)
    const [views, setviews] = useState(null)


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
    }, [])



    return (
        <>
            <View style={style.card} >
                <View style={style.insidecard} >
                    <View style={style.cardleft} >
                        <View style={{ borderRadius: 120 / 2, height: 100, width: 100, overflow: "hidden", elevation: 5 }}>
                            <Image style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6" }} source={{ uri: props.image }} />
                        </View>
                    </View>
                    <View style={style.cardright} >
                        <View style={{ height: "100%" }} >
                            <Text style={style.name} >{props.name}</Text>
                            <Text style={style.category} >{props.category}</Text>
                            {subs || views ?
                                <View style={{ width: "100%", height: 30, flexDirection: "row", alignItems: "center", marginTop: 3 }}>
                                    <Image style={{ width: 25, height: 25 }} source={require("../Icons/youtube.png")} />
                                    <Text style={{ fontSize: 14, marginLeft: 20, color: "#878ca0", left: -10, fontWeight: "bold" }} ><Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold" ,textTransform:"uppercase" }} >{abbreviate(subs)} </Text>Subscribers  |</Text>
                                    <View style={{ width: 60, height: 30, flexDirection: "row", justifyContent: "space-around", left: -5, alignItems: "center" }}>
                                        <Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold",textTransform:"uppercase" }}>{abbreviate(views)} </Text>
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
                    <View style={style.button1} >
                        <Text style={style.button1text} >Save for Review</Text>
                    </View>
                    <View style={style.button2} >
                        <Text style={style.button2text} >Contact</Text>
                    </View>

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