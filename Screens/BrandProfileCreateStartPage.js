
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
    Image
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import auth from "@react-native-firebase/auth"
import { MyContext } from './AppStartStack';


const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BrandProfileCreateStartPage = ({ navigation }) => {

    const func =async ()=>{
        console.log(await AsyncStorage.getItem("datauploadeduser"));
        
    }
    func()

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



                <View style={style.heading} >
                    <Text style={{ alignSelf: "center", fontSize: 42, fontWeight: "bold", color: "#404852" }} >Let's create your</Text>
                    <Text style={{ alignSelf: "flex-start", fontSize: 42, fontWeight: "bold", color: "#404852" }} >Profile</Text>
                </View>

                <Image style={{ height: 250, width: 250, borderRadius: 250 }} source={require("../Icons/illustartion1.jpg")} />
                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "#404852", marginTop: 10 }} >Hi I am Jojo !</Text>
                <TouchableOpacity onPress={() => logout()} style={{ position: "absolute", bottom: HEIGHT*0.20,flexDirection:"row",alignItems:"center" }} >
                    <Text style={{ alignSelf: "center", fontSize: 13, fontWeight: "100", color: "#409cff" }} >Log in with another number</Text>
                    <Ionicons style={{top:1,left:2}}  color={"#409cff"}  size={20} name={"arrow-right"} />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate("BrandCategoryPage")} style={{
                    height: 55, width: "85%", backgroundColor: "#1e87fd"
                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", bottom: 50
                }} >
                    <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                        <Ionicons name={"arrow-right"} color={"black"} size={25} />
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Next</Text>
                </TouchableOpacity>




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


export default BrandProfileCreateStartPage
;
