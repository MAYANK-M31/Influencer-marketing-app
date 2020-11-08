
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
import Icons from "react-native-vector-icons/FontAwesome5"
import axios from "axios"
import firestore from '@react-native-firebase/firestore';
import { TouchableRipple, Modal, Dialog, Paragraph } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { MyContext } from "../Screens/AppStartStack"

var abbreviate = require('number-abbreviate')


const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/82b8e9101650903.5f2369beab58a.jpg",
    "https://image.shutterstock.com/image-illustration/3d-illustration-abstract-background-connection-260nw-651685186.jpg"
]

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
var abbreviate = require('number-abbreviate')

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
    quality: 0.6,
};


const BrandProfile = ({ route, navigation }) => {

    const { state, dispatch } = useContext(MyContext)
    const { name, brandname, city, category, email, website, applink, profileimage, backgroundimage } = state


    const [imageselector, setimageselector] = useState(false)
    const [InitLoading, setInitLoading] = useState(false)
    const [profilesource, setprofilesource] = useState(null)
    const [backgroundsource, setbackgroundsource] = useState(null)
    const [forprofile, setforprofile] = useState(false)
    const [loading, setloading] = useState(null)
    const [loading2,setloading2 ] = useState(null)








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




    // _________For Extra picture upload(START)____________

    const launchgallery = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                if (forprofile == true) {
                    setimageselector(false)
                    setprofilesource({ uri: response.uri, filename: response.fileName })
                    uploadimage({ source: response.uri, filename: response.fileName, for: "profileimage" })
                } else if (forprofile == false) {
                    setimageselector(false)
                    setbackgroundsource({ uri: response.uri, filename: response.fileName })
                    uploadimage({ source: response.uri, filename: response.fileName, for: "backgroundimage" })
                }


            }
        });
    }






    const launchcamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                if (forprofile == true) {
                    setimageselector(false)
                    setprofilesource({ uri: response.uri, filename: response.fileName })
                    uploadimage({ source: response.uri, filename: response.fileName, for: "profileimage" })
                } else if (forprofile == false) {
                    setimageselector(false)
                    setbackgroundsource({ uri: response.uri, filename: response.fileName })
                    uploadimage({ source: response.uri, filename: response.fileName, for: "backgroundimage" })
                }

            }
        });
    }


    const uploadimage = async (item) => {
        setloading(true)
        const docid = await AsyncStorage.getItem("DocId")
        const ref = await firestore().collection("brandaccount").doc(docid)
        const reference = storage().ref(`/images/brandsprofile/${item.filename}`)


        setloading(true)


        reference.putFile(item.source)
            .then((res) => {
                // console.log(res);
                // console.log(res.state);
                if (res.state == "success") {
                    // ToastAndroid.show("Image Uploaded Successfully", ToastAndroid.SHORT)
                } else if (res.state == "running") {
                    ToastAndroid.show("uploading", ToastAndroid.LONG)
                } else if (res.state == "error") {
                    ToastAndroid.show("Failed to upload Try again", ToastAndroid.LONG)
                    setloading(false)
                }

                const imageref = storage().ref(res.metadata.fullPath)
                imageref
                    .getDownloadURL()
                    .then((url) => {

                        if (item.for == "profileimage") {
                            ref.update({
                                profileimage: url
                            }).then(async () => {
                                ToastAndroid.show("Image Uploaded successfully", ToastAndroid.SHORT)
                                dispatch({ type: "ADD_PROFILEIMAGE", payload: url })
                                setloading(false)


                            })

                        } else if (item.for == "backgroundimage") {
                            ref.update({
                                backgroundimage: url
                            }).then(async () => {
                                ToastAndroid.show("Image Uploaded successfully", ToastAndroid.SHORT)
                                dispatch({ type: "ADD_BACKGROUNDIMAGE", payload: url })
                                setloading(false)


                            })
                        
                        }



                    })

            })
            .catch((e) => {
                console.log("error to uplaod", e);
                ToastAndroid.show("Failed To Image Uploaded successfully", ToastAndroid.SHORT)
                setloading(false)
            })







    }


    // seprate the image name from url to remove it from storage for further use
    const ImageNameFinder = (url) => {
 
 
        var x = url
        var y = x.split("%2F")
        var x = y[2]
        var y = x.split("?")
        // console.log(y[0]);
        return y[0]


    }






    const removeimage = async (item) => {

        if(item == "profileimage"){
            setloading2(true)
            const imagename = ImageNameFinder(profileimage)
            const docid = await AsyncStorage.getItem("DocId")
            const ref = await firestore().collection("brandaccount").doc(docid)
            const reference = storage().ref(`/images/brandsprofile/${imagename}`)
    
            reference.delete().then(() => {
                ref.update({
                    profileimage: null,
    
                }).then(async () => {
                    dispatch({ type: "ADD_PROFILEIMAGE", payload: null })
                    setimageselector(false)
                    setloading2(false)
                    ToastAndroid.show("Profile Image Removed", ToastAndroid.SHORT)
                })
            })
        }else if(item == "backgroundimage"){
            setloading2(true)
            const imagename = ImageNameFinder(backgroundimage)
            const docid = await AsyncStorage.getItem("DocId")
            const ref = await firestore().collection("brandaccount").doc(docid)
            const reference = storage().ref(`/images/brandsprofile/${imagename}`)
    
            reference.delete().then(() => {
                ref.update({
                    backgroundimage: null,
    
                }).then(async () => {
                    dispatch({ type: "ADD_BACKGROUNDIMAGE", payload: null })
                    setimageselector(false)
                    setloading2(false)
                    ToastAndroid.show("Profile Image Removed", ToastAndroid.SHORT)
                })
            })
        }
       



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
                    <TouchableOpacity onPress={() => { setimageselector(true), setforprofile(false) }} activeOpacity={1}>
                        <ImageBackground style={{ width: WiDTH * 0.95, height: 160, alignSelf: "center", backgroundColor: "#e6fff6", top: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10, alignItems: "flex-end", justifyContent: "flex-end", overflow: "hidden" }} source={{ uri: backgroundimage !== null ? backgroundimage : images[1] }} >
                            <TouchableOpacity onPress={() => { setimageselector(true), setforprofile(false) }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
                                <Ionicons color={"white"} size={22} name={"edit-2"} />
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={style.topprofile} >
                        <View style={{ borderRadius: 30, height: 150, width: 150, overflow: "hidden", elevation: 5, zIndex: 10, borderWidth: 3, borderColor: "white" }}>
                            <TouchableOpacity onPress={() => { setimageselector(true), setforprofile(true) }} activeOpacity={1}>
                                <ImageBackground style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6", alignItems: "flex-end", justifyContent: "flex-end" }} source={{ uri: profileimage == null ? images[0] : profileimage }} >
                                    <TouchableOpacity onPress={() => { setimageselector(true), setforprofile(true) }} style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 5, marginRight: 5 }} >
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

                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("EditBrandProfile")} style={style.button2} >
                            <Text style={style.button2text} >Edit Profile</Text>
                            <Ionicons style={{ marginLeft: 10 }} color={"white"} size={18} name={"edit"} />
                        </TouchableOpacity>

                    </View>



                    {/* __________-Name_____________ */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 30, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >name</Text>

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"user"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{name}</Text>
                            </View>
                        </View>

                    </View>

                    {/* __________Brand-Name_____________ */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 30, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >brand name</Text>

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"user"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{brandname}</Text>
                            </View>
                        </View>

                    </View>


                    {/* ________-email_________________ */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >Email</Text>

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"map-pin"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{email}</Text>
                            </View>
                        </View>

                    </View>

                    {/* _____________phonenumber___________________ */}

                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >phone number</Text>

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"phone"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >+91 8076705085</Text>
                            </View>
                        </View>

                    </View>



                    {/* _______city____________ */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >City</Text>

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"map-pin"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{city}</Text>
                            </View>
                        </View>

                    </View>

                    {/* ___________category______________________- */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >Category</Text>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"grid"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{category}</Text>
                            </View>
                        </View>

                    </View>


                    {/* _____________Website_____________________- */}

                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >website</Text>
                            {website ?
                                null
                                :
                                <TouchableOpacity onPress={() => { navigation.navigate("EditBrandProfile") }}>
                                    <Text style={{ fontSize: 15, fontWeight: "100", color: "#007bff", alignSelf: "flex-end", marginBottom: 5, textTransform: "capitalize" }} >Add</Text>
                                </TouchableOpacity>
                            }

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"globe"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: website ? "lowercase" : "capitalize" }} >{website ? website : "Please Add Your Website Link"}</Text>
                            </View>
                        </View>

                    </View>

                    {/* ________________applink____________________-- */}
                    <View style={{ minHeight: 100, width: "90%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >app link</Text>
                            {applink ?
                                null
                                :
                                <TouchableOpacity onPress={() => { navigation.navigate("EditBrandProfile") }}>
                                    <Text style={{ fontSize: 15, fontWeight: "100", color: "#007bff", alignSelf: "flex-end", marginBottom: 5, textTransform: "capitalize" }} >Add</Text>
                                </TouchableOpacity>
                            }

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"smartphone"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: applink ? "capitalize" : "none" }} >{applink ? applink : "Please Add Your Applink"}</Text>
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

            <Modal visible={imageselector} dismissable={true} onDismiss={() => { setimageselector(false) }}>
                <View style={{ width: WiDTH, height: HEIGHT }}>
                    <TouchableOpacity onPress={() => { setimageselector(false) }} style={{ width: WiDTH, height: HEIGHT * 3 / 4 }}>

                    </TouchableOpacity>
                    <View style={{ width: WiDTH, height: HEIGHT / 4, backgroundColor: "white", borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                        <View style={{ width: "100%", height: "35%", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2a3659", marginLeft: 20 }} >{forprofile ? "Profile Photo" : "Background Photo"}</Text>
                        </View>
                        <View style={{ width: "100%", height: "55%", justifyContent: "flex-start", flexDirection: "row" }}>

                            <>
                                {backgroundimage != null && forprofile == false ?

                                    <TouchableOpacity activeOpacity={1} onPress={() => { removeimage("backgroundimage")  }}>
                                        <View style={{ height: 45, width: 45, backgroundColor: "#e7164c", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                            <Icons size={18} color={"white"} name={"trash"} />
                                        </View>

                                        <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5 }}>
                                            <Text style={{ fontSize: 14, color: "grey" }}>Remove</Text>
                                            <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </>

                            <>
                                {profileimage != null && forprofile == true ?

                                    <TouchableOpacity activeOpacity={1} onPress={() => { removeimage("profileimage")}}>
                                        <View style={{ height: 45, width: 45, backgroundColor: "#e7164c", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                            <Icons size={18} color={"white"} name={"trash"} />
                                        </View>

                                        <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5 }}>
                                            <Text style={{ fontSize: 14, color: "grey" }}>Remove</Text>
                                            <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                                }
                            </>



                            <TouchableOpacity activeOpacity={1} onPress={() => { launchgallery() }} >
                                <View style={{ height: 45, width: 45, backgroundColor: "#00ca95", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"image"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5, left: -2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Gallery</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => { launchcamera() }}>
                                <View style={{ height: 45, width: 45, backgroundColor: "#4285f4", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"camera"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5, left: -2.5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Camera</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>

            <Dialog dismissable={false} visible={loading} >
                <Dialog.Content>
                    <View style={{ flexDirection: "row" }} >
                        <ActivityIndicator color={"#409cff"} size={20} style={{ marginRight: 20 }} />
                        <Paragraph>Uploading...</Paragraph>
                    </View>
                </Dialog.Content>
            </Dialog>

            <Dialog dismissable={false} visible={loading2} >
                <Dialog.Content>
                    <View style={{ flexDirection: "row" }} >
                        <ActivityIndicator color={"#409cff"} size={20} style={{ marginRight: 20 }} />
                        <Paragraph>Removing...</Paragraph>
                    </View>
                </Dialog.Content>
            </Dialog>

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
