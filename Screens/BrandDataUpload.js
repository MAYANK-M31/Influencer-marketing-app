
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


const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BrandDataUpload = ({ navigation, route }) => {

    const [text, settext] = useState("Creating Your Account")





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
                        createdAt:(new Date()).toString()
                    }).then(() => {
                        ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT)
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
                        createdAt:(new Date()).toString()
                    }).then(() => {
                        settext("Posting Your Campaign")
                        ToastAndroid.show("Signed in successfully", ToastAndroid.SHORT)
                        ref2.add({
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
                            createdAt:(new Date()).toString()
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
        func()
    }, [])


    const { dispatch } = useContext(MyContext)

    const useridfunc = async () => {
        const { currentUser } = auth()
        const uid = { currentUser }.currentUser.uid
        const phonenumber = { currentUser }.currentUser.phoneNumber
        // await AsyncStorage.setItem("uid", uid)
        await AsyncStorage.setItem("phonenumber", phonenumber)
        // console.log({currentUser}.currentUser);

    }
    useridfunc()

    const logout = async () => {

        dispatch({ type: "ADD_LOGGEDIN", payload: false })
        dispatch({ type: "ADD_UPLOADEDUSER", payload: false })
        await AsyncStorage.clear()
    }


    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={{ top: 100, justifyContent: "center", alignItems: "center" }} >
                    <Image style={{ height: 250, width: 250, borderRadius: 250, zIndex: 1 }} source={require("../Icons/illustartion1.jpg")} />
                    <ActivityIndicator color={"#11ece5"} size={260} style={{ top: -255 }} />
                </View>

                <Text style={{ alignSelf: "center", fontSize: 28, fontWeight: "bold", color: "#404852",textTransform:"capitalize" }} >{text}</Text>

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
