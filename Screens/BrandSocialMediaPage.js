
import React, { useEffect, useState } from 'react';
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
    Image, ToastAndroid, ActivityIndicator
} from 'react-native';
import Ionicons from "react-native-vector-icons/Feather"

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';

import axios from "axios";
import { Button, Modal } from 'react-native-paper';
import WebView from 'react-native-webview';


GoogleSignin.configure({
    webClientId: '808729452255-1eq8j4n13aprkh4hs9vg3paeh2c99jur',
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"]
});

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height






const BrandSocialMediaPage = ({ navigation, route }) => {

    const [disable, setdisable] = useState(true)

    // For YouTube Auth
    const [youtubedata, setyoutubedata] = useState(null)
    const [youtubeconnected, setyoutubeconnected] = useState(false)
    const [instaconnected, setinstaconnected] = useState(false)
    const [instatoken, setinstatoken] = useState(null)
    const [youtubetoken, setyoutubetoken] = useState(null)
    const [loading, setloading] = useState(false)

    const [instamodal, setinstamodal] = useState(false)

    // for Instagram auth
    const [token, settoken] = useState()
    const [instadata, setinstadata] = useState(null)
    const [result, setresult] = useState(false)
    const [loading2, setloading2] = useState(false)

    useEffect(() => {
        const signOut = async () => {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();

            } catch (error) {
                console.error(error);
            }
        };
        const onClear = () => {
            CookieManager.clearAll(true)
                .then((res) => {
                    // setinstaconnectedTemp(false)
                    // setinstadata(null)
                    // setdisable2(false)
                    // ToastAndroid.show("Instagram Signed out", ToastAndroid.SHORT)
                });
        }
        signOut()
        onClear()
    }, [])

    // YouTube SignOut Function

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

        } catch (error) {
            console.error(error);
        }
    };

    // For Youtube Auth
    async function onGoogleButtonPress() {

        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential

        auth().signInWithCredential(googleCredential).then(async () => {
            setloading(true)
            ToastAndroid.show("Connected to YouTube", ToastAndroid.SHORT)
            await GoogleSignin.getTokens().then(async (res) => {
                // console.log(res.accessToken);

                setyoutubetoken(res.accessToken)
                await axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true&key=AIzaSyB0teIk0vu9KpyKgSXPK4WZnOqqb9aQI0Q&access_token=" + res.accessToken).then((res) => {
                    // console.log(res.data.items[0].statistics);
                    if (res.data.items == undefined) {
                        ToastAndroid.show("Yours Youtube account has nothing to show.", ToastAndroid.LONG)
                        setyoutubedata(null)
                        setloading(false)
                        signOut()
                        setdisable(true)
                    } else {
                        setloading(false)
                        setyoutubedata(res.data)
                        setyoutubeconnected(true)
                        setdisable(false)
                        // console.log(youtubedata);
                    }

                })



            })
                .catch((e) => {
                    setdisable(true)
                    setyoutubedata(null)
                    setloading(false)
                    signOut()
                    ToastAndroid.show("Try Again", ToastAndroid.LONG)
                    loading(false)
                })

        })
    }




    // For Instagram auth

    const urlcodefinder = async (data) => {
        // console.log(data.url);

        var str = data.url
        // console.log(str);

        var x = str.search("https://www.google.com/\\?code=")
        // console.log(x);

        if (x !== -1) {
            setinstamodal(false)
            setloading2(true)
            setresult(false)
            // console.log("got it",data.url);
            var Oauth_code = data.url.split("=")[1].replace("#_", "")
            // console.log("outh",Oauth_code);

            var bodyFormData = new FormData();
            bodyFormData.append('client_id', '441868563443736');
            bodyFormData.append('client_secret', 'a04a79f825f35458456f049b802c7f3b');
            bodyFormData.append('code', Oauth_code);
            bodyFormData.append('grant_type', 'authorization_code');
            bodyFormData.append('redirect_uri', 'https://www.google.com/');
            await axios({
                method: "post",
                url: "https://api.instagram.com/oauth/access_token?",
                data: bodyFormData,

            })
                .then(async (res) => {
                    console.log(res.data);
                    var access_token = res.data.access_token
                    setinstatoken(access_token)
                    await axios.get("https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=" + `${access_token}`)
                        .then((res) => {
                            setloading2(false)
                            ToastAndroid.show("Connected to Instagram", ToastAndroid.SHORT)
                            setinstadata(res.data)
                            // console.log(instadata.data);
                            setinstaconnected(true)
                            setresult(true)
                            setdisable(false)

                        })

                    settoken(access_token)
                })
                .catch((e) => {
                    console.log("err", e);
                    setloading(false)
                    ToastAndroid.show("Failed to connect try again", ToastAndroid.SHORT)

                })





        }

    }
    // console.log('data', instadata)





    const submit = () => {
        navigation.navigate("BrandDataUpload", {
            name: route.params.name,
            brandname: route.params.brandname,
            email: route.params.email,
            city: route.params.city,
            category: route.params.category,
            youtubedata: youtubedata,
            instadata: instadata,
            website: route.params.website,
            applink: route.params.applink,
            campaigntitle: route.params.campaigntitle,
            campaigndescription: route.params.campaigndescription,
            paymode: route.params.paymode,
            platform: route.params.platform,
            youtubesubs: route.params.youtubesubs,
            instafollowers: route.params.instafollowers,
            minrange: route.params.minrange,
            maxrange: route.params.maxrange,
            minage:route.params.minage,
            maxage:route.params.maxage,
            brandpostcategory:route.params.brandpostcategory,
            brandotherpostcategory:route.params.brandotherpostcategory,
            targetaudience:route.params.targetaudience,
            targetregion:route.paramstargetregion,
            campaignStartDate:route.params.campaignStartDate,
            campaignEndDate:route.params.campaignEndDate,
            profileimage: route.params.profileimage,
            backgroundimage: route.params.backgroundimage,
            extraimages:route.params.extraimages
        })
    }

    const skip = () => {
        navigation.navigate("BrandDataUpload", {
            name: route.params.name,
            brandname: route.params.brandname,
            email: route.params.email,
            city: route.params.city,
            category: route.params.category,
            website: route.params.website,
            applink: route.params.applink,
            youtubedata: youtubedata,
            instadata: instadata,
            campaigntitle: route.params.campaigntitle,
            campaigndescription: route.params.campaigndescription,
            paymode: route.params.paymode,
            platform: route.params.platform,
            youtubesubs: route.params.youtubesubs,
            instafollowers: route.params.instafollowers,
            minrange: route.params.minrange,
            maxrange: route.params.maxrange,
            minage:route.params.minage,
            maxage:route.params.maxage,
            brandpostcategory:route.params.brandpostcategory,
            brandotherpostcategory:route.params.brandotherpostcategory,
            targetaudience:route.params.targetaudience,
            targetregion:route.params.targetregion,
            campaignStartDate:route.params.campaignStartDate,
            campaignEndDate:route.params.campaignEndDate,
            profileimage: route.params.profileimage,
            backgroundimage: route.params.backgroundimage,
            extraimages:route.params.extraimages

        })
    }



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"black"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { skip() }} style={{ height: 30, width: 50, borderRadius: 50, backgroundColor: "#1e87fd", justifyContent: "center", alignItems: "center", position: "absolute", right: 30 }}>
                        <Text style={{ color: "white", fontWeight: "bold", alignSelf: "center" }} >Skip</Text>
                    </TouchableOpacity>

                </View>

                <View style={style.heading} >
                    <Text style={{ alignSelf: "center", fontSize: 38, fontWeight: "bold", color: "#404852" }} >Please connect your</Text>
                    <Text style={{ alignSelf: "flex-start", fontSize: 38, fontWeight: "bold", color: "#404852" }} >Platforms</Text>
                </View>


                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, position: "absolute", top: 300 }} >


                    <TouchableOpacity  onPress={() => setinstamodal(true)} style={{
                        height: 55, width: "92%", backgroundColor: instaconnected ? "#1e87fd" : "white"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                    }} >
                        {loading2 ?
                            <ActivityIndicator style={{ alignSelf: "center", position: "absolute", left: 20 }} size={20} color={"#1e87fd"} />
                            :
                            instaconnected ?
                                <Ionicons name={"check"} size={20} color={"white"} style={{ alignSelf: "center", position: "absolute", left: 20 }} />
                                :
                                null

                        }
                        <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require("../Icons/instagram.png")} />
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: instaconnected ? "white" : "black" }} >{instaconnected ? "Connected" : "Connect To Instagram"}</Text>
                    </TouchableOpacity>


                   



                    <TouchableOpacity onPress={() => onGoogleButtonPress()} style={{
                        height: 55, width: "92%", backgroundColor: youtubeconnected ? "#1e87fd" : "white"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                    }} >

                        {loading ?
                            <ActivityIndicator style={{ alignSelf: "center", position: "absolute", left: 20 }} size={20} color={"#1e87fd"} />
                            :
                            youtubeconnected ?
                                <Ionicons name={"check"} size={20} color={"white"} style={{ alignSelf: "center", position: "absolute", left: 20 }} />
                                :
                                null

                        }



                        <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require("../Icons/youtube.png")} />
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: youtubeconnected ? "white" : "black" }} >{youtubeconnected ? "Connected" : "Connect To Youtube"} </Text>
                    </TouchableOpacity>


                </View>




                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", position: "absolute", bottom: 150, left: 20 }} >Note : This Will Integrate Your Account With Your </Text>
                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", position: "absolute", bottom: 132, left: 17 }} > Instagram Page and YouTube Account </Text>


                <TouchableOpacity disabled={disable} onPress={() => { submit() }} style={{
                    height: 55, width: "85%", backgroundColor: disable ? "#1e87fd44" : "#1e87fd"
                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", top: HEIGHT - 85
                }} >
                    <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                        <Ionicons name={"arrow-right"} color={"black"} size={25} />
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Finish</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{top:150}} onPress={()=>{console.log(instadata.data)}} >
                   <Text>check</Text>
               </TouchableOpacity> */}

            </SafeAreaView>
            <Modal visible={instamodal} dismissable={true} onDismiss={() => { setinstamodal(false), CookieManager.clearAll(true) }} >
                <View style={{ width: WiDTH * 0.85, height: HEIGHT * 0.80, alignSelf: "center", borderRadius: 10, overflow: "hidden" }}>

                    <WebView
                        style={{ width: WiDTH * 0.85, height: HEIGHT * 0.80, alignSelf: "center", borderRadius: 10, overflow: "hidden" }}
                        source={{ uri: "https://www.instagram.com/oauth/authorize?client_id=441868563443736&redirect_uri=https://www.google.com/&scope=user_profile,user_media&response_type=code" }}
                        onNavigationStateChange={(data) => urlcodefinder(data)}
                        javaScriptEnabled={true}

                    />

                </View>
            </Modal>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",


    },
    header: {
        top: 10,
        left: 15,
        position: "absolute",
        flexDirection: "row",
        width: WiDTH
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
    }



})


export default BrandSocialMediaPage;
