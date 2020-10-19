
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Button, BackHandler, Alert, AsyncStorage
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import auth from '@react-native-firebase/auth';
import axios from "axios"
import firestore from "@react-native-firebase/firestore"


const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Home = ({ navigation }) => {



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




    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>

                <View style={style.header} >
                    <Text style={style.headingtext} >Explore</Text>
                </View>
                {/* //#878ca0 */}
                <TouchableOpacity onPress={() => { navigation.navigate("Search") }} style={style.textinput} >
                    <Ionicons name={"search"} size={22} color={"#404852"} style={{ left: 10 }} />
                    <Text style={style.textinputtext} >Search Influencer</Text>
                </TouchableOpacity>


                <View style={style.container2} >
                    <View>
                        <Text style={style.headingtext2}>Browse</Text>
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
                    
                    <TouchableOpacity onPress={async () => {await AsyncStorage.multiRemove(["DocId", "datauploadeduser", "editage", "loggedin", "phonenumber", "type", "uid"]),BackHandler.exitApp()}} style={{ backgroundColor: "yellow", width: 100, height: 50 }} >
                        <Text>Log Out</Text>
                    </TouchableOpacity>

                </View>




            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        height: HEIGHT,
        backgroundColor: "white",
    },
    header: {
        top: 0,
        height: 45,
        width: "100%",
        justifyContent: "center",
        backgroundColor: "white"
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
