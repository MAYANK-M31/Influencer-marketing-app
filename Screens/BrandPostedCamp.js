
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
    Image, ToastAndroid, ActivityIndicator, Switch
} from 'react-native';
import Ionicons from "react-native-vector-icons/Feather"





const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height






const BrandPostedCamp = ({ navigation, route }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "25%", paddingLeft: 15 }} >
                        <Ionicons color={"black"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>
                    <View style={{ width: "50%", alignSelf: "center" }}>
                        <Text style={{ alignSelf: "center", fontSize: 18, alignSelf: "center", fontWeight: "bold", color: "#404852" }} >My Campaigns</Text>
                    </View>

                    <View style={{ width: "25%", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { skip() }} style={{ height: 30, width: 50, borderRadius: 50, backgroundColor: "#1e87fd", justifyContent: "center", alignItems: "center", right: -5 }}>
                            <Text style={{ color: "white", fontWeight: "bold", alignSelf: "center" }} >Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }} >

                    <View style={style.card} >
                        <View style={style.insidecard} >
                            <View style={style.cardleft} >
                                <View style={{ borderRadius: 120 / 2, height: 100, width: 100, overflow: "hidden", elevation: 5, backgroundColor: "#cffcfa" }}>
                                    <Image style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6" }} source={{ uri: "https://media-exp1.licdn.com/dms/image/C560BAQGgarC7a_EY3g/company-logo_200_200/0?e=2159024400&v=beta&t=-EXDJkxAruj-KdC-iQeRTtdn1M4TdxqL_TIDi4-plK8" }} />
                                </View>
                            </View>
                            <View style={style.cardright} >
                                <View style={{ height: "100%" }} >
                                    <View style={{ width: "100%", flexDirection: "row",justifyContent:"space-between" }} >
                                        <View>
                                            <Text style={style.name} >oyo hotels</Text>
                                            <Text style={style.category} >hospitality</Text>
                                        </View>
                                        <Switch
                                            trackColor={{ false: "#f0f2f5", true: "#2989ff" }}
                                            thumbColor={isEnabled ? "white" : "white"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                            style={{position:"absolute",right:0}}
                                            
                                            
                                        />
                                    </View>



                                    <View style={{ width: "100%", height: 20, flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <Image style={{ width: 20, height: 20 }} source={require("../Icons/youtube.png")} />
                                        <Text style={{ fontSize: 14, marginLeft: 20, color: "#878ca0", left: -10, fontWeight: "bold" }} ><Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }} >100K-200K </Text>Subs  |</Text>
                                        <View style={{ width: 60, height: 30, flexDirection: "row", justifyContent: "space-around", left: -5, alignItems: "center" }}>
                                            <Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }}>1m</Text>
                                            <Ionicons name={"eye"} size={20} color={"gray"} />
                                        </View>
                                    </View>

                                    <View style={{ width: "100%", height: 20, flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                        <Image style={{ width: 20, height: 20 }} source={require("../Icons/instagram.png")} />
                                        <Text style={{ fontSize: 14, marginLeft: 20, color: "#878ca0", left: -10, fontWeight: "bold" }} ><Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }} >10K-50K </Text>Followers</Text>
                                    </View>

                                    <View style={{ width: "100%", height: 30, flexDirection: "row", alignItems: "center", marginTop: 3, position: "absolute", bottom: 2 }}>
                                        <Text style={{ fontSize: 14, color: "#878ca0", fontWeight: "bold" }} >24th Nov 2020 - 26th Nov 2020</Text>
                                    </View>

                                </View>

                            </View>
                        </View>

                        <View style={style.buttondiv} >
                            <View style={style.button1} >
                                <Text style={style.button1text} >Save for Review</Text>
                            </View>
                            <View style={style.button2} >
                                <Text style={style.button2text} >Contact</Text>
                            </View>

                        </View>

                    </View>



                </ScrollView>

                <TouchableOpacity style={{ height: 52, width: 52, borderRadius: 100, elevation: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1e87fd", right: 20, bottom: 20, position: "absolute" }} >
                    <Ionicons name={"plus"} color={"white"} size={30} />
                </TouchableOpacity>

            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",


    },
    header: {
        flexDirection: "row",
        width: WiDTH,
        height: 50,
        alignItems: "center",
        borderBottomColor: "#f0f2f5",
        borderBottomWidth: 0.2
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
    },
    card: {
        width: WiDTH,
        height: WiDTH / 1.8
    },
    insidecard: {
        width: WiDTH,
        height: "60%",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 0,
    },
    cardleft: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    cardright: {
        width: "70%",
        paddingLeft: 15,
        height: "100%",

    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#202946",
        textTransform: "capitalize"

    },
    category: {
        fontSize: 13,
        fontWeight: "100",
        color: "#878ca0",
        textTransform: "capitalize"
    },
    buttondiv: {
        width: "100%",
        height: "40%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    button1: {
        width: WiDTH / 2.5,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#de4229",
        borderWidth: 1.5,
        marginLeft: 10
    },
    button2: {
        width: WiDTH / 2.5,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#409cff",
        borderWidth: 1.5,
        marginRight: 10
    },
    button1text: {
        fontSize: 16,
        color: "#de4229",
        fontWeight: 'bold'
    },
    button2text: {
        fontSize: 16,
        color: "#409cff",
        fontWeight: 'bold'
    }



})


export default BrandPostedCamp;
