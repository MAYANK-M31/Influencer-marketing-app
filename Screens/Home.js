
import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Button, BackHandler, Alert, AsyncStorage, Modal, ToastAndroid, AppState
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import Icons from "react-native-vector-icons/Ionicons"
import auth from '@react-native-firebase/auth';
import axios from "axios"
import firestore from "@react-native-firebase/firestore"
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

import { MyContext } from './AppStartStack';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-community/cookies';
import { TouchableRipple } from 'react-native-paper';



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height







const Home = ({ navigation }) => {


    const { state, dispatch } = useContext(MyContext)
    const { type, requestsent, CurrentChatRoomId } = state;

    // TO CHECK APP STATE WHEATHER OPENED OR IN BACKGROUND
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            // ToastAndroid.show("App has come to the foreground!", ToastAndroid.SHORT);
            if (CurrentChatRoomId !== null) {
                const ref = database().ref(CurrentChatRoomId)
                if(type == "influencer"){
                    ref.update({ onlineInfluencer: true })
                }else{
                    ref.update({ onlineBrand: true })
                }
            }

        } else {
            // ToastAndroid.show("App has come to the Background!", ToastAndroid.SHORT);
            if (CurrentChatRoomId !== null) {
                const ref = database().ref(CurrentChatRoomId)
                if(type == "influencer"){
                    ref.update({ onlineInfluencer: false })
                }else{
                    ref.update({ onlineBrand: false })
                }
              
            }

        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        // ToastAndroid.show("AppState" + appState.current, ToastAndroid.SHORT);
    };

    //  TO CHECK APP STATE WHEATHER OPENED OR IN BACKGROUND (END)


    // To GET FCM TOKEN FOR NOTIFICATIONS

    useEffect(() => {


        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            ToastAndroid.show("You got a new message", ToastAndroid.SHORT)
        });

        // const getFcmToken = async () => {

        //     const fcmToken = await messaging().getToken();
        //     const SavedFCMToken = await AsyncStorage.getItem("FCM_Token")  // Saved in device  - Asyncstorage

        //     if (fcmToken) {
        //         // console.log(fcmToken);
        //         console.log("Your Firebase Token is:", fcmToken);

        //         // To Chane Token in database if user reinstall app install app  looged out or delete app data 
        //         if (fcmToken == SavedFCMToken) {
        //             alert("Same token as aloted ")
        //         } else {
        //             await AsyncStorage.setItem("FCM_Token", fcmToken).then(() => {
        //                 alert("FCM Token Set")
        //             })
        //         }

        //     } else {
        //         console.log("Failed", "No token received");
        //     }
        // }



        // getFcmToken()

        return unsubscribe;
    }, []);



    const FCM_Brand_Func = async (item) => {
        const fcmToken = await messaging().getToken();

        if (fcmToken) {
            const ref = await firestore().collection("brandaccount").doc(item)
            ref.update({
                FCM_TOKEN: fcmToken
            }).then(async () => {
                alert("FCM Token Set")
            })
        } else {
            console.log("Failed", "No token received");
        }




    }

    const FCM_Influencer_Func = async (item) => {
        const fcmToken = await messaging().getToken();

        if (fcmToken) {
            const ref = await firestore().collection("influencer").doc(item)
            ref.update({
                FCM_TOKEN: fcmToken
            }).then(async () => {
                alert("FCM Token Set")
            })
        } else {
            console.log("Failed", "No token received");
        }




    }



    useEffect(() => {
        const myfunc = async () => {

            const fcmToken = await messaging().getToken();

            const uid = await AsyncStorage.getItem("uid")
            const type = await AsyncStorage.getItem("type")
            dispatch({ type: "ADD_TYPE", payload: type })

            if (type == "influencer") {
                const ref = await firestore().collection("influencer").where("uid", "==", uid)
                ref.get().then(async function (querySnapshot) {
                    querySnapshot.forEach(async function (doc) {
                        if (doc.exists) {
                            await AsyncStorage.setItem("DocId", doc.id)

                            if (fcmToken !== doc.data().FCM_TOKEN) {
                                FCM_Influencer_Func(doc.id)
                            } else {
                                // alert("same token")
                            }

                            dispatch({ type: "ADD_ALLINFLUENCERDATA", payload: doc.data() })
                            if (doc.data().requestssent) {
                                dispatch({ type: "ADD_REQUESTSENT", payload: doc.data().requestssent })
                            } else {
                                dispatch({ type: "ADD_REQUESTSENT", payload: [] })
                            }
                        } else {
                            ToastAndroid.show("Cant Find your account", ToastAndroid.SHORT)
                        }

                        // console.log(doc.data().requestssent)


                    })


                })
            } else {
                const ref = await firestore().collection("brandaccount").where("uid", "==", uid)
                ref.get().then(async function (querySnapshot) {
                    querySnapshot.forEach(async function (doc) {
                        if (doc.data()) {
                            await AsyncStorage.setItem("DocId", doc.id)

                            if (fcmToken !== doc.data().FCM_TOKEN) {
                                FCM_Brand_Func(doc.id)
                            } else {
                                // alert("same token")
                            }



                            dispatch({ type: "ADD_ALLBRANDACCOUNTDATA", payload: doc.data() })
                            // console.log(doc.data());

                        } else {
                            dispatch({ type: "ADD_ALLBRANDACCOUNTDATA", payload: [] })
                        }
                        // console.log(doc.data().requestssent)


                    })


                })
            }
        }
        myfunc()
    }, [])


    const func = async () => {
        const type = await AsyncStorage.getItem("type")
        dispatch({ type: "ADD_TYPE", payload: type })

    }
    func()




    // useEffect(() => {
    // const my = async () => {
    //     var bodyFormData = new FormData();
    //     bodyFormData.append('client_id', '441868563443736');
    //     bodyFormData.append('client_secret', 'a04a79f825f35458456f049b802c7f3b');
    //     bodyFormData.append('code', 'AQBEYAgfAypbH_tk8_9Uy4TZ4rYsgHyTJLiHZquwMLFM5wiptEfgIzmDtO5paDSMhlSwtzPYIYY1N5Gt9yu1VEAUTbYC4vh8Yy1cM_4ZXPRckff4PpCmEUBg2is7ThOCJrR3D5LafWvInZDzi3NQ8qs8tDcxKjaJy_k5EP6Dt2hLohnk6kVmSjDtkhWLIdHyUJhvQcnhUlDJRRZVmT0e7TMdP_2ukvVDW-c-_185hTSyGg');
    //     bodyFormData.append('grant_type', 'authorization_code');
    //     bodyFormData.append('redirect_uri', 'https://www.google.com/');
    //     await axios({
    //         method: "post",
    //         url: "https://api.instagram.com/oauth/access_token?",
    //         data: bodyFormData,

    //     })
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((e) => {
    //             console.log("err", e);

    //         })
    // }
    //     my()
    // }, {})


    // const func = async () => {
    //     await firestore().collection("chats").doc("RDFPR0AodjGrjTwQoHWm")
    //     .onSnapshot(function(doc) {
    //         console.log("Current data: ", doc.data());
    //     });



    // }
    // func()

    // useEffect(()=>{
    //     const { currentUser } = auth()
    //     console.log({currentUser});

    // },[])

    // useEffect(()=>{
    //     // CookieManager.clearAll(true)
    //     // console.log(data.url);

    //     var str = "https://www.google.com/?code=AQASEYleKhX1Z6r8RRB-xnDkKCyx88CnoO4NUbPV2-4uKDORmGjGL8SrB79u-thpatD7jd5OsMzHutwm90OUdWYU9-Wv8Nivy-gAR20uYTNmTfHpsMAwmKSl3ojKZ5cFWt9evM4DvsxWzuPx2yvBYJT3H-b3YvzpRrDQUMw7KQfZ21qajUvfett5uhPs4hZJ0vUBdwPwwY1srD1-l8aeVAIB-yjEdxYlubeCa3R_Ax9Fow#_"


    //     if(x !== -1){


    //         console.log("got it");

    //     }
    // },[])

    const urlcodefinder = async (data) => {
        // console.log(data.url);

        var str = data.url
        var x = str.search("/?code=")
        if (x !== -1) {

            // console.log("got it",data.url);
            var y = data.url.split("=")[1].replace("#_", "")
            console.log(y);


        }

    }





    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>

                <View style={style.header} >
                    <View style={style.back} >
                        <Text style={style.headingtext} >Explore</Text>
                    </View>

                    <View style={style.chat} >
                        <View style={{ width: 35, height: 35, backgroundColor: "#f0f2f5", justifyContent: "center", alignItems: "center", borderRadius: 50, right: 15, elevation: 1 }} >
                            <Ionicons color={"black"} size={22} name={"bell"} />
                        </View>
                        <View style={{ width: 35, height: 35, backgroundColor: "#f0f2f5", justifyContent: "center", alignItems: "center", borderRadius: 50, right: 6, elevation: 1 }} >
                            <Ionicons color={"black"} size={22} name={"message-circle"} />
                        </View>
                    </View>
                </View>
                {/* //#878ca0 */}
                <TouchableRipple borderless={true} style={style.textinput} rippleColor={"rgb(0,0,0,0.32)"} onPress={() => { navigation.navigate("Search") }}  >
                    <>
                        <Ionicons name={"search"} size={22} color={"#404852"} style={{ left: 10 }} />
                        <Text style={style.textinputtext} >Search Influencer</Text>
                    </>
                </TouchableRipple>



                <View style={style.container2} >
                    <View>
                        <Text style={style.headingtext2}>Browse {type == "brand" ? "Influencers" : "Brands"}</Text>
                    </View>

                    <View style={{ flexWrap: "wrap", flexDirection: "row", marginTop: 10 }} >
                        <View style={style.catergory1} >
                            <Text style={style.categorytext}>Fashion <Text style={{ fontSize: 18 }} >&</Text></Text>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", alignSelf: "center", left: -19, top: -4 }}>Beauty</Text>
                            <View style={{ alignSelf: "flex-end", backgroundColor: "white", position: "absolute", right: 15, bottom: 15, borderRadius: 50, height: 25, width: 25, justifyContent: "center", alignItems: "center" }} >
                                <Ionicons name={"arrow-right"} color={"black"} size={18} />
                            </View>

                        </View>

                        <View style={style.catergory2} >
                            <Text style={style.categorytext}>Technology &</Text>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", alignSelf: "center", left: -31, top: -4 }}>Gadgets</Text>
                            <View style={{ alignSelf: "flex-end", backgroundColor: "white", position: "absolute", right: 15, bottom: 15, borderRadius: 50, height: 25, width: 25, justifyContent: "center", alignItems: "center" }} >
                                <Ionicons name={"arrow-right"} color={"black"} size={18} />
                            </View>
                        </View>
                        <View style={style.catergory3} >
                            <Text style={style.categorytext}>Beverages &</Text>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", alignSelf: "center", left: -38, top: -4 }}>Food</Text>
                            <View style={{ alignSelf: "flex-end", backgroundColor: "white", position: "absolute", right: 15, bottom: 15, borderRadius: 50, height: 25, width: 25, justifyContent: "center", alignItems: "center" }} >
                                <Ionicons name={"arrow-right"} color={"black"} size={18} />
                            </View>
                        </View>
                        <View style={style.catergory4} >
                            <Text style={style.categorytext}>Fitness &</Text>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", alignSelf: "center", left: -19, top: -4 }}>Health</Text>
                            <View style={{ alignSelf: "flex-end", backgroundColor: "white", position: "absolute", right: 15, bottom: 15, borderRadius: 50, height: 25, width: 25, justifyContent: "center", alignItems: "center" }} >
                                <Ionicons name={"arrow-right"} color={"black"} size={18} />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={async () => { await AsyncStorage.multiRemove(["datauploadeduser", "loggedin", "phonenumber", "uid"]), dispatch({ type: "ADD_LOGGEDIN", payload: false }) }} style={{ backgroundColor: "yellow", width: 100, height: 50 }} >
                        <Text>Log Out</Text>
                    </TouchableOpacity>

                    {type == "influencer" ?
                        <Text>Welcome influencer</Text>
                        :
                        <Text>Welcome Brand</Text>
                    }

                </View>


            </SafeAreaView>

            {/* <Modal visible={true} onDismiss={()=>{CookieManager.clearAll(true)}} >
                <View style={{ flex: 1 }}>
                
                <WebView
                    style={{height:150,width:"100%"}}
                        source={{ uri: "https://www.instagram.com/oauth/authorize?client_id=441868563443736&redirect_uri=https://www.google.com/&scope=user_profile,user_media&response_type=code" }}
                        onNavigationStateChange={(data)=>urlcodefinder(data)}
                    />

                </View>
            </Modal> */}

        </>

    )


}


