
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

                    {experiences.length > 0 ?
                        <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Experiences</Text>

                            {experiences.map((item, index) =>
                                <View >
                                    {index == 0 ?
                                        null
                                        :
                                        <View style={{ width: "95%", height: 1, backgroundColor: "white", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>
                                    }

                                    <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate("EditExperience", { data: item }) }} style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >
                                        <View style={{ height: "100%", width: 40, paddingTop: 5 }} >
                                            <View style={{ height: 40, width: 40, backgroundColor: "#f0f2f5", borderRadius: 2, justifyContent: "center", alignItems: "center", overflow: 'hidden' }} >
                                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.url }} />
                                            </View>
                                        </View>
                                        <View style={{ width: "100%" }}>
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }} >
                                                <View style={{ width: "75%" }}>
                                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.companyname}</Text>
                                                </View>
                                                <View style={{ width: "25%", alignItems: "flex-end", justifyContent: "flex-start" }}>
                                                    <Ionicons size={18} color={"#007bff"} name={"edit-2"} />
                                                </View>
                                            </View>

                                            <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{item.description}</Text>


                                        </View>

                                    </ TouchableOpacity>


                                </View>
                            )}

                            {/* Add More Experience */}

                            <View>
                                <View style={{ width: "95%", height: 1, backgroundColor: "white", marginTop: 15, marginBottom: 10, alignSelf: "center" }}></View>

                                <TouchableOpacity onPress={() => { navigation.navigate("AddExperience") }} style={{ width: "102%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", alignItems: "center", paddingHorizontal: 10 }} >
                                    <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                                        <Ionicons name={"plus"} size={25} color={"#007bff"} />
                                    </View>
                                    <View style={{ width: "85%", marginTop: 5 }} >
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add more about your experiences</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>




                        </View>
                        :
                        <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                                <View style={{ flexDirection: "row" }} >
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Experiences</Text>
                                    <Image style={{ height: 22, width: 22, marginLeft: 5 }} source={require("../Icons/briefcase.png")} />
                                </View>

                                <TouchableOpacity onPress={() => { navigation.navigate("AddExperience") }}>
                                    <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Add</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => { navigation.navigate("AddExperience") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                                    <Ionicons name={"plus"} size={25} color={"#007bff"} />
                                </View>
                                <View style={{ width: "85%", marginTop: 5 }} >
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add about your achievements</Text>
                                </View>
                            </TouchableOpacity>


                        </View>
                    }





                    {/*----------------- Achievemnts Column------------------- */}

                    {achievements.length > 0 ?


                        <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 15 }} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 15 }} >Achievements</Text>

                            {achievements.map((items, index) =>
                                <View>
                                    {index == 0 ?
                                        null
                                        :
                                        <View style={{ width: "95%", height: 1, backgroundColor: "white", marginTop: 10, marginBottom: 10, alignSelf: "center" }}></View>
                                    }
                                    <TouchableOpacity onPress={() => { navigation.navigate("EditAchievements", { data: items }) }} style={{ width: "90%", flexDirection: "row", alignItems: "center" }} >

                                        <View style={{ height: "100%", width: 40, paddingTop: 5 }} >
                                            <View style={{ height: 40, width: 40, backgroundColor: "white", borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                                                {items.category == "award" ?
                                                    <Ionicons name={"award"} size={25} />
                                                    : null
                                                }
                                                {items.category == "youtube views" ?
                                                    <Ionicons name={"video"} size={25} />
                                                    : null
                                                }
                                                {items.category == "youtube subscibers" ?
                                                    <Ionicons name={"youtube"} size={25} />
                                                    : null
                                                }
                                                {items.category == "instagram followers" ?
                                                    <Ionicons name={"instagram"} size={25} />
                                                    : null
                                                }
                                                {items.category == "other" ?
                                                    <Ionicons name={"flag"} size={25} />
                                                    :
                                                    null
                                                }

                                            </View>
                                        </View>
                                        <View style={{ width: "100%", justifyContent: "center" }}>
                                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} >
                                                <View style={{ width: items.description == null ? "100%" : items.description.length > 80 ? "75%" : "100%" }}>
                                                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.title}</Text>
                                                </View>
                                            </View>
                                            {items.description ?
                                                <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: "100", color: "#404852", marginLeft: 20, textTransform: "capitalize" }} >{items.description}</Text>
                                                :
                                                null
                                            }


                                        </View>
                                    </TouchableOpacity>



                                </View>

                            )}


                            {/* Add More Achievements */}
                            <View>
                                <View style={{ width: "95%", height: 1, backgroundColor: "white", marginTop: 15, marginBottom: 10, alignSelf: "center" }}></View>

                                <TouchableOpacity onPress={() => { navigation.navigate("AddAchievements") }} style={{ width: "102%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", alignItems: "center", paddingHorizontal: 10 }} >
                                    <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                                        <Ionicons name={"plus"} size={25} color={"#007bff"} />
                                    </View>
                                    <View style={{ width: "85%", marginTop: 5 }} >
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add more about your achievements</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>




                        </View>
                        :
                        <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                                <View style={{ flexDirection: "row" }} >
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Achievements</Text>
                                    <Image style={{ height: 22, width: 22, marginLeft: 5 }} source={require("../Icons/trophy.png")} />
                                </View>
                                <TouchableOpacity onPress={() => { navigation.navigate("AddAchievements") }}>
                                    <Text style={{ fontSize: 15, fontWeight: "normal", color: "#007bff", alignSelf: "flex-start", marginBottom: 5 }} >Add</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => { navigation.navigate("AddAchievements") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                                    <Ionicons name={"plus"} size={25} color={"#007bff"} />
                                </View>
                                <View style={{ width: "85%", marginTop: 5 }} >
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Add about your achievements</Text>
                                </View>
                            </TouchableOpacity>


                        </View>
                    }

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
