
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';

import axios from "axios";

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const ProfileSixthPage = ({ navigation, route }) => {

    const [disable, setdisable] = useState(true)

    // For YouTube Auth
    const [stats, setstats] = useState([])
    const [youtubeconnected, setyoutubeconnected] = useState(false)
    const [instaconnected, setinstaconnected] = useState(false)
    const [instatoken, setinstatoken] = useState(null)
    const [youtubetoken, setyoutubetoken] = useState(null)
    const [loading, setloading] = useState(false)

    // for Instagram auth
    const [token, settoken] = useState()
    const [instadata, setinstadata] = useState([])
    const [result, setresult] = useState(false)
    const [loading2, setloading2] = useState(false)



    useEffect(() => {
        const func = async () => {
            const uid = await AsyncStorage.getItem("uid")
            const ref = await firestore().collection("influencer")
            //   console.log(route.params.youtubedata);



            if (route.params.youtubedata || route.params.instadata) {

                try {
                    if(route.params.instadata == null){
                        ref.add({
                            uid: uid,
                            name: route.params.name,
                            age: route.params.age,
                            email: route.params.email,
                            city: route.params.city,
                            category: route.params.category,
                            youtubedata:route.params.youtubedata,
                            paymode: route.params.paymode,
                            minrange: route.params.minrange,
                            maxrange: route.params.maxrange
                        })
                    }else if(route.params.youtubedata == null){
                        ref.add({
                            uid: uid,
                            name: route.params.name,
                            age: route.params.age,
                            email: route.params.email,
                            city: route.params.city,
                            category: route.params.category,
                            instadata:route.params.instadata,
                            paymode: route.params.paymode,
                            minrange: route.params.minrange,
                            maxrange: route.params.maxrange
                        })
                    }else{
                        ref.add({
                            uid: uid,
                            name: route.params.name,
                            age: route.params.age,
                            email: route.params.email,
                            city: route.params.city,
                            category: route.params.category,
                            youtubedata:route.params.youtubedata,
                            instadata:route.params.instadata,
                            paymode: route.params.paymode,
                            minrange: route.params.minrange,
                            maxrange: route.params.maxrange
                        })
                    }
                   
                   
                    



                    await AsyncStorage.setItem("datauploadeduser", "true")
                    navigation.navigate("Tabbar")
                    ToastAndroid.show("Signed In",ToastAndroid.SHORT)





                } catch (error) {
                    console.log(error);

                }
            }




        }


        func()
    }, [])



    // const submit = () => {
    //     navigation.navigate("Tabbar", {
    //         name: route.params.name,
    //         age: route.params.age,
    //         email: route.params.email,
    //         city: route.params.city,
    //         category: route.params.category,
    //         youtubetoken: route.params.youtubetoken,
    //         instatoken: route.params.instatoken,
    //         paymode: paymode,
    //         minrange: value1,
    //         maxrange: value2
    //     })
    // }

    // console.log(route.params.youtubetoken)

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>



                <ImageBackground style={{ height: "100%", width: "100%", alignItems: "center" }} source={require("../Icons/rocket.gif")} >
                    <Text style={{ alignSelf: "center", fontSize: 32, fontWeight: "bold", color: "#404852", bottom: 200, position: "absolute" }} >Setting Up</Text>
                    <Text style={{ alignSelf: "center", fontSize: 50, fontWeight: "bold", color: "#404852", bottom: 145, position: "absolute" }} >Everything</Text>
                </ImageBackground>
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
        top: 20,
        left: 12,
        position: "absolute",
    }



})


export default ProfileSixthPage;
