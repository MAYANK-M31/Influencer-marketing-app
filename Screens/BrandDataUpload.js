
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

const BrandDataUpload = ({ navigation, route }) => {

    const [text, settext] = useState("Creating Your Account")

    const [extraimagesarray, setextraimagesarray] = useState([])
    const [profileimage, setprofileimage] = useState(route.params.profileimage)
    const [backgroundimage, setbackgroundimage] = useState(route.params.backgroundimage)
    const [uploaded, setuploaded] = useState(null)
    const [num, setnum] = useState(0)
    const [imageloader, setimageloader] = useState(true)
    const [uploaddatas,setuploaddatas]  = useState(false)

    const [profileup, setprofileup] = useState(null)
    const [backgdup, setbackgdup] = useState(null)





    const { state, dispatch } = useContext(MyContext)
    const { campaignposts, campaignpostedagain } = state;
    const { brandprofileimage} = state;




    const imageuploadfunc = async () => {



        if (profileimage) {
            console.log("profile stack");


            setimageloader(true)
            settext("Uploading Images")
            var x = 0
            const reference = storage().ref(`/images/brandscampaigns/${profileimage.filename}`)
            reference.putFile(profileimage.uri)
                .then((res) => {

                    x += 1

                    if (res.state == "success") {
                        settext("Uploading Profile Image")
                        setuploaded((x / 1) * 100)
                    } else if (res.state == "running") {
                        settext("please wait Uploading Image ")
                    } else if (res.state == "error") {
                        settext("Failed to upload image")

                    }

                    const imageref = storage().ref(res.metadata.fullPath)
                    imageref
                        .getDownloadURL()
                        .then((profileurl) => {
                            // console.log(url);
                          
                              
                             
                            

                            setimageloader(false)
                            if (backgroundimage) {
                                console.log("yes background + profile");

                                setbackgdup(false)
                                setimageloader(true)
                                settext("Uploading Images")
                                setimageloader(true)
                                var x = 0
                                const reference = storage().ref(`/images/brandscampaigns/${backgroundimage.filename}`)
                                reference.putFile(backgroundimage.uri)
                                    .then((res) => {

                                        x += 1

                                        if (res.state == "success") {
                                            settext("Uploading Background Image")
                                            setuploaded((x / 1) * 100)
                                        } else if (res.state == "running") {
                                            settext("please wait Uploading Image ")
                                        } else if (res.state == "error") {
                                            settext("Failed to upload image")

                                        }

                                        const imageref = storage().ref(res.metadata.fullPath)
                                        imageref
                                            .getDownloadURL()
                                            .then((backgroundurl) => {
                                                // console.log(url);
                                          

                                                setimageloader(false)
                                                if (route.params.extraimages.length > 0) {
                                                    console.log("yes extra + profile + back");



                                                    setimageloader(true)
                                                    settext("Uploading Images")
                                                    var x = 0

                                                    route.params.extraimages.map((item, index) => {
                                                        // console.log(item);
                                                        const reference = storage().ref(`/images/brandscampaigns/${item.filename}`)
                                                        reference.putFile(item.uri)
                                                            .then((res) => {

                                                                x += 1


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
                                                                    .then((extraimgurl) => {
                                                                        // console.log(url);
                                                                        extraimagesarray.push(extraimgurl)
                                                                        setextraimagesarray(extraimagesarray)

                                                                        setimageloader(false)

                                                                        if (extraimagesarray.length == route.params.extraimages.length) {
                                                                            uploaddata({profileimage:profileurl,backgroundimage:backgroundurl,extraimages:extraimgurl})
                                                                        }

                                                                    })

                                                            })
                                                            .catch((e) => {
                                                                console.log("error to uplaod", e);
                                                            })

                                                    })



                                                } else {
                                                    console.log("only profile + back");

                                                    uploaddata({profileimage:profileurl,backgroundimage:backgroundurl,extraimages:null})

                                                }

                                            })


                                    })
                                    .catch((e) => {
                                        settext("Failed to upload background image")
                                    })


                            } else {
                                setimageloader(false)
                                if (route.params.extraimages.length > 0) {
                                    console.log("yes extra + profile");



                                    setimageloader(true)
                                    settext("Uploading Images")
                                    var x = 0
                                    if (route.params.extraimages.length > 0) {
                                        route.params.extraimages.map((item, index) => {
                                            console.log(item);
                                            const reference = storage().ref(`/images/brandscampaigns/${item.filename}`)
                                            reference.putFile(item.uri)
                                                .then((res) => {
                                                    console.log(res);
                                                    console.log(res.state);


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
                                                        .then((extraimgurl) => {
                                                            // console.log(url);
                                                            extraimagesarray.push(extraimgurl)
                                                            setextraimagesarray(extraimagesarray)
                                                            setimageloader(false)

                                                            if (extraimagesarray.length == route.params.extraimages.length) {
                                                                uploaddata({profileimage:profileurl,backgroundimage:null,extraimages:extraimgurl})
                                                            }

                                                        })

                                                })
                                                .catch((e) => {
                                                    console.log("error to uplaod", e);
                                                })

                                        })
                                    }

                                } else {
                                    
                                    console.log("only only profile");
                                    setimageloader(false)
                                    uploaddata({profileimage:profileurl,backgroundimage:null,extraimages:null})
                                }

                            }
                        })

                })
                .catch((e) => {
                    settext("Failed to upload profile image")
                    setimageloader(false)
                })


        } else if (backgroundimage) {
            console.log("background stack");
            setimageloader(false)

            setimageloader(true)
            settext("Please Wait")
            var x = 0
            const reference = storage().ref(`/images/brandscampaigns/${backgroundimage.filename}`)
            reference.putFile(backgroundimage.uri)
                .then((res) => {

                    x += 1

                    if (res.state == "success") {
                        settext("Uploading Background Image")
                        setuploaded((x / 1) * 100)
                    } else if (res.state == "running") {
                        settext("please wait Uploading Image ")
                    } else if (res.state == "error") {
                        settext("Failed to upload image")

                    }

                    const imageref = storage().ref(res.metadata.fullPath)
                    imageref
                        .getDownloadURL()
                        .then((backgroundurl) => {
                            // console.log(url);
                        

                            setimageloader(false)
                            if (route.params.extraimages.length > 0) {
                                console.log("yes extra + back");


                                setimageloader(true)
                                settext("Please Wait")
                                var x = 0

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
                                                .then((extraimgurl) => {
                                                    // console.log(url);
                                                    extraimagesarray.push(extraimgurl)
                                                    setextraimagesarray(extraimagesarray)

                                                    setimageloader(false)

                                                    if (extraimagesarray.length == route.params.extraimages.length) {
                                                        uploaddata({profileimage:null,backgroundimage:backgroundurl,extraimages:extraimgurl})
                                                    }

                                                })

                                        })
                                        .catch((e) => {
                                            settext("failed to upload image")
                                            console.log("error to uplaod", e);
                                        })

                                })



                            } else {
                                console.log("only back");
                                setimageloader(false)
                                uploaddata({profileimage:null,backgroundimage:backgroundurl,extraimages:null})

                            }

                        })


                })
                .catch((e) => {
                    settext("Failed to upload background image")
                })




        } else if (route.params.extraimages.length > 0) {
            setimageloader(false)
            console.log("ony extra iamges");


            setimageloader(true)
            settext("Uploading Images")
            var x = 0

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
                            .then((extraimgurl) => {
                                // console.log(url);
                                extraimagesarray.push(extraimgurl)
                                setextraimagesarray(extraimagesarray)



                                if (extraimagesarray.length == route.params.extraimages.length) {
                                    uploaddata({profileimage:null,backgroundimage:null,extraimages:extraimgurl})
                                }

                            })

                    })
                    .catch((e) => {
                        settext("Failed to upload image")
                        console.log("error to uplaod", e);
                    })

            })



        } else {
            console.log("nothing");
            setimageloader(false)
            setimageloader(true)
            setuploaded(10)
            setuploaded(50)

            uploaddata({profileimage:null,backgroundimage:null,extraimages:null})



        }







    }







    useEffect(() => {
        const func = async () => {

            const uid = await AsyncStorage.getItem("uid")
            const ref = await firestore().collection("brandaccount")
            const ref2 = await firestore().collection("brandpost")

            try {
                if (route.params.postcampaign == false) {
                    ref.add({
                        uid: uid,
                        name: route.params.name,
                        brandname: route.params.brandname,
                        email: route.params.email,
                        city: route.params.city,
                        category: route.params.category,
                        website: route.params.website,
                        applink: route.params.applink,
                        createdAt: (new Date()).toString()
                    }).then(() => {
                        ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT)
                        dispatch({ type: "ADD_UPLOADEDUSER", payload: true })
                    })
                } else {
                    imageuploadfunc()
                }

            } catch (error) {
                console.log(error);
                ToastAndroid.show("Failed to make account try again", ToastAndroid.SHORT)
                settext("Try Again")
                dispatch({ type: "ADD_LOGGEDIN", payload: false })
                const myfunc = async () => {
                    await AsyncStorage.clear()
                }
                myfunc()

            }
        }
        func()
    }, [])




    const uploaddata = async (item) => {

        const uid = await AsyncStorage.getItem("uid")
        const ref = await firestore().collection("brandaccount")
        const ref2 = await firestore().collection("brandpost")

        // console.log(url,profileimage);
        

        try {
            if (route.params.postcampaign == false) {
                setimageloader(false)
                settext("Creating Account")
                ref.add({
                    uid: uid,
                    name: route.params.name,
                    brandname: route.params.brandname,
                    email: route.params.email,
                    city: route.params.city,
                    category: route.params.category,
                    website: route.params.website,
                    applink: route.params.applink,
                    createdAt: (new Date()).toString()
                }).then(() => {
                    ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT)
                    dispatch({ type: "ADD_UPLOADEDUSER", payload: true })
                })
            } else {
                ref.add({
                    uid: uid,
                    name: route.params.name,
                    brandname: route.params.brandname,
                    email: route.params.email,
                    city: route.params.city,
                    category: route.params.category,
                    website: route.params.website,
                    applink: route.params.applink,
                    createdAt: (new Date()).toString()
                }).then(() => {
                    settext("Posting Your Campaign")
                    ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT)
                    const datamodal = {
                        uid: uid,
                        campaigntitle: route.params.campaigntitle,
                        campaigndescription: route.params.campaigndescription,
                        paymode: route.params.paymode,
                        platform: route.params.platform,
                        youtubesubs: route.params.youtubesubs,
                        instafollowers: route.params.instafollowers,
                        minrange: route.params.minrange,
                        maxrange: route.params.maxrange,
                        minage: route.params.minage,
                        maxage: route.params.maxage,
                        brandpostcategory: route.params.brandpostcategory,
                        brandotherpostcategory: route.params.brandotherpostcategory,
                        targetaudience: route.params.targetaudience,
                        targetregion: route.params.targetregion,
                        website: route.params.website,
                        applink: route.params.applink,
                        campaignStartDate: route.params.campaignStartDate,
                        campaignEndDate: route.params.campaignEndDate,
                        website: route.params.website,
                        applink: route.params.applink,
                        profileimage: item.profileimage,
                        backgroundimage: item.backgroundimage,
                        extraimages: extraimagesarray.length == 0 ? null : extraimagesarray,
                        youtubedata: route.params.youtubedata,
                        instadata: route.params.instadata,
                        createdAt: (new Date()).toString()
                    }
                    ref2.add(datamodal).then(async() => {
                       
                        dispatch({ type: "ADD_CAMPAIGNPOSTS", payload: datamodal })
                        dispatch({ type: "ADD_UPLOADEDUSER", payload: true })

                        await AsyncStorage.setItem("datauploadeduser", "true")

                        ToastAndroid.show("Campaign Posted Successfully", ToastAndroid.SHORT)
                    })
                })

            }



        } catch (error) {
            console.log(error);
            ToastAndroid.show("Failed to make account try again", ToastAndroid.SHORT)
            settext("Try Again")
            dispatch({ type: "ADD_LOGGEDIN", payload: false })
            const myfunc = async () => {
                await AsyncStorage.clear()
            }
            myfunc()

        }
    }


    const useridfunc = async () => {
        const { currentUser } = auth()
        const uid = { currentUser }.currentUser.uid
        const phonenumber = { currentUser }.currentUser.phoneNumber
        // await AsyncStorage.setItem("uid", uid)
        await AsyncStorage.setItem("phonenumber", phonenumber)
        // console.log({currentUser}.currentUser);

    }
    useridfunc()



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


export default BrandDataUpload;
