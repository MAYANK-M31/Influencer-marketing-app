
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
    Image, ToastAndroid, ActivityIndicator
} from 'react-native';
import Ionicons from "react-native-vector-icons/Feather"

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import {Modal} from "react-native-paper"
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';

import axios from "axios";
import firestore from "@react-native-firebase/firestore"
import { MyContext } from './AppStartStack';
import WebView from 'react-native-webview';


GoogleSignin.configure({
    webClientId: '808729452255-1eq8j4n13aprkh4hs9vg3paeh2c99jur',
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"]
});

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height






const EditSocialMedia = ({ navigation, route }) => {

    const [disable, setdisable] = useState(null)
    const [disable2, setdisable2] = useState(null)

    const { state, dispatch } = useContext(MyContext)
    const { instaconnected, youtubeconnected } = state

  
    const [instamodal, setinstamodal ] = useState(false)


    // For YouTube Auth
    const [youtubedata, setyoutubedata] = useState(null)
    const [youtubeconnectedTemp, setyoutubeconnectedTemp] = useState(youtubeconnected)
    const [instaconnectedTemp, setinstaconnectedTemp] = useState(instaconnected)
    const [instatoken, setinstatoken] = useState(null)
    const [youtubetoken, setyoutubetoken] = useState(null)
    const [loading, setloading] = useState(false)

    // for Instagram auth
    const [token, settoken] = useState()
    const [instadata, setinstadata] = useState(null)
    const [result, setresult] = useState(false)
    const [loading2, setloading2] = useState(false)

// useEffect(()=>{
//     CookieManager.clearAll(true)
// },[])


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

                    if (res.data.items == undefined) {
                        ToastAndroid.show("Yours Youtube account has nothing to show.", ToastAndroid.LONG)
                        setyoutubeconnectedTemp(false)
                        setyoutubedata(null)
                        setloading(false)
                        signOut()
                        setdisable(false)
                    } else {
                        // console.log(res.data.items[0].statistics);
                        setloading(false)
                        setyoutubedata(res.data)
                        setyoutubeconnectedTemp(true)
                        setdisable(true)

                        // console.log(youtubedata);
                    }

                })


            })
        })
    }


    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

        } catch (error) {
            console.error(error);
        }
    };



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
                        .then(async(res) => {
                            console.log(res.data);
                            var access_token = res.data.access_token
                            setinstatoken(access_token)
                            await axios.get("https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=" + `${access_token}`)
                                .then((res) => {
                                    setloading2(false)
                                    ToastAndroid.show("Connected to Instagram", ToastAndroid.SHORT)
                                    setinstadata(res.data)
                                    // console.log(instadata.data);
                                    setinstaconnectedTemp(true)
                                    setresult(true)
                                    setdisable2(true)
            
                                })
            
                            settoken(access_token)
                        })
                        .catch((e) => {
                            // console.log("err", e);
                            setloading(false)
                            ToastAndroid.show("Failed to connect try again", ToastAndroid.SHORT)
        
                        })
                
                
               


            }

        }



    
    // console.log('data', instadata)

    const onClear = () => {
        CookieManager.clearAll(true)
            .then((res) => {
                setinstaconnectedTemp(false)
                setinstadata(null)
                setdisable2(false)
                ToastAndroid.show("Instagram Signed out", ToastAndroid.SHORT)
            });
    }



    const save = () => {
        if (instaconnectedTemp == false && youtubeconnectedTemp == false) {
            ToastAndroid.show("Connect atleast one account", ToastAndroid.SHORT)
        } else {

            const func = async () => {

                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)

                if (instadata) {

                    ref.update({
                        instadata: instadata
                    }).then(async () => {
                        ToastAndroid.show("Updated", ToastAndroid.SHORT)
                        dispatch({ type: "ADD_INSTACONNECTED", payload: true })
                        navigation.goBack()


                    })


                }

                if (youtubedata) {

                    ref.update({
                        youtubedata: youtubedata
                    }).then(async () => {
                        ToastAndroid.show("Updated", ToastAndroid.SHORT)
                        dispatch({ type: "ADD_YOUTUBECONNECTED", payload: true })
                        navigation.goBack()
                    })




                }


                if (instaconnectedTemp == false) {
                    ref.update({
                        instadata: firestore.FieldValue.delete()
                    }).then(async () => {
                        ToastAndroid.show("Updated", ToastAndroid.SHORT)
                        dispatch({ type: "ADD_INSTACONNECTED", payload: false })
                        navigation.goBack()
                    })
                } else if (youtubeconnectedTemp == false) {
                    ref.update({
                        youtubedata: firestore.FieldValue.delete()
                    }).then(async () => {
                        ToastAndroid.show("Updated", ToastAndroid.SHORT)
                        navigation.goBack()
                        dispatch({ type: "ADD_YOUTUBECONNECTED", payload: false })
                    })
                }


                if (!instadata && !youtubedata) {
                    ToastAndroid.show("Updated", ToastAndroid.SHORT)
                    navigation.goBack()
                }








            }
            func()


        }
    }





    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }}>


                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Edit SocialMedia</Text>
                    </View>
                    <TouchableOpacity onPress={() => { save() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Instagram</Text>
                        {!instaconnectedTemp ?
                            null
                            :
                            <TouchableOpacity onPress={() => onClear()}>
                                <Text style={{ fontSize: 15, fontWeight: "100", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }}>Sign Out</Text>
                            </TouchableOpacity>

                        }

                    </View>

                    <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "#f0f2f5", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                        <TouchableOpacity disabled={instaconnectedTemp} onPress={() => setinstamodal(true)} style={{
                            height: 55, width: "100%", backgroundColor: instaconnectedTemp ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50,
                        }} >
                            {loading2 ?
                                <ActivityIndicator style={{ alignSelf: "center", position: "absolute", left: 20 }} size={20} color={"#1e87fd"} />
                                :
                                instaconnectedTemp ?
                                    <Ionicons name={"check"} size={20} color={"white"} style={{ alignSelf: "center", position: "absolute", left: 20 }} />
                                    :
                                    null

                            }
                            <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require("../Icons/instagram.png")} />
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: instaconnectedTemp ? "white" : "black" }} >{instaconnectedTemp ? "Connected" : "Connect To Instagram"}</Text>
                        </TouchableOpacity>


                        {/* <InstagramLogin
                            ref={ref => (instagramLogin = ref)}
                            appId="441868563443736"
                            appSecret='a04a79f825f35458456f049b802c7f3b'
                            redirectUrl='https://www.google.com/'
                            scopes={['user_profile', 'user_media']}
                            onLoginSuccess={setIgToken}
                            onLoginFailure={(data) => console.log("err", data)}
                        /> */}
                    </View>
                    {/* https://www.instagram.com/oauth/authorize?client_id=441868563443736&redirect_uri=https://www.instagram.com/&scope=user_profile,user_media&response_type=code */}

                </View>

                <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >YouTube</Text>
                        {!youtubeconnectedTemp ? null
                            :
                            <TouchableOpacity onPress={() => signOut().then(() => { setyoutubeconnectedTemp(false), setyoutubedata(null), setdisable(false), ToastAndroid.show("YouTube Signed out", ToastAndroid.SHORT) })}>
                                <Text style={{ fontSize: 15, fontWeight: "100", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }}>Sign Out</Text>
                            </TouchableOpacity>
                        }


                    </View>

                    <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "#f0f2f5", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                        <TouchableOpacity disabled={youtubeconnectedTemp} onPress={() => onGoogleButtonPress()} style={{
                            height: 55, width: "100%", backgroundColor: youtubeconnectedTemp ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50,
                        }} >

                            {loading ?
                                <ActivityIndicator style={{ alignSelf: "center", position: "absolute", left: 20 }} size={20} color={"#1e87fd"} />
                                :
                                youtubeconnectedTemp ?
                                    <Ionicons name={"check"} size={20} color={"white"} style={{ alignSelf: "center", position: "absolute", left: 20 }} />
                                    :
                                    null

                            }



                            <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require("../Icons/youtube.png")} />
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: youtubeconnectedTemp ? "white" : "black" }} >{youtubeconnectedTemp ? "Connected" : "Connect To Youtube"} </Text>
                        </TouchableOpacity>

                    </View>


                </View>






                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", position: "absolute", bottom: "15%", left: 20 }} >Note : It Is Recommended To Connect Your Account </Text>
                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", position: "absolute", bottom: "12.5%", left: 17 }} > To Both Platforms</Text>




            </SafeAreaView>
            
            <Modal visible={instamodal} dismissable={true} onDismiss={() => { setinstamodal(false), CookieManager.clearAll(true) }} >
                <View style={{ width:WiDTH*0.85,height:HEIGHT*0.80,alignSelf:"center",borderRadius:10,overflow:"hidden"}}>

                    <WebView
                    style={{ width:WiDTH*0.85,height:HEIGHT*0.80,alignSelf:"center",borderRadius:10,overflow:"hidden"}}
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


})



export default EditSocialMedia;
