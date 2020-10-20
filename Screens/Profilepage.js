
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
    Image, FlatList, ImageBackground, ActivityIndicator
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"

var abbreviate = require('number-abbreviate')


const images = [
    "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
    "https://static.toiimg.com/photo/72975551.cms",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThTgEcopn3OPT-NJzQhonAm317Js0Ye_M6hw&usqp=CAU",
    "https://m.economictimes.com/thumb/msid-68721417,width-1200,height-900,resizemode-4,imgsize-1016106/nature1_gettyimages.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR44cv1ylNive73e-Xx2N0WvetvMmaGoT3s-w&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyYiivRzt1u3Hh1PxNFIC7t6z2_E_ewPQLcw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnu0iNiJXo9v63aomTvoWRA1iXHed93-B2LA&usqp=CAU"
]

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
var abbreviate = require('number-abbreviate')

const Profilepage = ({ route, navigation }) => {
    const [followers, setfollowers] = useState(null)
    const [instaposts, setinstaposts] = useState(null)
    const [instausername, setinstausername] = useState(null)
    const [instaimages, setinstaimages] = useState(null)
    const [subs, setsubs] = useState(null)
    const [views, setviews] = useState(null)
    const [channelid, setchannelid] = useState(null)
    const [imagedata, setimagedata] = useState(images)
    const [instagram, setinstagram] = useState(true)
    const [loading, setloading] = useState(true)
    const [number, setnumber] = useState(null)
    const [switchtype, setswitchtype] = useState("instagram")

    function animateValue(start, end, duration) {
        if (start === end) return;
        var range = end - start;
        var current = start;
        var increment = end > start ? 1 : +1;
        var stepTime = Math.abs(Math.floor(duration / range));
        var timer = setInterval(function () {
            current += increment;

            if (current == end) {
                clearInterval(timer);
            }
            setnumber(current)
            return current

        }, stepTime);
    }


    useEffect(() => {
        if (route.params.youtubedata !== undefined) {
            setsubs(JSON.parse(route.params.youtubedata).items[0].statistics.subscriberCount)
            setchannelid(JSON.parse(route.params.youtubedata).items[0].id)
            // console.log(JSON.parse(route.params.youtubedata).items[0].statistics);
        }

        if (route.params.instadata !== undefined) {
            // console.log(JSON.parse(route.params.instadata).data); 


            var filtered = JSON.parse(route.params.instadata).data.filter(function (item) {
                return item.media_type !== "VIDEO";
            });

            setinstaimages(filtered)

            setinstausername(JSON.parse(route.params.instadata).data[0].username)
            setloading(true)

            const func = async () => {
                animateValue(0, 50, 10000)
                await axios.get(`https://www.instagram.com/${JSON.parse(route.params.instadata).data[0].username}/?__a=1`).then((res) => {
                    setfollowers(res.data.graphql.user.edge_followed_by.count)
                    setloading(false)
                    // console.log(res.data.graphql.user.edge_followed_by.count);
                    // console.log(JSON.parse(props.instausername).data.length);

                    setinstaposts(JSON.parse(route.params.instadata).data.length)
                })
            }
            func()
        } else {

        }





    }, [])


    const switchfunc = (item) => {
        setswitchtype(item)
    }



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"#404852"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Profile</Text>
                    </View>
                    <View style={style.chat} >
                        <Ionicons color={"#404852"} size={28} name={"message-circle"} />
                    </View>
                </View>


                <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 100 }} >

                    <Image style={{ width: "95%", height: 160, alignSelf: "center", backgroundColor: "#e6fff6", top: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} source={{ uri: route.params.image || "https://thumbs.dreamstime.com/b/abstract-connection-blue-background-network-d-rendering-digital-153616052.jpg" }} />

                    <View style={style.topprofile} >
                        <View style={{ borderRadius: 30, height: 150, width: 150, overflow: "hidden", elevation: 5, zIndex: 10, borderWidth: 3, borderColor: "white" }}>
                            <Image style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6" }} source={{ uri: route.params.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTq2hiMM4LY3J-nPX9QFO0URL2siUWeJP-t-A&usqp=CAU" }} />
                        </View>
                    </View>


                    <View style={style.cardbottom} >
                        <Text style={style.name} >{route.params.name}</Text>
                        <Text style={style.category} >Founder -  <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/youtube.png")} /> Ranker Jee</Text>
                        <Text style={style.category} >{route.params.category}</Text>
                    </View>



                    <View style={style.buttondiv} >
                        <View style={style.button1} >
                            <Text style={style.button1text} >Save for Review</Text>
                        </View>
                        <View style={style.button2} >
                            <Text style={style.button2text} >Contact</Text>
                        </View>

                    </View>





                    <View style={style.container} >
                        {instausername ?
                            <>
                                <View style={style.left} >
                                    {loading ?
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} > {number}K</Text>
                                        :
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} >{abbreviate(followers)}</Text>
                                    }

                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                        <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/instagram.png")} />
                                        <Text style={{ fontSize: 14, fontWeight: "normal",  color: "#9bb0bf" }} >Followers</Text>
                                    </View>
                                </View>
                                <View style={{ height: 25, width: 1, backgroundColor: "silver" }} >

                                </View>
                            </>

                            :
                            null
                        }

                        {subs || views ?

                            <>
                                <View style={style.middle} >
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} >{abbreviate(subs)}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                        <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                                        <Text style={{ fontSize: 14, fontWeight: "normal",  color: "#9bb0bf" }} >Subscribers</Text>
                                    </View>


                                </View>
                                <View style={{ height: 25, width: 1, backgroundColor: "silver" }} >

                                </View>

                            </>
                            : null}


                        <View style={style.right} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff" }} >5 +</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                <Ionicons style={{ marginRight: 5 }} color={"hotpink"} size={14} name={"briefcase"} />
                                <Text style={{ fontSize: 14, fontWeight: "normal",  color: "#9bb0bf" }} >Contracts</Text>
                            </View>

                        </View>
                    </View>



                    <View style={style.about} >
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{route.params.budget[0]}-{route.params.budget[1]}K</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold",  color: "#9bb0bf"}}>Budget</Text>
                        </View>
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{route.params.city}</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold",  color: "#9bb0bf"}}>City</Text>
                        </View>
                        <View style={style.aboutdiv}>
                            {route.params.paymode == "both" ?
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>Barter</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold",  color: "#9bb0bf"}}>/Pay</Text>
                                </>
                                :
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize", textTransform: "capitalize" }}>{route.params.paymode}</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold",  color: "#9bb0bf"}}>Paymode</Text>
                                </>
                            }

                        </View>
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{route.params.age}</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold",  color: "#9bb0bf"}}>Age</Text>
                        </View>
                    </View>

                    {/*----------------- About Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >About</Text>
                        <Text style={{ fontSize: 14, fontWeight: "100", color: "#404852", alignSelf: "center" }}>I run a beauty hacks youtube channel. I use my verbal & interpersonal communication skills to reach out
                             and build rapport with prospective audience from young agegroup. I frequently posts video 5 times a week. </Text>
                    </View>


                    {/*----------------- Achievements Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Achievements</Text>

                        <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                                <Ionicons name={"award"} size={25} />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20 }} >Socify Awards Most Popular Lifestyle Influencer </Text>
                        </View>

                        <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 15, marginBottom: 15, alignSelf: "center" }}></View>

                        <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                                <Ionicons name={"video"} size={25} />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >India's 2nd most viewed comedy channel</Text>
                        </View>

                    </View>


                    <View style={{ width: "15%", height: 5, backgroundColor: "#e4e6eb", marginTop: 15, alignSelf: "center", borderRadius: 100 }}></View>

                    {/*----------------- Experience Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Experience</Text>

                        <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 2, justifyContent: "center", alignItems: "center", overflow: 'hidden', }} >
                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20 }} >Brand Ambassdor of FoxBags</Text>
                        </View>

                        <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>

                        <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 2, justifyContent: "center", alignItems: "center", overflow: 'hidden', }} >
                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >Worked With Dream11</Text>
                        </View>

                        <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>

                        <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 2, justifyContent: "center", alignItems: "center", overflow: 'hidden', }} >
                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/768px-Xiaomi_logo.svg.png" }} />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >Worked With Mi</Text>
                        </View>

                    </View>


                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingVertical: 15, alignItems: "center", justifyContent: "center" }} >
                        {instausername ?
                            <TouchableOpacity onPress={() => { navigation.navigate("Browser", { link: "https://www.instagram.com/" + `${instausername}` }) }} style={style.linkcard} >
                                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require("../Icons/instagram.png")} />
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#404852" }} >Instagram</Text>
                                <Ionicons color={"#404852"} style={{ position: "absolute", right: 20 }} size={20} name={"external-link"} />
                            </TouchableOpacity>
                            :
                            null
                        }
                        {subs || views ?
                            <TouchableOpacity onPress={() => { navigation.navigate("Browser", { link: "https://www.youtube.com/channel/" + `${channelid}` }) }} style={style.linkcard} >
                                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#404852" }} >YouTube</Text>
                                <Ionicons color={"#404852"} style={{ position: "absolute", right: 20 }} size={20} name={"external-link"} />
                            </TouchableOpacity>
                            : null
                        }
                    </View>


                    {/* <Tabviews/> */}

                    <View style={style.gallery} >
                        {instausername ?
                            <TouchableOpacity activeOpacity={1} onPress={() => { setinstagram(true), switchfunc("instagram") }} style={style.galleryleft} >
                                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "instagram" ? "#0296f6" : "#9e9e9e"} size={25} name={"instagram"} />
                            </TouchableOpacity>
                            :
                            null
                        }
                        {subs || views ?
                            <TouchableOpacity activeOpacity={1} onPress={() => { setinstagram(false), switchfunc("youtube") }} style={style.galleryright}>
                                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "youtube" ? "#ff0000" : "#9e9e9e"} size={25} name={"youtube"} />
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>

                    {instagram ?
                        <FlatList
                            data={instaimages}
                            style={{ left: -4 / 6 }}
                            renderItem={({ item }) => (

                                <TouchableOpacity onPress={() => navigation.navigate("Gallery", { image: JSON.stringify(instaimages), uri: item.media_url })}
                                    style={{
                                        height: WiDTH / 3,
                                        width: WiDTH / 3,
                                        flexDirection: 'column',
                                        margin: 1,
                                        backgroundColor: "#d9d9d9"
                                    }}>

                                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.media_url }} />

                                </TouchableOpacity>
                            )}
                            //Setting the number of column
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        <View>

                            {imagedata.map((item) =>
                                <View style={{
                                    width: "100%", paddingHorizontal: 10, justifyContent: "center", alignItems: "center", marginBottom: 10, overflow: "hidden"
                                }} >
                                    <ImageBackground blurRadius={1.5} style={{
                                        height: 250,
                                        width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 10, overflow: "hidden"
                                    }} source={{ uri: item }}  >
                                        <Image style={{ width: 50, height: 50, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                                    </ImageBackground>

                                </View>
                            )}


                        </View>



                    }





                </ScrollView>
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
    topprofile: {
        width: WiDTH,
        height: 180,
        marginTop: -250 / 3,
        justifyContent: "center",
        alignItems: "center",
    },
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
    cardbottom: {
        width: "100%",
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#414d57",
        textTransform: "capitalize"

    },
    category: {
        fontSize: 13,
        fontWeight: "100",
        color: "#878ca0",
        textTransform: "capitalize"
    },
    container: {
        width: WiDTH,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    left: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    middle: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    right: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    linkcard: {
        width: WiDTH - WiDTH * 0.1,
        height: 50,
        elevation: 0,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 5,
        borderRadius: 10,
        borderColor: "#007bff",
        borderWidth: 1.5
    },
    about: {
        width: WiDTH,
        height: 100,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    aboutdiv: {
        width: WiDTH / 5,
        height: WiDTH / 5,
        backgroundColor: "white",
        elevation: 3,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#409cff",
        borderWidth: 1.5
    },
    buttondiv: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20
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
    },
    gallery: {
        width: WiDTH,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        // borderTopWidth: 1,
        // borderTopColor: "#d9d9d9",
        justifyContent: "center",
    },
    galleryleft: {
        width: "50%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    galleryright: {
        width: "50%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    }

})


export default Profilepage;
