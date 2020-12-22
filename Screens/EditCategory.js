
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
    ToastAndroid,
    AsyncStorage,
    TextInput
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import { MyContext } from './AppStartStack';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const EditCategory = ({ navigation, route }) => {

    const {dispatch} = useContext(MyContext)

    const [selectcategory, setselectcategory] = useState(route.params.category)
    const [disable, setdisable] = useState(true)

    const select = async (item) => {
        setselectcategory(item)
        setdisable(false)
        // alert(item)
    }



    const save = () => {
        if (selectcategory == undefined) {
            ToastAndroid.show("Please choose category", ToastAndroid.SHORT)
        } else {

            const func = async () => {

                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)
                ref.update({
                    category: selectcategory.toLowerCase()
                }).then(async () => {
                    ToastAndroid.show("Updated", ToastAndroid.SHORT)
                    navigation.goBack()
                    dispatch({type:"ADD_CATEGORY",payload:selectcategory})
                })

            }
            func()


        }
    }



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView  style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Edit Location</Text>
                    </View>
                    <TouchableOpacity disabled={disable} onPress={() => { save() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 50 }} >

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Location</Text>
                    </View>

                    <View style={{ width: "95%", alignSelf: "center", minHeight: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, paddingHorizontal: 10 }} >
                        <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingVertical: 20 }} >

                            <TouchableOpacity activeOpacity={1} onPress={() => select("vlogger")} style={{
                                height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "vlogger" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "vlogger" ? "white" : "#1e87fd" }} >Vlogger</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("tech")} style={{
                                height: 45, width: "30%"
                                , alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "tech" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "tech" ? "white" : "#1e87fd" }} >Tech</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("comedy")} style={{
                                height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "comedy" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "comedy" ? "white" : "#1e87fd" }} >Comedy</Text>
                            </TouchableOpacity>

                        

                            <TouchableOpacity activeOpacity={1} onPress={() => select("beauty")} style={{
                                height: 45, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "beauty" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "beauty" ? "white" : "#1e87fd" }} >Beauty & Fashion</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("food")} style={{
                                height: 45, width: "43%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "food" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "food" ? "white" : "#1e87fd" }} >Food</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("fitness")} style={{
                                height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "fitness" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "fitness" ? "white" : "#1e87fd" }} >Fitness</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("music")} style={{
                                height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "music" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "music" ? "white" : "#1e87fd" }} >Music</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("gaming")} style={{
                                height: 45, width: "30%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "gaming" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "gaming" ? "white" : "#1e87fd" }} >Gaming</Text>
                            </TouchableOpacity>


                      

                            <TouchableOpacity activeOpacity={1} onPress={() => select("dance")} style={{
                                height: 45, width: "43%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "dance" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "dance" ? "white" : "#1e87fd" }} >Dance</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("education")} style={{
                                height: 45, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "education" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "education" ? "white" : "#1e87fd" }} >Education</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("business")} style={{
                                height: 45, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "business" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "business" ? "white" : "#1e87fd" }} >Business</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} onPress={() => select("motivation")} style={{
                                height: 45, width: "43%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                                borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                                backgroundColor: selectcategory == "motivation" ? "#1e87fd" : "white"
                            }} >
                                <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: selectcategory == "motivation" ? "white" : "#1e87fd" }} >Motivation</Text>
                            </TouchableOpacity>



                        </View>
                    </View>


                </View>

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


export default EditCategory;
