
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
    Slider,
    ToastAndroid
} from 'react-native';
import { TextInput, DefaultTheme } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Feather"
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BrandPostCampaignPage = ({ navigation, route }) => {


    const [value1, setvalue1] = useState(20)
    const [value2, setvalue2] = useState(50)
    const [title, settitle] = useState(null)
    const [description, setdescription] = useState(null)
    const [paymode, setpaymode] = useState(null)
    const [platform, setplatform] = useState(null)
    const [youtubesubs, setyoutubesubs] = useState(null)
    const [instafollowers, setinstafollowers] = useState(null)
    const [disable, setdisable] = useState(true)

    const select = async (item) => {
        setpaymode(item)
        setdisable(false)
    }

    const select2 = async (item) => {
        setplatform(item)
        setdisable(false)
    }

    const select3 = async (item) => {
        setyoutubesubs(item)
        setdisable(false)
    }

    const select4 = async (item) => {
        setinstafollowers(item)
        setdisable(false)
    }



    const submit = () => {
        if (title == null || description == null) {
            ToastAndroid.show("Please Fill Campaign Title", ToastAndroid.SHORT)
        }
        

    }


    const theme = {
        ...DefaultTheme,
        roundness: 8,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1e87fd',
            accent: 'white',
            background: "white",
            underlineColor: "transparent"

        },
    };



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>


                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"black"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("BrandPostCampaignPage") }} style={{ height: 30, width: 60, borderRadius: 50, backgroundColor: "#1e87fd", justifyContent: "center", alignItems: "center", position: "absolute", right: 10 }}>
                        <Text style={{ color: "white", fontWeight: "100", alignSelf: "center" }} >Later</Text>
                    </TouchableOpacity>

                </View>

                <ScrollView style={{ width: "100%", height: HEIGHT }} contentContainerStyle={{ paddingBottom: 50 }} >
                    <View style={style.heading} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 35, fontWeight: "bold", color: "#404852" }} >Post about your brand</Text>
                        <Text style={{ alignSelf: "flex-start", fontSize: 35, fontWeight: "bold", color: "#404852", top: -8 }} >Campaign</Text>
                    </View>


                    <TextInput
                        value={description}
                        onChangeText={(text) => { setdescription(text) }}
                        style={{ height: 50, width: "90%", backgroundColor: "white", alignSelf: "center", fontSize: 18, marginTop: 20 }}
                        mode={"outlined"}
                        underlineColor={"grey"}
                        theme={theme}
                        label="Campign Title"


                    />

                    <TextInput
                        value={title}
                        onChangeText={(text) => { settitle(text) }}
                        style={{ maxHeight: 300, width: "90%", backgroundColor: "white", alignSelf: "center", fontSize: 18, marginTop: 20 }}
                        mode={"outlined"}
                        underlineColor={"grey"}
                        theme={theme}
                        multiline={true}
                        label="Campign Description"


                    />

                    {/* <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2",marginVertical:30,alignSelf:"center" }} >

                    </View> */}



                    <View style={{
                        flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 30

                    }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Select Campaign Platform</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => { select2("instagram"), setinstafollowers(null) }} style={{
                            height: 55, width: "40%", backgroundColor: platform == "instagram" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: platform == "instagram" ? "white" : "#1e87fd" }} >Instagram</Text>
                            {platform == "instagram" ?
                                <Ionicons style={{ right: 6, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }

                        </TouchableOpacity>

                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "#1e87fd" }} >OR</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => { select2("youtube"), setyoutubesubs(null) }} style={{
                            height: 55, width: "40%", backgroundColor: platform == "youtube" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: platform == "youtube" ? "white" : "#1e87fd" }} >YouTube</Text>
                            {platform == "youtube" ?
                                <Ionicons style={{ right: 8, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            select2("both"), setyoutubesubs(null), setinstafollowers(null
                            )
                        }} style={{
                            height: 55, width: "92%", backgroundColor: "#1e87fd"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Both</Text>
                            {platform == "both" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>

                    </View>


                    {/* _____________________YOUTUBE SUBSCRIBER RANGE SELECTOR ____________________*/}

                    {platform == "youtube" ?
                        <View>
                            <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Subscriber Range</Text>
                            <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                <TouchableOpacity activeOpacity={1} onPress={() => select3("1K-10K")} style={{
                                    height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "1K-10K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={1} onPress={() => select3("10K-50K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "10K-50K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("shopping")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "shopping" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "shopping" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("50K-100K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "50K-100K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "50K-100K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("500K-1M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "500K-1M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("1M-5M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "1M-5M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("5M-10M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "5M-10M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("10M-20M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "10M-20M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select3("20M+")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: youtubesubs == "20M+" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        :
                        null
                    }


                    {/* ______________________INSTAGRAM FOLLOWERS____________________ */}

                    {platform == "instagram" ?
                        <View>
                            <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Followers Range</Text>
                            <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                <TouchableOpacity activeOpacity={1} onPress={() => select4("1K-10K")} style={{
                                    height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "1K-10K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={1} onPress={() => select4("10K-50K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "10K-50K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("shopping")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "shopping" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "shopping" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("50K-100K")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "50K-100K" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "50K-100K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("500K-1M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "500K-1M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("1M-5M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "1M-5M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("5M-10M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "5M-10M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("10M-20M")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "10M-20M" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => select4("20M+")} style={{
                                    height: 45, width: "30%"
                                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                    backgroundColor: instafollowers == "20M+" ? "#1e87fd" : "white"
                                }} >
                                    <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        :
                        null
                    }

                    {/* _______________________________BOTH PLATFORM SUBSCRIBER AND FOLLOWERS SELECTOR_____________________________ */}

                    {platform == "both" ?
                        <View>
                            <View>
                                <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Followers Range</Text>
                                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("1K-10K")} style={{
                                        height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "1K-10K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("10K-50K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "10K-50K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("shopping")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "shopping" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "shopping" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("50K-100K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "50K-100K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "50K-100K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("500K-1M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "500K-1M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("1M-5M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "1M-5M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("5M-10M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "5M-10M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("10M-20M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "10M-20M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select4("20M+")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: instafollowers == "20M+" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: instafollowers == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>


                            <View>
                                <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852", marginTop: 20, left: 20 }} >Subscriber Range</Text>
                                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20, alignItems: "center" }} >

                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("1K-10K")} style={{
                                        height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "1K-10K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1K-10K" ? "white" : "#1e87fd" }} >1K-10K</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("10K-50K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "10K-50K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10K-50K" ? "white" : "#1e87fd" }} >10K-50K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("shopping")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "shopping" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "shopping" ? "white" : "#1e87fd" }} >50K-100K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("50K-100K")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "50K-100K" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "50K-100K" ? "white" : "#1e87fd" }} >100K-500K</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("500K-1M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "500K-1M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "500K-1M" ? "white" : "#1e87fd" }} >500K-1M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("1M-5M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "1M-5M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "1M-5M" ? "white" : "#1e87fd" }} >1M-5M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("5M-10M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "5M-10M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "5M-10M" ? "white" : "#1e87fd" }} >5M-10M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("10M-20M")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "10M-20M" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "10M-20M" ? "white" : "#1e87fd" }} >10M-20M</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={1} onPress={() => select3("20M+")} style={{
                                        height: 45, width: "30%"
                                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                                        backgroundColor: youtubesubs == "20M+" ? "#1e87fd" : "white"
                                    }} >
                                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: youtubesubs == "20M+" ? "white" : "#1e87fd" }} >20M+</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        :
                        null
                    }




                    <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 30 }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Select Paymode</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => select("barter")} style={{
                            height: 55, width: "40%", backgroundColor: paymode == "barter" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: paymode == "barter" ? "white" : "#1e87fd" }} >Barter</Text>
                            {paymode == "barter" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }

                        </TouchableOpacity>

                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "#1e87fd" }} >OR</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => select("pay")} style={{
                            height: 55, width: "40%", backgroundColor: paymode == "pay" ? "#1e87fd" : "white"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: paymode == "pay" ? "white" : "#1e87fd" }} >Pay</Text>
                            {paymode == "pay" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>



                        <TouchableOpacity activeOpacity={1} onPress={() => select("both")} style={{
                            height: 55, width: "92%", backgroundColor: "#1e87fd"
                            , alignItems: "center", flexDirection: "row", justifyContent: "center", alignSelf: "center",
                            borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        }} >
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Any of both</Text>
                            {paymode == "both" ?
                                <Ionicons style={{ right: 15, position: "absolute" }} name={'check'} color={"white"} size={20} />
                                : null
                            }
                        </TouchableOpacity>

                    </View>



                    <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2", alignSelf: "center", marginVertical: 20 }} >

                    </View>


                    <View style={{ width: "90%", minHeight: 100, alignSelf: "center" }} >
                        <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Budget Range</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <View style={{ height: 60, width: 60, borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 50, top: 25 }} >
                                    <Text style={{ color: "#1e87fd", fontWeight: "bold" }} >{value1}K</Text>
                                </View>
                                <Text style={{ color: "#9e9e9e", fontWeight: "100", top: 30, alignSelf: "center" }} >Min</Text>
                            </View>

                            <View style={{ height: 60, width: "60%", borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 10, top: 25 }} >
                                {/* <Slider thumbTintColor={"#1e87fd"} minimumTrackTintColor={"#1e87fd"} style={{ width: "100%" }} /> */}
                                <MultiSlider
                                    values={[value1, value2]}
                                    onValuesChange={([value1, value2]) => { setvalue1(value1), setvalue2(value2) }}

                                    allowOverlap={false}
                                    sliderLength={WiDTH - 220}
                                    selectedStyle={{ backgroundColor: "#1e87fd" }}
                                    markerStyle={{ backgroundColor: "#1e87fd" }}
                                    min={1}
                                    max={100}
                                    step={1}
                                />
                            </View>


                            <View>
                                <View style={{ height: 60, width: 60, borderColor: "#1e87fd", borderWidth: 1.5, alignItems: "center", justifyContent: "center", borderRadius: 50, top: 25 }} >
                                    <Text style={{ color: "#1e87fd", fontWeight: "bold" }} >{value2}K</Text>
                                </View>
                                <Text style={{ color: "#9e9e9e", fontWeight: "100", top: 30, alignSelf: "center" }} >Max</Text>
                            </View>
                        </View>

                    </View>




                    <TouchableOpacity disabled={disable} onPress={() => { submit() }} style={{
                        height: 55, width: "85%", backgroundColor: disable ? "#1e87fdCC" : "#1e87fd"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, alignSelf: "center", marginTop: 60
                    }} >
                        <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                            <Ionicons name={"arrow-right"} color={"black"} size={25} />
                        </View>
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Finish</Text>
                    </TouchableOpacity>


                    {/* <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", bottom: 140, left: 25 }} >Note : You Can Also Change Your Range Later Too. </Text> */}
                </ScrollView>




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
        height: 50,
        width: "100%",
        justifyContent: "center"

    },
    back: {
        left: 15,
    },
    heading: {
        width: WiDTH,
        justifyContent: "center",
        paddingLeft: 15,

    }



})


export default BrandPostCampaignPage;
