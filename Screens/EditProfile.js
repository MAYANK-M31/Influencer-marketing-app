
import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image,
    AsyncStorage
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import { MyContext } from './AppStartStack';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const EditProfile = ({ navigation, route }) => {






    const { state } = useContext(MyContext)
    const { name, age, city, minrange, maxrange, category, paymode, result, about, achievements, experiences, instaconnected, instaimages, instausername, youtubeconnected } = state




    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={style.chat} >
                        {/* <Ionicons color={"#404852"} size={25} name={"settings"} /> */}
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }} >

                    {/*----------------- Social Media Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15 }} >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Social Media</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditSocialMedia") }} >
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"instagram"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >{instaconnected ? "Instagram Connected" : "Connect To Instagram"}</Text>
                            </View>
                        </View>


                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginBottom: 20, marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"youtube"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >{youtubeconnected ? "YouTube Connected" : "Connect To YouTube"}</Text>
                            </View>
                        </View>
                    </View>

                    {/*----------------- About Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >About</Text>

                            <TouchableOpacity onPress={() => { navigation.navigate("EditAbout") }}>
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>

                        </View>

                        {about ?

                            <View style={{ minHeight: 10, width: "95%", backgroundColor: "white", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                                <Text style={{ fontSize: 14, fontWeight: "100", color: "#404852", textTransform: "capitalize" }}>{about}</Text>
                            </View>
                            :
                            <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                                    <Ionicons name={"plus"} size={25} color={"#007bff"} />
                                </View>
                                <View style={{ width: "85%", marginTop: 5 }} >
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Write something about yourself</Text>
                                </View>
                            </View>



                        }


                    </View>

                    {/*----------------- ExperinceColumn------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Experience</Text>
                            <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"plus"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add about your experience</Text>
                            </View>
                        </View>


                    </View>


                    {/*----------------- Achievemnts Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Achievements</Text>
                            <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"plus"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add your achievements</Text>
                            </View>
                        </View>


                    </View>

                    {/*----------------- Name Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Name</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditName") }}>
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"user"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{name}</Text>
                            </View>
                        </View>

                    </View>

                    {/*----------------- Category Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Category</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditCategory") }}>
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"heart"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{category}</Text>
                            </View>
                        </View>

                    </View>

                    {/*----------------- Location Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Location</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditLocation") }}>
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"map-pin"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >{city}</Text>
                            </View>
                        </View>

                    </View>

                    {/*----------------- PayMode Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Paymode</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditPayMode") }}>
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"credit-card"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{paymode == "both" ? "Pay or Barter" : paymode}</Text>
                            </View>
                        </View>

                    </View>


                    {/*----------------- Budget Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Budget</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditBudget") }}>
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                {/* <Ionicons name={"dollar-sign"} size={25} color={"#007bff"} /> */}
                                <Text style={{ color: "#007bff", fontSize: 25 }}>&#x20B9;</Text>
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5, textTransform: "capitalize" }} >{minrange}K - {maxrange}K </Text>
                            </View>
                        </View>

                    </View>

                    {/*----------------- Age Column------------------- */}

                    <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Age</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("EditAge") }}>
                                <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                            <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff00", alignItems: "center", justifyContent: "center" }} >
                                <Ionicons name={"user"} size={25} color={"#007bff"} />
                            </View>
                            <View style={{ width: "85%", marginTop: 5 }} >
                                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >{age}</Text>
                            </View>
                        </View>

                    </View>





                </ScrollView>

            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    header: {
        height: 50,
        width: WiDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 1
    },
    back: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        height: "100%",
        width: WiDTH / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    chat: {
        height: "100%",
        width: WiDTH / 7,
        justifyContent: "center",
        alignItems: "center"
    },


})


export default EditProfile;