const style = StyleSheet.create({
    container: {
        height: HEIGHT,
        backgroundColor: "white",
    },
    header: {
        height: 50,
        width: WiDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
    },
    back: {
        height: "100%",
        width: WiDTH / 5,
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        height: "100%",
        width: WiDTH / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    chat: {
        height: "100%",
        width: WiDTH / 3.8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    headingtext: {
        color: "#404852",
        fontSize: 22,
        fontWeight: "bold",
        left: 20

    },

    text: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold"

    },
    textinput: {
        width: "90%",
        height: 45,
        elevation: 2,
        backgroundColor: "white",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    textinputtext: {
        color: "#878ca0",
        left: 18,
        fontSize: 15
    },
    container2: {
        width: "100%",
        height: 400,
        backgroundColor: "white",
        marginTop: 20,
    },
    headingtext2: {
        color: "#404852",
        fontSize: 20,
        fontWeight: "bold",
        left: 20

    },
    catergory1: {
        width: WiDTH / 2.3,
        height: WiDTH / 3.5,
        backgroundColor: "#1de28d",
        marginLeft: 20,
        marginBottom: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    catergory2: {
        width: WiDTH / 2.3,
        height: WiDTH / 3.5,
        backgroundColor: "#1e87fd",
        marginBottom: 15,
        marginLeft: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    catergory3: {
        width: WiDTH / 2.3,
        height: WiDTH / 3.5,
        backgroundColor: "#cb67e4",
        marginLeft: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    catergory4: {
        width: WiDTH / 2.3,
        height: WiDTH / 3.5,
        backgroundColor: "#fe6b6f",
        marginLeft: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"

    },
    categorytext: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },


})


export default Home;
