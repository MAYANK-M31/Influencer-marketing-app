
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

const BrandCampUpload = ({ navigation, route }) => {

    const [text, settext] = useState("Posting Your Campaign")

    const {  dispatch } = useContext(MyContext)



    useEffect(() => {
        const func = async () => {

            const uid = await AsyncStorage.getItem("uid")
            const ref = await firestore().collection("brandpost")

            try {
                settext("Posting Your Campaign")
                ToastAndroid.show("Campaign Posted Successfully", ToastAndroid.SHORT)
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
                    campaignStartDate: route.params.campaignStartDate,
                    campaignEndDate: route.params.campaignEndDate,
                    website: route.params.website,
                    applink: route.params.applink,
                    createdAt: (new Date()).toString()
                }
                ref.add(datamodal).then(()=>{
                    dispatch({ type: "ADD_CAMPAIGNPOSTS", payload: datamodal })
                })





            } catch (error) {
                console.log(error);
                ToastAndroid.show("Failed to post campaign try again", ToastAndroid.SHORT)
                settext("Try Again")
                navigation.goBack()

            }
        }
        func()
    }, [])






    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={{ top: 100, justifyContent: "center", alignItems: "center" }} >
                    <Image style={{ height: 250, width: 250, borderRadius: 250, zIndex: 1 }} source={require("../Icons/illustartion1.jpg")} />
                    <ActivityIndicator color={"#11ece5"} size={260} style={{ top: -255 }} />
                </View>

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
