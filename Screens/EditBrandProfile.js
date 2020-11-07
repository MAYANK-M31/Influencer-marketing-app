
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
    Image, FlatList, ImageBackground, ActivityIndicator, AsyncStorage, ToastAndroid, TextInput
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

const EditBrandProfile = ({ route, navigation }) => {
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
    const [InitLoading, setInitLoading] = useState(false)



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








    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Edit Profile</Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate("Settings") }} style={style.chat} >
                        <Ionicons color={"#404852"} size={22} name={"settings"} />
                    </TouchableOpacity>
                </View>


                <ScrollView showsVerticalScrollIndicator={true} scrollEventThrottle={16} keyboardShouldPersistTaps={"always"} style={{ width: "100%", height: HEIGHT }} contentContainerStyle={{ paddingBottom: 100 }} >



                    {/* __________-Name_____________ */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 20, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >name</Text>
                            <Ionicons name={"edit-2"} size={18} color={"#007bff"} />
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"user"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%" }} >
                                <TextInput placeholder={"Full Name"} style={{ width: "100%", height: "100%" }} />
                                {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >mayank malhotra</Text> */}
                            </View>
                        </View>

                    </View>


                    {/* ________-email_________________ */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >Email</Text>
                            <Ionicons name={"edit-2"} size={18} color={"#007bff"} />
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"map-pin"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%" }} >
                                <TextInput placeholder={"Full Name"} style={{ width: "100%", height: "100%" }} />
                                {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >mayank malhotra</Text> */}
                            </View>
                        </View>

                    </View>

                    {/* _____________phonenumber___________________ */}

                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >phone number</Text>
                            <Ionicons name={"edit-2"} size={18} color={"#007bff"} />
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"phone"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%" }} >
                                <TextInput placeholder={"Full Name"} style={{ width: "100%", height: "100%" }} />
                                {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >mayank malhotra</Text> */}
                            </View>
                        </View>

                    </View>



                    {/* _______city____________ */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >City</Text>
                            <Ionicons name={"edit-2"} size={18} color={"#007bff"} />
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"map-pin"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%" }} >
                                <TextInput placeholder={"Full Name"} style={{ width: "100%", height: "100%" }} />
                                {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >mayank malhotra</Text> */}
                            </View>
                        </View>

                    </View>

                    {/* ___________category______________________- */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >Category</Text>
                            <Ionicons name={"edit-2"} size={18} color={"#007bff"} />
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"grid"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%" }} >
                                <TextInput placeholder={"Full Name"} style={{ width: "100%", height: "100%" }} />
                                {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >mayank malhotra</Text> */}
                            </View>
                        </View>

                    </View>

                    {/* _____________Website_____________________- */}

                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >website</Text>
                            <Ionicons name={"edit-2"} size={18} color={"#007bff"} />
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"globe"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%" }} >
                                <TextInput placeholder={"e.g www.abc.com"} style={{ width: "100%", height: "100%" }} />
                                {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >mayank malhotra</Text> */}
                            </View>
                        </View>

                    </View>

                    {/* ________________applink____________________-- */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >app link</Text>
                            <Ionicons name={"edit-2"} size={18} color={"#007bff"} />
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"smartphone"} size={25} color={"#007bff"} />
                            </View>

                            <View style={{ width: "85%" }} >
                                <TextInput placeholder={"App Link"} style={{ width: "100%", height: "100%" }} />
                                {/* <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >mayank malhotra</Text> */}
                            </View>

                        </View>

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


export default EditBrandProfile
