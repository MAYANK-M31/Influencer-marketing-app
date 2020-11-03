
import React, { useEffect, useState, useContext } from 'react';
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
    AsyncStorage, ToastAndroid, Modal,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { MyContext } from './AppStartStack';


const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const OTP = ({ navigation, route }) => {

    const [confirm, setConfirm] = useState(route.params.data);
    const [code, setCode] = useState('');
    const [loading, setloading] = useState(false)
    const { dispatch } = useContext(MyContext)
    const [loading2, setloading2] = useState(false)
    const [isExistingInfluencer, setisExistingInfluencer] = useState(null)
    const [isExistingBrand, setisExistingBrand] = useState(null)


    const existinguser = async () => {
        setloading2(true)
        const { currentUser } = auth()
        const uid = { currentUser }.currentUser.uid
        // alert(uid)
        await AsyncStorage.setItem("uid", uid)


        const ref = await firestore().collection("influencer")
        const ref2 = await firestore().collection("brandaccount")




        //     ref.where("uid", "==", uid).get()
        //         .then(function (querySnapshot) {
        //             if (querySnapshot.empty) {
        //                 // alert("no")
        //                 dispatch({ type: "ADD_LOGGEDIN", payload: true })
        //                 dispatch({ type: "ADD_UPLOADEDUSER", payload: false })
        //                 setloading2(true)
        //             } else {
        //                 querySnapshot.forEach(async function (doc) {
        //                     dispatch({ type: "ADD_LOGGEDIN", payload: true })
        //                     dispatch({ type: "ADD_UPLOADEDUSER", payload: true })
        //                     // console.log(doc.data().name);
        //                     ToastAndroid.show("Welcome Back " + doc.data().name, ToastAndroid.SHORT)
        //                     await AsyncStorage.setItem("uid", uid)
        //                     await AsyncStorage.setItem("datauploadeduser", "true")
        //                     // navigation.navigate("Tabbar")
        //                     setloading2(true)

        //                 });
        //             }


        //         })
        //         .catch(async function (error) {
        //             // console.log("Error getting documents: ", error);
        //             await AsyncStorage.setItem("loggedin", "false")
        //             dispatch({ type: "ADD_LOGGEDIN", payload: false })
        //             setloading2(false)
        //         });

        // }

        ref.where("uid", "==", uid).get()
            .then(function (querySnapshot) {

                if (querySnapshot.empty) {
                    // alert("influecer no")
                    setisExistingInfluencer(false)
                    // dispatch({ type: "ADD_LOGGEDIN", payload: true })
                    // dispatch({ type: "ADD_UPLOADEDUSER", payload: false })
                    // setloading2(true)
                } else {
                    // alert("influecer yes")
                    setisExistingInfluencer(true)
                }

                setloading2(false)
            })
            .catch(async function (error) {
                console.log("Error getting documents: ", error);
                await AsyncStorage.setItem("loggedin", "false")
                dispatch({ type: "ADD_LOGGEDIN", payload: false })
                setloading2(false)
            });

        ref2.where("uid", "==", uid).get()
            .then(function (querySnapshot) {

                if (querySnapshot.empty) {
                    // alert("brand no")

                    setisExistingBrand(false)
                    // dispatch({ type: "ADD_LOGGEDIN", payload: true })
                    // dispatch({ type: "ADD_UPLOADEDUSER", payload: false })
                    // setloading2(true)
                } else {
                    // alert("brand yes")
                    setisExistingBrand(true)
                }

                setloading2(false)
            })
            .catch(async function (error) {
                console.log("Error getting documents: ", error);
                await AsyncStorage.setItem("loggedin", "false")
                dispatch({ type: "ADD_LOGGEDIN", payload: false })
                setloading2(false)
            });


      










    }


    

    try {
        if (isExistingBrand == false && isExistingInfluencer == false) {
            // alert("nothing")
            console.log(isExistingBrand, isExistingInfluencer);
        }else if(isExistingBrand == true || isExistingInfluencer == true){
            console.log("welcome");
            
        }
        // console.log(isExistingBrand, isExistingInfluencer);
    } catch (e) {
        console.log(e);
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

            <Modal visible={loading2}   >
                <View style={{ width: WiDTH, height: HEIGHT, backgroundColor: "white", justifyContent: "center", alignItems: "center" }} >
                    <ActivityIndicator size={50} color={"#007bff"} />
                    <Text style={{ fontSize: 13, color: "#414d57", marginTop: 5, marginLeft: 5 }}>Loading...</Text>
                </View>
            </Modal>
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
