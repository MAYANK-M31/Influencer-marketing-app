
import React, { useEffect, useState, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Image, ToastAndroid, ActivityIndicator, Switch, ImageBackground
} from 'react-native';
import Ionicons from "react-native-vector-icons/Feather"
import { TouchableRipple } from 'react-native-paper';
import { MyContext } from './AppStartStack';
import { FlatList } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import axios from 'axios';

const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height






const CampDetailPage = ({ navigation, route }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { state, dispatch } = useContext(MyContext)
    const { campaignposts, campaignpostedagain } = state;

    const [ switchtype, setswitchtype ] = useState(null)
    const [ instagram, setinstagram ] = useState(null)
    const [instaimages,setinstaimages] = useState(null)
    const [ instausername, setinstausername] = useState(null)
    const [videoId,setvideoId] = useState([])

    const data = route.params.data

    const switchfunc = (item) => {
        setswitchtype(item)
    }

    useEffect(()=>{
        if(data.instadata){
            setinstagram(true)
            setswitchtype("instagram")

            var filtered = data.instadata.data.filter(function (item) {
                return item.media_type !== "VIDEO";
            });

            setinstaimages(filtered)

            setinstausername(data.instadata.data[0].username)
     
        }else if(data.youtubedata){
            setinstagram(false)
            setswitchtype("youtube")
        }

        if (data.youtubedata !== undefined) {
         
            // console.log(JSON.parse(data.youtubedata).items[0].statistics);
            const uploadid = data.youtubedata.items[0].contentDetails.relatedPlaylists.uploads



            const youtubefunc = async () => {
                await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadid}&key=AIzaSyB0teIk0vu9KpyKgSXPK4WZnOqqb9aQI0Q&part=snippet&maxResults=20`)
                    .then((res) => {
                        setvideoId(res.data.items)
                        // console.log(videoId);

                    })
            }
            youtubefunc()
        }
    },[])

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={style.header} >
                    <View style={{ width: "25%", paddingLeft: 7 }} >
                        <TouchableRipple onPress={() => navigation.goBack()} borderless={true} rippleColor={"rbg(0,0,0,0.32)"} style={{ width: 35, height: 35, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                            <Ionicons color={"black"} size={28} name={"chevron-left"} />
                        </TouchableRipple>
                    </View>
                    <View style={{ width: "50%", alignSelf: "center" }}>
                        <Text style={{ alignSelf: "center", fontSize: 18, alignSelf: "center", fontWeight: "bold", color: "#404852" }} >Campaign</Text>
                    </View>

                    <View style={{ width: "25%", alignItems: "center" }}>
                        {/* <TouchableOpacity onPress={() => { skip() }} style={{ height: 30, width: 50, borderRadius: 50, backgroundColor: "#1e87fd", justifyContent: "center", alignItems: "center", right: -5 }}>
                            <Text style={{ color: "white", fontWeight: "bold", alignSelf: "center" }} >Add</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>


                <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }} >

                    <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(false), Keyboard.dismiss() }} activeOpacity={1}>
                        <ImageBackground source={{ uri: data.backgroundimage ? data.backgroundimage : images[1] }} style={{ width: WiDTH * 0.95, height: 160, alignSelf: "center", backgroundColor: "#f0f2f5", top: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10, alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden" }}  >

                            <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(false), Keyboard.dismiss() }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                                <Ionicons color={"white"} size={22} name={"plus-circle"} />
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={style.topprofile} >
                        <View style={{ borderRadius: 30, height: 150, width: 150, overflow: "hidden", elevation: 5, zIndex: 10, borderWidth: 3, borderColor: "white" }}>
                            <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(true), Keyboard.dismiss() }} activeOpacity={1}>

                                <ImageBackground source={{ uri: data.profileimage ? data.profileimage : images[1] }} style={{ width: "100%", height: "100%", backgroundColor: "#f0f2f5", alignItems: "flex-end", justifyContent: "flex-end" }}  >

                                    <TouchableOpacity onPress={() => { setvisibleselectimagelogo(true), setforprofile(true), Keyboard.dismiss() }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                                        <Ionicons color={"white"} size={22} name={"plus-circle"} />
                                    </TouchableOpacity>

                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={style.cardbottom} >
                        <View style={{ width: WiDTH, minHeight: 10, alignSelf: "center", justifyContent: "center", alignItems: "center" }} >
                            <Text numberOfLines={2} style={style.name} >{data.campaigntitle}</Text>
                        </View>
                        <Text style={style.category} ><Text style={{ textTransform: "lowercase" }} >by</Text> Rently</Text>
                        <Text style={style.category} >{data.brandpostcategory}</Text>
                    </View>



                    {/* <View style={style.buttondiv} >

                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("EditProfileStack", { screen: "EditProfile", params: { budget: [minrange, maxrange], city: city, paymode: paymode, age: age, name: name, category: category, instaconnected: instaconnected, youtubeconnected: youtubeconnected, about: about } })} style={style.button2} >
                            <Text style={style.button2text} >Edit Profile</Text>
                            <Ionicons style={{ marginLeft: 10 }} color={"white"} size={18} name={"edit"} />
                        </TouchableOpacity>

                    </View> */}


                    <View style={style.container3} >

                        {data.instafollowers ?
                            <>
                                <View style={style.left1} >

                                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} > 2K-50K</Text>

                                    {/* <Text style={{ fontSize: 18, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} >i</Text> */}


                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                        <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/instagram.png")} />
                                        <Text style={{ fontSize: 14, fontWeight: "normal", color: "#9bb0bf" }} >Followers</Text>
                                    </View>
                                </View>

                            </>
                            :
                            null
                        }


                        {
                            data.platform == "both" ?


                                <View style={{ height: 25, width: 1, backgroundColor: "silver" }} >

                                </View>
                                :
                                null
                        }



                        {data.youtubesubs ?
                            <>
                                <View style={style.middle2} >
                                    <Text style={{ fontSize: 17, fontWeight: "bold", color: "#007bff", textTransform: "uppercase" }} >50K-100K</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                        <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/youtube.png")} />
                                        <Text style={{ fontSize: 14, fontWeight: "normal", color: "#9bb0bf" }} >Subscribers</Text>
                                    </View>
                                </View>

                            </>
                            :
                            null
                        }


                    </View>


                    <View style={style.about} >
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "uppercase" }}>{data.minrange}K-{data.maxrange}K</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Budget</Text>
                        </View>
                        <View style={style.aboutdiv}>
                            <View style={{ flexDirection: "row" }} >
                                {data.instafollowers ?
                                    <Image style={{ width: 20, height: 20 }} source={require("../Icons/instagram.png")} />
                                    :
                                    null
                                }
                                {data.platform == "both" ?
                                    <Text> & </Text>
                                    :
                                    null
                                }
                                {data.youtubesubs ?
                                    <Image style={{ width: 20, height: 20 }} source={require("../Icons/youtube.png")} />
                                    :
                                    null
                                }

                            </View>

                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Platform</Text>
                        </View>
                        <View style={style.aboutdiv}>
                            {data.paymode == "both" ?
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>Barter</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>/Pay</Text>
                                </>
                                :
                                null
                            }

                            {data.paymode == "barter" ?
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize", textTransform: "capitalize" }}>barter</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Paymode</Text>
                                </>
                                : null
                            }

                            {data.paymode == "pay" ?
                                <>
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize", textTransform: "capitalize" }}>pay</Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Paymode</Text>
                                </>
                                : null
                            }



                        </View>
                        <View style={style.aboutdiv}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#3c4852", textTransform: "capitalize" }}>{data.minage}-{data.maxage}</Text>
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#9bb0bf" }}>Age</Text>
                        </View>
                    </View>

                    <View style={{ minHeight: 50, width: "95%", backgroundColor: "#f0f2f500", alignSelf: "center", borderRadius: 10, marginTop: 10, marginBottom: 5, justifyContent: "space-evenly" }} >

                        <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 5, alignItems: "center" }} >
                            <View style={{ backgroundColor: "white", height: 35, width: 35, borderRadius: 50, justifyContent: "center", alignItems: "center", marginRight: 15 }} >
                                <Ionicons name={"map-pin"} size={20} color={"#f759a8"} />
                            </View>
                            <Text style={{ color: "#2a3659", fontWeight: "bold", fontSize: 14, textTransform: "none" }} >Target Region is {data.targetregion}</Text>
                        </View>

                        <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 5, alignItems: "center" }} >
                            <View style={{ backgroundColor: "white", height: 35, width: 35, borderRadius: 50, justifyContent: "center", alignItems: "center", marginRight: 15 }} >
                                <Ionicons name={"user"} size={20} color={"#00ca95"} />
                            </View>
                            <Text style={{ color: "#2a3659", fontWeight: "bold", fontSize: 14, textTransform: "none" }} >Target Audience age between {data.targetaudience} years</Text>
                        </View>


                        {data.website ?
                            <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 5, alignItems: "center" }} >
                                <View style={{ backgroundColor: "white", height: 35, width: 35, borderRadius: 50, justifyContent: "center", alignItems: "center", marginRight: 15 }} >
                                    <Ionicons name={"globe"} size={20} color={"#007bff"} />
                                </View>
                                <Text style={{ color: "#2a3659", fontWeight: "bold", fontSize: 14, textTransform: "none" }} >{data.website}</Text>
                            </View>
                            :
                            null
                        }

                        {data.applink ?

                            <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 5, alignItems: "center" }} >
                                <View style={{ backgroundColor: "white", height: 35, width: 35, borderRadius: 50, justifyContent: "center", alignItems: "center", marginRight: 15 }} >
                                    <Ionicons name={"smartphone"} size={20} color={"#e7164c"} />
                                </View>
                                <Text style={{ color: "#2a3659", fontWeight: "bold", fontSize: 14, textTransform: "none" }} >{data.applink}</Text>
                            </View>
                            :
                            null
                        }

                    </View>


                    <View style={{ backgroundColor: "#f0f2f5", width: "95%", minHeight: 120, alignSelf: "center", borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 10, left: 15 }} >Campaign</Text>
                        <View style={[style.container2]} >

                            <View style={style.left} >
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#007bff", textTransform: "capitalize" }} >{data.campaignStartDate.split(" ")[2] + " " + data.campaignStartDate.split(" ")[1] + " " + data.campaignStartDate.split(" ")[3]}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                    <Text style={{ fontSize: 12, fontWeight: "normal", color: "#9bb0bf" }} >Start Date</Text>
                                </View>
                            </View>



                            <View style={{ height: 2, width: 35, borderRadius: 50, backgroundColor: "#007bff44" }} >

                            </View>

                            <View style={style.middle} >
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#007bff", textTransform: "capitalize" }} >{data.campaignEndDate.split(" ")[2] + " " + data.campaignEndDate.split(" ")[1] + " " + data.campaignEndDate.split(" ")[3]}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                    <Text style={{ fontSize: 12, fontWeight: "normal", color: "#9bb0bf" }} >End Date</Text>
                                </View>
                            </View>

                        </View>
                    </View>



                    <View style={{ minHeight: 10, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >About Campaign</Text>
                        <Text style={{ fontSize: 14, fontWeight: "100", color: "#404852", textTransform: "capitalize" }}>{data.campaigndescription}</Text>
                    </View>


                    <View style={style.gallery} >
                        {data.instadata ?
                            <TouchableRipple rippleColor="rgb(0,0,0,0.32)" activeOpacity={1} onPress={() => { setinstagram(true), switchfunc("instagram") }} style={style.galleryleft} >
                                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "instagram" ? "#0296f6" : "#9e9e9e"}  size={25} name={"instagram"} />
                            </TouchableRipple>
                            :
                            null
                        }
                        {data.youtubedata ?
                            <TouchableRipple rippleColor="rgb(0,0,0,0.32)" activeOpacity={1} onPress={() => { setinstagram(false), switchfunc("youtube") }} style={style.galleryright}>
                                <Ionicons style={{ width: 25, height: 25, marginRight: 5 }} color={switchtype == "youtube" ? "#ff0000" : "#9e9e9e"} size={25} name={"youtube"} />
                            </TouchableRipple>
                            :
                            null
                        }


                    </View>

                    {data.instadata ?

                        instagram ?
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
                            null
                        :
                        null
                    }

                    {data.youtubedata ?
                        !instagram ?
                            <View  >
                               {videoId.map((item) =>
                                <View style={{
                                    width: "100%", paddingHorizontal: 10, justifyContent: "center", alignItems: "center", marginBottom: 10, overflow: "hidden"
                                }} >
                                    <View style={{ width: "98%", height: 200, backgroundColor: "white", alignSelf: "center", borderRadius: 10, overflow: "hidden" }} >

                                        <WebView
                                            javaScriptEnabled={true}
                                            domStorageEnabled={true}
                                            source={{ uri: 'https://www.youtube.com/embed/' + `${item.snippet.resourceId.videoId}` }}
                                        />
                                    </View>

                                </View>
                            )}

                            </View>
                            :
                            null
                        :
                        null
                    }








                </ScrollView>



            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",


    },
    header: {
        flexDirection: "row",
        width: WiDTH,
        height: 50,
        alignItems: "center",
        borderBottomColor: "#f0f2f5",
        borderBottomWidth: 0.2
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
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
        textTransform: "capitalize",
        alignSelf: "center",
        textAlign: "center",
        paddingHorizontal: 40

    },
    category: {
        fontSize: 13,
        fontWeight: "100",
        color: "#9bb0bf",
        textTransform: "capitalize"
    },
    container3: {
        width: WiDTH,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    left1: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    middle2: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    container2: {
        width: WiDTH - 10,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    left: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.6,
        borderColor: "#007bff",
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "white"
    },
    middle: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.6,
        borderColor: "#007bff",
        borderRadius: 10,
        elevation: 4,
        backgroundColor: "white"
    },
    right: {
        width: WiDTH / 3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    linkcard: {
        width: WiDTH - WiDTH * 0.55,
        height: 55,
        elevation: 5,
        backgroundColor: "white",
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
        alignItems: "center",
        marginTop: 15,
        alignItems: "center",
    },
    button2: {
        width: WiDTH * 0.88,
        height: 40,
        backgroundColor: "#007bff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    button2text: {
        fontSize: 15,
        color: "white",
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


export default CampDetailPage;
