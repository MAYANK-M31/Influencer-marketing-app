
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
import YouTube from "react-native-youtube"
import WebView from 'react-native-webview';
import { TouchableRipple } from 'react-native-paper';

var abbreviate = require('number-abbreviate')



const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
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
    const [channelid, setchannelid] = useState(null)
    const [views, setviews] = useState(null)
    const [instagram, setinstagram] = useState(true)
    const [loading, setloading] = useState(true)
    const [number, setnumber] = useState(null)
    const [switchtype, setswitchtype] = useState("instagram")
    const [data, setdata] = useState(route.params.data)
    const [videoId, setvideoId] = useState([])

    const [name, setname] = useState(route.params.name)
    const [age, setage] = useState(route.params.age)
    const [category, setcategory] = useState(route.params.category)
    const [budget, setbudget] = useState(route.params.budget)
    const [city, setcity] = useState(route.params.city)
    const [paymode, setpaymode] = useState(route.params.paymode)
    const [about, setabout] = useState(null)
    const [achievements, setachievements] = useState([])
    const [experiences, setexperiences] = useState([])
    const [see, setsee] = useState(null)
    const [achievesee, setachievesee] = useState(null)
    const [profileimage, setprofileimage] = useState(null)
    const [backgroundimage, setbackgroundimage] = useState(null)

    const [webloading, setwebloading] = useState(null)

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
        // console.log(data);



        // About Column Logic
        if (route.params.data.about !== undefined) {
            setabout(route.params.data.about)
        } else {
            setabout(null)
        }

        // Achievements Column Logic
        if (route.params.data.achievements !== undefined) {
            setachievements(route.params.data.achievements)
        } else {
            setachievements([])
        }

        // experiences Column Logic
        if (route.params.data.experiences !== undefined) {
            setexperiences(route.params.data.experiences)
        } else {
            setexperiences(null)
        }


        // profile image logic
        if (route.params.data.profileimage !== undefined) {
            setprofileimage(route.params.data.profileimage)
       
        }
       

        // ADD Background picture  if exist to state 

        if (route.params.data.backgroundimage !== undefined) {
            setbackgroundimage(route.params.data.backgroundimage)
        }





        if (route.params.youtubedata !== undefined) {
            setsubs(JSON.parse(route.params.youtubedata).items[0].statistics.subscriberCount)
            setchannelid(JSON.parse(route.params.youtubedata).items[0].id)
            setviews(JSON.parse(route.params.youtubedata).items[0].statistics.viewCount)
            // console.log(JSON.parse(route.params.youtubedata).items[0].statistics);
            const uploadid = JSON.parse(route.params.youtubedata).items[0].contentDetails.relatedPlaylists.uploads



            const youtubefunc = async () => {
                await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadid}&key=AIzaSyB0teIk0vu9KpyKgSXPK4WZnOqqb9aQI0Q&part=snippet&maxResults=20`)
                    .then((res) => {
                        setvideoId(res.data.items)
                        // console.log(videoId);

                    })
            }
            youtubefunc()
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
            setinstagram(false)
            setswitchtype("youtube")
        }











    }, [])


    const switchfunc = (item) => {
        setswitchtype(item)
    }

    const seemore = (index) => {
        setsee(index)
        // setseeless(true)
    }

    const seemoreachieve = (index) => {
        setachievesee(index)
        // setseeless(true)
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

                    <Image style={{ width: "95%", height: 160, alignSelf: "center", backgroundColor: "#e6fff6", top: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} source={{ uri: backgroundimage ? backgroundimage : images[1] }} />

                    <View style={style.topprofile} >
                        <View style={{ borderRadius: 30, height: 150, width: 150, overflow: "hidden", elevation: 5, zIndex: 10, borderWidth: 3, borderColor: "white" }}>
                            <Image style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6" }} source={{ uri: profileimage ?  profileimage : images[0] }} />
                        </View>
                    </View>


                    <View style={style.cardbottom} >
                        <Text style={style.name} >{name}</Text>
                        <Text style={style.category} >Founder -  <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/youtube.png")} /> Ranker Jee</Text>
                        <Text style={style.category} >{category}</Text>
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
                                        <Text style={{ fontSize: 14, fontWeight: "normal", color: "#9bb0bf" }} >Followers</Text>
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
                                        <Text style={{ fontSize: 14, fontWeight: "normal", color: "#9bb0bf" }} >Subscribers</Text>
                                    </View>


                                </View>
                                <View style={{ height: 25, width: 1, backgroundColor: "silver" }} >

                                </View>





                                <View style={style.right} >
                                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} >{abbreviate(views)} +</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                        <Ionicons style={{ marginRight: 5 }} color={"hotpink"} size={15} name={"youtube"} />
                                        <Text style={{ fontSize: 14, fontWeight: "normal", color: "#9bb0bf" }} >Views</Text>
                                    </View>
                                </View>
                            </>

                            :
                            null
                        }
                    </View>



                    <View style={style.about} >
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{budget[0]}-{budget[1]}K</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Budget</Text>
                        </View>
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{city}</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>City</Text>
                        </View>
                        <View style={style.aboutdiv}>
                            {paymode == "both" ?
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>Barter</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>/Pay</Text>
                                </>
                                :
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize", textTransform: "capitalize" }}>{paymode}</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Paymode</Text>
                                </>
                            }

                        </View>
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{age}</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Age</Text>
                        </View>
                    </View>



                    {/*----------------- About Column------------------- */}

                    {about ?

                        <View style={{ minHeight: 10, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >About</Text>
                            <Text style={{ fontSize: 14, fontWeight: "100", color: "#404852", textTransform: "capitalize" }}>{about}</Text>
                        </View>

                        :
                        null

                    }

                    {/*----------------- About Column------------------- */}





                    {/*----------------- Achievements Column------------------- */}

                    {achievements.length > 0 ?


                        <View style={{ minHeight: 100, width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Achievements</Text>

                            {achievements.map((items, index) =>
                                <View>
                                    {index == 0 ?
                                        null
                                        :
                                        <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>
                                    }
                                    <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >

                                        <View style={{ height: "100%", width: 40, paddingTop: 5 }} >
                                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                                                {items.category == "award" ?
                                                    <Ionicons name={"award"} size={25} />
                                                    : null
                                                }
                                                {items.category == "youtube views" ?
                                                    <Ionicons name={"video"} size={25} />
                                                    : null
                                                }
                                                {items.category == "youtube subscibers" ?
                                                    <Ionicons name={"youtube"} size={25} />
                                                    : null
                                                }
                                                {items.category == "instagram followers" ?
                                                    <Ionicons name={"instagram"} size={25} />
                                                    : null
                                                }
                                                {items.category == "other" ?
                                                    <Ionicons name={"flag"} size={25} />
                                                    :
                                                    null
                                                }

                                            </View>
                                        </View>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }} >
                                                <View style={{ width: items.description == null ? "100%" : items.description.length > 80 ? "75%" : "100%" }}>
                                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.title}</Text>
                                                </View>
                                                {items.description !== null ?
                                                    <View style={{ width: "25%", alignItems: "flex-end", justifyContent: "flex-start" }}>
                                                        {items.description.length > 80 ?
                                                            <View >

                                                                {index == achievesee ?
                                                                    <TouchableOpacity activeOpacity={1} onPress={() => { seemoreachieve(130) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                                                        <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See less</Text>
                                                                        <Ionicons color={"#007bff"} size={15} name={"chevron-up"} style={{ alignSelf: "center" }} />
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity activeOpacity={1} onPress={() => { seemoreachieve(index) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                                                        <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See more</Text>
                                                                        <Ionicons color={"#007bff"} size={15} name={"chevron-down"} style={{ alignSelf: "center" }} />
                                                                    </TouchableOpacity>


                                                                }
                                                            </View>
                                                            : null
                                                        }

                                                    </View>
                                                    :
                                                    null
                                                }

                                            </View>

                                            {items.description !== null ?
                                                <View>
                                                    {index == achievesee ?

                                                        <Text numberOfLines={index == achievesee ? 500 : 2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.description}</Text>
                                                        :
                                                        <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.description}</Text>
                                                    }
                                                </View>
                                                :
                                                null
                                            }


                                        </View>
                                    </View>



                                </View>

                            )}

                        </View>
                        :
                        null
                    }



                    {achievements.length > 0 && experiences.length > 0 ?
                        <View style={{ width: "15%", height: 5, backgroundColor: "#e4e6eb", marginBottom: 5, marginTop: 15, alignSelf: "center", borderRadius: 100 }}></View>
                        :
                        null
                    }

                    {/*----------------- Experiences Column------------------- */}

                    {experiences.length > 0 ?
                        <View style={{ minHeight: 100, width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Experiences</Text>

                            {experiences.map((item, index) =>
                                <View>
                                    {index == 0 ?
                                        null
                                        :
                                        <View style={{ width: "95%", height: 1, backgroundColor: "#f0f2f5", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>
                                    }

                                    <View style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                                        <View style={{ height: "100%", width: 40, paddingTop: 5 }} >
                                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 2, justifyContent: "center", alignItems: "center", overflow: 'hidden' }} >
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.url }} />
                                            </View>
                                        </View>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }} >
                                                <View style={{ width: item.description.length > 80 ? "75%" : "100%" }}>
                                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.companyname}</Text>
                                                </View>
                                                <View style={{ width: "25%", alignItems: "flex-end", justifyContent: "flex-start" }}>
                                                    {item.description.length > 80 ?
                                                        <View>
                                                            {index == see ?
                                                                <TouchableOpacity activeOpacity={1} onPress={() => { seemore(130) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                                                    <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See less</Text>
                                                                    <Ionicons color={"#007bff"} size={15} name={"chevron-up"} style={{ alignSelf: "center" }} />
                                                                </TouchableOpacity>
                                                                :
                                                                <TouchableOpacity activeOpacity={1} onPress={() => { setsee(index) }} style={{ flexDirection: "row", height: 18, width: "100%", alignItems: "flex-end", justifyContent: "flex-end" }}>
                                                                    <Text style={{ fontSize: 13, fontWeight: "100", color: "#007bff" }}>See more</Text>
                                                                    <Ionicons color={"#007bff"} size={15} name={"chevron-down"} style={{ alignSelf: "center" }} />
                                                                </TouchableOpacity>
                                                            }
                                                        </View>
                                                        :
                                                        null
                                                    }

                                                </View>
                                            </View>
                                            {index == see ?
                                                <Text numberOfLines={index == see ? 500 : 2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.description}</Text>
                                                :
                                                <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.description}</Text>
                                            }

                                        </View>

                                    </View>


                                </View>
                            )}

                        </View>
                        :
                        null
                    }

                    <View style={{ width: "15%", height: 5, backgroundColor: "#e4e6eb", marginVertical: 20, alignSelf: "center", borderRadius: 100 }}></View>


                    {/* ____________________________________________LinkBox_______________________________________________________ */}

                    <View style={{ minHeight: 50, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", flexDirection: "row", borderRadius: 10, paddingVertical: 15, alignItems: "center", justifyContent: "space-evenly" }} >
                        {instausername ?
                            <TouchableOpacity onPress={() => { navigation.navigate("Browser", { link: "https://www.instagram.com/" + `${instausername}` }) }} style={[style.linkcard, { width: instausername && !subs ? WiDTH - WiDTH * 0.1 : WiDTH - WiDTH * 0.55 }]} >
                                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require("../Icons/instagram.png")} />
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#404852" }} >Instagram</Text>
                                <Ionicons color={"#404852"} style={{ position: "absolute", right: 10 }} size={15} name={"external-link"} />
                            </TouchableOpacity>
                            :
                            null
                        }
                        {subs || views ?
                            <TouchableOpacity onPress={() => { navigation.navigate("Browser", { link: "https://www.youtube.com/channel/" + `${channelid}` }) }} style={[style.linkcard, { width: !instausername && subs ? WiDTH - WiDTH * 0.1 : WiDTH - WiDTH * 0.55 }]} >
                                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#404852" }} >YouTube</Text>
                                <Ionicons color={"#404852"} style={{ position: "absolute", right: 10 }} size={15} name={"external-link"} />
                            </TouchableOpacity>
                            : null
                        }
                    </View>






                    <View style={style.gallery} >
                        {instausername ?
                            <TouchableRipple rippleColor="rgb(0,0,0,0.32)"  activeOpacity={1} onPress={() => { setinstagram(true), switchfunc("instagram") }} style={style.galleryleft} >
                                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "instagram" ? "#0296f6" : "#9e9e9e"} size={25} name={"instagram"} />
                            </TouchableRipple>
                            :
                            null
                        }
                        {subs || views ?
                            <TouchableRipple rippleColor="rgb(0,0,0,0.32)"  activeOpacity={1} onPress={() => { setinstagram(false), switchfunc("youtube") }} style={style.galleryright}>
                                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "youtube" ? "#ff0000" : "#9e9e9e"} size={25} name={"youtube"} />
                            </TouchableRipple>
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
                        <View  >

                            {videoId.map((item) =>
                                <View style={{
                                    width: "100%", paddingHorizontal: 10, justifyContent: "center", alignItems: "center", marginBottom: 10, overflow: "hidden"
                                }} >
                                    <View style={{ width: "98%", height: 200, backgroundColor: "white", alignSelf: "center", borderRadius: 10, overflow: "hidden" }} >

                                        <WebView
                                            onLoadStart={() => { setwebloading(true) }}
                                            onLoadProgress={() => { setwebloading(true) }}
                                            onLoadEnd={() => { setwebloading(false) }}

                                            javaScriptEnabled={true}
                                            domStorageEnabled={true}
                                            source={{ uri: 'https://www.youtube.com/embed/' + `${item.snippet.resourceId.videoId}` }}
                                        />
                                    </View>

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

        height: 50,
        elevation: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 5,
        borderRadius: 50,
        borderColor: "#007bffCC",
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
        backgroundColor: "white",
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
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
