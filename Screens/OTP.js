
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Button,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    AsyncStorage, ToastAndroid,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"


const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const OTP = ({ navigation, route }) => {

    const [confirm, setConfirm] = useState(route.params.data);
    const [code, setCode] = useState('');
    const [loading, setloading] = useState(false)

    const existinguser = async () => {
        const { currentUser } = auth()
        const uid = { currentUser }.currentUser.uid
        // alert(uid)
        await AsyncStorage.setItem("uid", uid)
        

        const ref = await firestore().collection("influencer")
        ref.where("uid", "==", uid).get()
            .then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    // alert("no")
                    
                    navigation.navigate("ProfileCreationStack")
                   
                } else {
                    querySnapshot.forEach(async function (doc) {
                        // console.log(doc.data().name);
                        ToastAndroid.show("Welcome Back " + doc.data().name, ToastAndroid.SHORT)
                        await AsyncStorage.setItem("uid", uid)
                        await AsyncStorage.setItem("datauploadeduser", "true")
                        navigation.navigate("Tabbar")
                    });
                }


            })
            .catch(function (error) {
                // console.log("Error getting documents: ", error);
            });

    }


    async function confirmCode() {
        setloading(true)
        setConfirm(route.params.data)
        try {
            await confirm.confirm(code).then(async () => {
                // console.log(confirm);
                ToastAndroid.show("Signed In", ToastAndroid.SHORT)
                // alert("signed in")
                // navigation.navigate("ProfileCreationStack")
                existinguser()
                setloading(false)
                await AsyncStorage.setItem("loggedin", "true")

            })



        } catch (error) {
            console.log(error);
            ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT)
            // alert("Invalid OTP")
            setloading(false)

        }
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

                <View style={{ backgroundColor: "white", height: HEIGHT / 10, width: "100%", justifyContent: "center", alignItems: "flex-start", paddingLeft: 20 }} >
                    <Text style={{ alignSelf: "flex-start", fontSize: 42, fontWeight: "bold", color: "#404852" }} >ENTER OTP</Text>
                </View>


                {/* <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold",color:"#404852",left:30,top:225,position:"absolute" }} >Enter OTP</Text> */}

                <View style={{ height: 50, width: "85%", flexDirection: "row", alignItems: "center", justifyContent: "center", position: "absolute", top: 150 }}>

                    <View style={{ width: 150, height: "100%", backgroundColor: "#f2f2f2", justifyContent: "center", alignItems: "center", marginRight: 0 }} >
                        <TextInput value={code} onChangeText={text => setCode(text)} autoCompleteType={"off"} keyboardType={"phone-pad"} maxLength={6} style={{ fontSize: 18, fontWeight: "700", height: "100%" }} />
                    </View>

                </View>

                {loading ?
                    <View style={{
                        height: 55, width: "85%", backgroundColor: "#1e87fd"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", bottom: 50
                    }} >
                        <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                            <Ionicons name={"arrow-right"} color={"black"} size={25} />
                        </View>
                        <ActivityIndicator size={20} color={"white"} />
                    </View>

                    :
                    <TouchableOpacity onPress={() => { confirmCode() }} style={{
                        height: 55, width: "85%", backgroundColor: "#1e87fd"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", bottom: 50
                    }} >
                        <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                            <Ionicons name={"arrow-right"} color={"black"} size={25} />
                        </View>
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Finish</Text>
                    </TouchableOpacity>
                }






            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    },
    header: {
        height: 50,
        width: WiDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
    },
    back: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },



})


export default OTP;
