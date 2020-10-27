
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
import { Button } from 'react-native-paper';


GoogleSignin.configure({
    webClientId: '808729452255-1eq8j4n13aprkh4hs9vg3paeh2c99jur',
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"]
});

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height






const ProfileFourthtPage = ({ navigation, route }) => {

    const [disable, setdisable] = useState(true)

    // For YouTube Auth
    const [youtubedata, setyoutubedata] = useState(null)
    const [youtubeconnected, setyoutubeconnected] = useState(false)
    const [instaconnected, setinstaconnected] = useState(false)
    const [instatoken, setinstatoken] = useState(null)
    const [youtubetoken, setyoutubetoken] = useState(null)
    const [loading, setloading] = useState(false)

    // for Instagram auth
    const [token, settoken] = useState()
    const [instadata, setinstadata] = useState(null)
    const [result, setresult] = useState(false)
    const [loading2, setloading2] = useState(false)


    // For Youtube Auth
    async function onGoogleButtonPress() {
        setloading(true)
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential

        auth().signInWithCredential(googleCredential).then(async () => {
            ToastAndroid.show("Connected to YouTube", ToastAndroid.SHORT)
            await GoogleSignin.getTokens().then(async (res) => {
                // console.log(res.accessToken);

                setyoutubetoken(res.accessToken)
                await axios.get("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true&key=AIzaSyB0teIk0vu9KpyKgSXPK4WZnOqqb9aQI0Q&access_token=" + res.accessToken).then((res) => {
                    // console.log(res.data.items[0].statistics);
                    setloading(false)
                    setyoutubedata(res.data)
                    setyoutubeconnected(true)
                    setdisable(false)
                    // console.log(youtubedata);
                })


            })
        })
    }




    // For Instagram auth

    const setIgToken = async (datas) => {
        setloading2(true)
        setresult(false)
        setinstatoken(datas.access_token)

 

        await axios.get("https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=" + `${datas.access_token}`)
            .then((res) => {
                setloading2(false)
                ToastAndroid.show("Connected to Instagram", ToastAndroid.SHORT)
                setinstadata(res.data)
                // console.log(instadata.data);
                setinstaconnected(true)
                setresult(true)
                setdisable(false)

            })
        
        settoken(datas.access_token)
    }
    // console.log('data', instadata)

    const submit = () => {
        navigation.navigate("ProfileFifthPage", {
            name: route.params.name,
            age: route.params.age,
            email: route.params.email,
            city: route.params.city,
            category: route.params.category,
            youtubedata:youtubedata,
            instadata: instadata
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
                </View>

                <View style={style.heading} >
                    <Text style={{ alignSelf: "center", fontSize: 38, fontWeight: "bold", color: "#404852" }} >Please connect your</Text>
                    <Text style={{ alignSelf: "flex-start", fontSize: 38, fontWeight: "bold", color: "#404852" }} >Platforms</Text>
                </View>


                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, position: "absolute", top: 300 }} >


                    <TouchableOpacity onPress={() => instagramLogin.show()} style={{
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


                    <InstagramLogin
                        ref={ref => (instagramLogin = ref)}
                        appId="441868563443736"
                        appSecret='a04a79f825f35458456f049b802c7f3b'
                        redirectUrl='https://www.google.com/'
                        scopes={['user_profile', 'user_media']}
                        onLoginSuccess={setIgToken}
                        onLoginFailure={(data) => console.log(data)}
                    />



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




                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", position: "absolute", bottom: 150, left: 20 }} >Note : It Is Recommended To Connect Your Account </Text>
                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", position: "absolute", bottom: 132, left: 17 }} > To Both Platforms</Text>


                <TouchableOpacity disabled={disable} onPress={() => { submit() }} style={{
                    height: 55, width: "85%", backgroundColor: disable ? "#1e87fdCC" : "#1e87fd"
                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", top: HEIGHT - 85
                }} >
                    <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                        <Ionicons name={"arrow-right"} color={"black"} size={25} />
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Next</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={{top:150}} onPress={()=>{console.log(instadata.data)}} >
                   <Text>check</Text>
               </TouchableOpacity> */}

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
    header: {
        top: 10,
        left: 15,
        position: "absolute",
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
    }



})


export default ProfileFourthtPage;
