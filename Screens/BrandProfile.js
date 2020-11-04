
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
    Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage, ToastAndroid,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import { TouchableRipple, Modal } from 'react-native-paper';
import { MyContext } from "../Screens/AppStartStack"

var abbreviate = require('number-abbreviate')


const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
var abbreviate = require('number-abbreviate')

const BrandProfile = ({ route, navigation }) => {
    const [followers, setfollowers] = useState(null)
    const [instaposts, setinstaposts] = useState(null)
    const [subs, setsubs] = useState(null)
    const [views, setviews] = useState(null)
    const [channelid, setchannelid] = useState(null)
    const [imagedata, setimagedata] = useState(images)
    const [instagram, setinstagram] = useState(true)
    const [loading, setloading] = useState(true)
    const [number, setnumber] = useState(null)
    const [switchtype, setswitchtype] = useState("instagram")
    const [see, setsee] = useState(null)
    const [achievesee, setachievesee] = useState(null)
    const [InitLoading, setInitLoading] = useState(true)



    const { state, dispatch } = useContext(MyContext)
    const { name, brandname, city, category, email, website, applink, profileimage, backgroundimage } = state





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


        const func = async () => {
            setInitLoading(true)
            const ref = await firestore().collection("brandaccount")
            const uid = await AsyncStorage.getItem("uid")
            // console.log(uid);

            ref.where("uid", "==", uid).get()
                .then(async function (querySnapshot) {

                    await querySnapshot.forEach(async function (doc) {
                        const docId = doc.id
                        // alert(docId)
                        await AsyncStorage.setItem("DocId", docId)
                        // console.log(await AsyncStorage.getAllKeys());


                    })


                })


        }
        func()
    }, [])


    useEffect(() => {
        setInitLoading(true)
        const func = async () => {
            const ref = await firestore().collection("brandaccount")
            const uid = await AsyncStorage.getItem("uid")
            // console.log(uid);


            ref.where("uid", "==", uid).get()
                .then(function (querySnapshot) {

                    querySnapshot.forEach(async function (doc) {
                        // console.log(doc.data());
                        dispatch({ type: "ADD_NAME", payload: doc.data().name })
                        dispatch({ type: "ADD_BRANDNAME", payload: doc.data().brandname })
                        dispatch({ type: "ADD_CITY", payload: doc.data().city })
                        dispatch({ type: "ADD_CATEGORY", payload: doc.data().category })
                        dispatch({ type: "ADD_EMAIL", payload: doc.data().email })
                        dispatch({ type: "ADD_APPLINK", payload: doc.data().applink })
                        dispatch({ type: "ADD_WEBSITE", payload: doc.data().website })

                        if (doc.data()) {
                            setInitLoading(false)
                        }


                        // ADD Profile picture  if exist to state 

                        if (doc.data().profileimage !== undefined) {
                            dispatch({ type: "ADD_PROFILEIMAGE", payload: doc.data().profileimage })
                        }

                        // ADD Background picture  if exist to state 

                        if (doc.data().backgroundimage !== undefined) {
                            dispatch({ type: "ADD_BACKGROUNDIMAGE", payload: doc.data().backgroundimage })
                        }



                    });



                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                    ToastAndroid.show("ACCOUNT DOES NOT EXIST ANYMORE REGISTER AGAIN", ToastAndroid.LONG)
                });

        }
        func()

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
                        <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >My Profile</Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate("Settings") }} style={style.chat} >
                        <Ionicons color={"#404852"} size={22} name={"settings"} />
                    </TouchableOpacity>
                </View>


                <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 100 }} >
                    <TouchableOpacity onPress={() => { navigation.navigate("ProfileBackground") }} activeOpacity={1}>
                        <ImageBackground style={{ width: WiDTH * 0.95, height: 160, alignSelf: "center", backgroundColor: "#e6fff6", top: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10, alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden" }} source={{ uri: backgroundimage !== null ? backgroundimage : images[1] }} >
                            <TouchableOpacity onPress={() => { navigation.navigate("ProfileBackground") }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                                <Ionicons color={"white"} size={22} name={"edit-2"} />
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={style.topprofile} >
                        <View style={{ borderRadius: 30, height: 150, width: 150, overflow: "hidden", elevation: 5, zIndex: 10, borderWidth: 3, borderColor: "white" }}>
                            <TouchableOpacity onPress={() => { navigation.navigate("ProfilePicture") }} activeOpacity={1}>
                                <ImageBackground style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6", alignItems: "flex-end", justifyContent: "flex-end" }} source={{ uri: profileimage == null ? images[0] : profileimage }} >
                                    <TouchableOpacity onPress={() => { navigation.navigate("ProfilePicture") }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                                        <Ionicons color={"white"} size={22} name={"edit-2"} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={style.cardbottom} >
                        <Text style={style.name} >{brandname}</Text>
                        {/* <Text style={style.category} >Founder -  <Image style={{ width: 15, height: 14, marginRight: 5 }} source={require("../Icons/youtube.png")} /> Ranker Jee</Text> */}
                        <Text style={style.category} >{category}</Text>
                    </View>


                    


                    <View style={style.buttondiv} >

                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("EditProfileStack")} style={style.button2} >
                            <Text style={style.button2text} >Edit Profile</Text>
                            <Ionicons style={{ marginLeft: 10 }} color={"white"} size={18} name={"edit"} />
                        </TouchableOpacity>

                    </View>










                </ScrollView>


            </SafeAreaView>
            <Modal visible={InitLoading}   >

                <View style={{ width: WiDTH, height: HEIGHT, backgroundColor: "white", justifyContent: "center", alignItems: "center" }} >
                    <ActivityIndicator size={50} color={"#007bff"} />
                    {/* <Text style={{ fontSize: 13, color: "#414d57", marginTop: 5, marginLeft: 5 }}>Loading...</Text> */}
                </View>
            </Modal>
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
        color: "#9bb0bf",
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


export default BrandProfile
