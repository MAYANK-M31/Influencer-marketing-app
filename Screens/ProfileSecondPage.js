
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
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



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const ProfileSecondPage = ({ navigation }) => {

    const [category, setcategory] = useState(null)
    const [disable, setdisable] = useState(true)

    const select = async (item) => {
        setcategory(item)
        setdisable(false)
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

                <View style={style.heading} >
                    <Text style={{ alignSelf: "center", fontSize: 40, fontWeight: "bold", color: "#404852" }} >Please choose your</Text>
                    <Text style={{ alignSelf: "flex-start", fontSize: 40, fontWeight: "bold", color: "#404852" }} >Category</Text>
                </View>

                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", paddingHorizontal: 20 }} >

                    <TouchableOpacity activeOpacity={1} onPress={() => select("vlogger")} style={{
                        height: 55, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "vlogger" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "vlogger" ? "white" : "#1e87fd" }} >Vlogger</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("tech")} style={{
                        height: 55, width: "38%"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "tech" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "tech" ? "white" : "#1e87fd" }} >Tech</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("comedy")} style={{
                        height: 55, width: "38%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "comedy" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "comedy" ? "white" : "#1e87fd" }} >Comedy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("food")} style={{
                        height: 55, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "food" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "food" ? "white" : "#1e87fd" }} >Food</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("beauty")} style={{
                        height: 55, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "beauty" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "beauty" ? "white" : "#1e87fd" }} >Beauty & Fashion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("fitness")} style={{
                        height: 55, width: "38%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "fitness" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "fitness" ? "white" : "#1e87fd" }} >Fitness</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("music")} style={{
                        height: 55, width: "38%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "music" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "music" ? "white" : "#1e87fd" }} >Music</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("gaming")} style={{
                        height: 55, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "gaming" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "gaming" ? "white" : "#1e87fd" }} >Gaming</Text>
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={1} onPress={() => select("education")} style={{
                        height: 55, width: "50%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "education" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "education" ? "white" : "#1e87fd" }} >Education</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("dance")} style={{
                        height: 55, width: "38%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                        backgroundColor: category == "dance" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: category == "dance" ? "white" : "#1e87fd" }} >Dance</Text>
                    </TouchableOpacity>


                </View>



                <TouchableOpacity activeOpacity={1} disabled={disable} onPress={() => { navigation.navigate("ProfileThirdPage", { category: category }) }} style={{
                    height: 55, width: "85%", backgroundColor: disable ? "#1e87fd44" : "#1e87fd"
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
    header: {
        top: 10,
        left: 15,
        position: "absolute",
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
    }



})


export default ProfileSecondPage;
