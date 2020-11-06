
import React, { useEffect, useState, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Alert,
    View,
    Text,
    StatusBar,
    Dimensions,
    BackHandler,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ToastAndroid
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { MyContext } from './AppStartStack';
import { ActivityIndicator } from 'react-native-paper';
import storage from '@react-native-firebase/storage';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BrandCampUpload = ({ navigation, route }) => {

    const [text, settext] = useState("Posting Your Campaign")
    const [extraimagesarray, setextraimagesarray] = useState([])
    const [profileimage, setprofileimage] = useState(null)
    const [backgroundimage, setbackgroundimage] = useState(null)
    const [uploaded, setuploaded] = useState(null)
    const [num, setnum] = useState(0)
    const [imageloader, setimageloader] = useState(true)

    const [profileup, setprofileup] = useState(null)
    const [backgdup, setbackgdup] = useState(null)
    const [extraimgup, setextraimgup] = useState(null)


    const { state, dispatch } = useContext(MyContext)
    const { campaignposts, campaignpostedagain } = state;


    const uploadimages = async () => {
        
        setextraimgup(false)
        setimageloader(true)
        settext("Uploading Images")
        var x = 0
        if (route.params.extraimages.length > 0) {
            route.params.extraimages.map((item, index) => {
                // console.log(item);
                const reference = storage().ref(`/images/brandscampaigns/${item.filename}`)
                reference.putFile(item.uri)
                    .then((res) => {
                        // console.log(res);
                        // console.log(res.state);


                        x += 1
                        // console.log(x);



                        if (res.state == "success") {
                            settext("Uploading Images" + " " + x + "/" + route.params.extraimages.length)
                            setuploaded((x / route.params.extraimages.length) * 100)
                        } else if (res.state == "running") {
                            settext("please wait Uploading Images ")
                        } else if (res.state == "error") {
                            settext("Failed to upload image")

                        }

                        const imageref = storage().ref(res.metadata.fullPath)
                        imageref
                            .getDownloadURL()
                            .then((url) => {
                                // console.log(url);
                                extraimagesarray.push(url)
                                setextraimagesarray(extraimagesarray)
                                setextraimgup(true)

                            })

                    })
                    .catch((e) => {
                        console.log("error to uplaod", e);
                    })

            })
        }

        if (route.params.profileimage) {
            uploadprofile()
        }
        if (route.params.backgroundimage) {
            uploadbackground()
        }

    }


    const uploadprofile = async () => {
        setprofileup(false)
        setimageloader(true)
        settext("Uploading Images")
        var x = 0
        const reference = storage().ref(`/images/brandscampaigns/${route.params.profileimage.filename}`)
        reference.putFile(route.params.profileimage.uri)
            .then((res) => {
                // console.log(res);
                // console.log(res.state);


                x += 1
                // console.log(x);



                if (res.state == "success") {
                    settext("Uploading Profile Image" + " " + x + "/" + "1")
                    setuploaded((x / 1) * 100)
                } else if (res.state == "running") {
                    settext("please wait Uploading Image ")
                } else if (res.state == "error") {
                    settext("Failed to upload image")

                }

                const imageref = storage().ref(res.metadata.fullPath)
                imageref
                    .getDownloadURL()
                    .then((url) => {
                        // console.log(url);
                        setprofileimage(url)
                        setprofileup(true)
                    })

            })
            .catch((e) => {
                settext("Failed to upload profile image")
            })
    }

    const uploadbackground = async () => {
        setbackgdup(false)
        setimageloader(true)
        settext("Uploading Images")
        var x = 0
        const reference = storage().ref(`/images/brandscampaigns/${route.params.backgroundimage.filename}`)
        reference.putFile(route.params.backgroundimage.uri)
            .then((res) => {
                // console.log(res);
                // console.log(res.state);


                x += 1

                if (res.state == "success") {
                    settext("Uploading Background Image" + " " + x + "/" + "1")
                    setuploaded((x / 1) * 100)
                } else if (res.state == "running") {
                    settext("please wait Uploading Image ")
                } else if (res.state == "error") {
                    settext("Failed to upload image")

                }

                const imageref = storage().ref(res.metadata.fullPath)
                imageref
                    .getDownloadURL()
                    .then((url) => {
                        // console.log(url);
                        setprofileimage(url)
                        setbackgdup(true)
                    })


            })
            .catch((e) => {
                settext("Failed to upload background image")
            })
    }


    useEffect(() => {


        const func = async () => {

          await uploadimages()



            const uid = await AsyncStorage.getItem("uid")
            const ref = await firestore().collection("brandpost")



        }



        func()

    }, [])

    useEffect(()=>{
        console.log(profileup);
        
    },[profileup])


    // try {
    //     settext("Posting Your Campaign")

    //     const datamodal = {
    //         uid: uid,
    //         campaigntitle: route.params.campaigntitle,
    //         campaigndescription: route.params.campaigndescription,
    //         paymode: route.params.paymode,
    //         platform: route.params.platform,
    //         youtubesubs: route.params.youtubesubs,
    //         instafollowers: route.params.instafollowers,
    //         minrange: route.params.minrange,
    //         maxrange: route.params.maxrange,
    //         minage: route.params.minage,
    //         maxage: route.params.maxage,
    //         brandpostcategory: route.params.brandpostcategory,
    //         brandotherpostcategory: route.params.brandotherpostcategory,
    //         targetaudience: route.params.targetaudience,
    //         targetregion: route.params.targetregion,
    //         campaignStartDate: route.params.campaignStartDate,
    //         campaignEndDate: route.params.campaignEndDate,
    //         website: route.params.website,
    //         applink: route.params.applink,
    //         profileimage: profileimage,
    //         backgroundimage: backgroundimage,
    //         extraimages: extraimagesarray,
    //         createdAt: (new Date()).toString()
    //     }
    //     ref.add(datamodal).then(() => {
    //         campaignposts.push(datamodal)
    //         dispatch({ type: "ADD_CAMPAIGNPOSTEDAGAIN", payload: false })
    //         dispatch({ type: "ADD_CAMPAIGNPOSTS", payload: campaignposts })
    //         dispatch({ type: "ADD_CAMPAIGNPOSTEDAGAIN", payload: true })
    //         ToastAndroid.show("Campaign Posted Successfully", ToastAndroid.SHORT)
    //     })





    // } catch (error) {
    //     console.log(error);
    //     ToastAndroid.show("Failed to post campaign try again", ToastAndroid.SHORT)
    //     settext("Try Again")
    //     navigation.goBack()

    // }




    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={{ top: 100, justifyContent: "center", alignItems: "center" }} >
                    <Image style={{ height: 250, width: 250, borderRadius: 250, zIndex: 1 }} source={require("../Icons/illustartion1.jpg")} />
                    <ActivityIndicator color={"#11ece5"} size={260} style={{ top: -255 }} />
                </View>

                {imageloader ?
                    <View style={{ height: 10, width: 200, bottom: 75, borderRadius: 100, borderColor: "lightgrey", borderWidth: 1, overflow: "hidden" }} >
                        <View style={{ width: (200 * uploaded) / 100, height: "100%", backgroundColor: "aqua" }}></View>
                    </View>
                    :
                    null
                }


                <Text style={{ alignSelf: "center", fontSize: 28, fontWeight: "bold", color: "#404852", textTransform: "capitalize" }} >{text}</Text>

            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    heading: {
        top: 20,
        left: 15,
        position: "absolute",
    }



})


export default BrandCampUpload;
