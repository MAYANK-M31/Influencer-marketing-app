
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

const BrandCategoryPage = ({ navigation }) => {

    const [category, setcategory] = useState(null)
    const [disable, setdisable] = useState(true)
    const [padding, setpadding] = useState(20)
    const [fontsize,setfontsize] = useState(40)
    const [height,setheight] = useState(45)
    const [categoryfont,setcategoryfont] = useState(18)

    useEffect(() => {
        if (WiDTH < 365) {
            setpadding(10)
            setfontsize(30)
            setheight(35)
            setcategoryfont(15)
        } else {
            setpadding(20)
            setfontsize(40)
            setheight(45)
            setcategoryfont(18)
        }

    }, [])

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
                    <Text style={{  fontSize: fontsize, fontWeight: "bold", color: "#404852" }} >Please choose your</Text>
                    <Text style={{  fontSize: fontsize-5, fontWeight: "bold", color: "#404852",top:-10 }} >Brand Category</Text>
                </View>

                <View style={{ flexWrap: "wrap",height:HEIGHT*0.60, width: "100%", flexDirection: "row", paddingHorizontal:padding,alignItems:"center" }} >

                    <TouchableOpacity activeOpacity={1} onPress={() => select("entertainment")} style={{
                        height: height, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                        backgroundColor: category == "entertainment" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "entertainment" ? "white" : "#1e87fd" }} >Entertainment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("shopping")} style={{
                        height: height, width: "42%"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                        backgroundColor: category == "shopping" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "shopping" ? "white" : "#1e87fd" }} >Shopping</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("finance")} style={{
                        height: height, width: "42%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                        backgroundColor: category == "finance" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "finance" ? "white" : "#1e87fd" }} >Finance</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("food")} style={{
                        height: height, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "food" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "food" ? "white" : "#1e87fd" }} >Food & Beverages</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("beauty")} style={{
                        height: height, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "beauty" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "beauty" ? "white" : "#1e87fd" }} >Beauty & Fashion</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("fitness")} style={{
                        height: height, width: "42%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "fitness" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "fitness" ? "white" : "#1e87fd" }} >Fitness</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("apps")} style={{
                        height: height, width: "42%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "apps" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "apps" ? "white" : "#1e87fd" }} >Apps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("hospitality")} style={{
                        height: height, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "hospitality" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "hospitality" ? "white" : "#1e87fd" }} >Hospitality</Text>
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={1} onPress={() => select("education")} style={{
                        height: height, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "education" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "education" ? "white" : "#1e87fd" }} >Education</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("business")} style={{
                        height: height, width: "42%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "business" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "business" ? "white" : "#1e87fd" }} >Business</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("travel")} style={{
                        height: height, width: "42%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "travel" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "travel" ? "white" : "#1e87fd" }} >Travel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("technology")} style={{
                        height: height, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 52, margin: 5,
                        backgroundColor: category == "technology" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "technology" ? "white" : "#1e87fd" }} >Technology</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("consumer goods")} style={{
                        height: height, width: "52%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                        backgroundColor: category == "consumer goods" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "consumer goods" ? "white" : "#1e87fd" }} >Consumer Goods</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("service")} style={{
                        height: height, width: "42%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 45, margin: 5,
                        backgroundColor: category == "service" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "service" ? "white" : "#1e87fd" }} >Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => select("other")} style={{
                        height: height, width: "97%", alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 5,
                        backgroundColor: category == "other" ? "#1e87fd" : "white"
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: category == "other" ? "white" : "#1e87fd" }} >Other</Text>
                    </TouchableOpacity>


                </View>



                <TouchableOpacity activeOpacity={1} disabled={disable} onPress={() => { navigation.navigate("BrandDetailPage", { category: category }) }} style={{
                    height: 55, width: "85%", backgroundColor: disable ? "#1e87fd44" : "#1e87fd"
                    , alignItems: "center", flexDirection: "row", justifyContent: "center",
                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", bottom: 50
                }} >
                    <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                        <Ionicons name={"arrow-right"} color={"black"} size={25} />
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: categoryfont, fontWeight: "bold", color: "white" }} >Next</Text>
                </TouchableOpacity>




            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        width: "100%"
    },
    header: {
        width:WiDTH,
        height:40,
        justifyContent:"center",
        paddingLeft: 15,
    
    },
    heading: {
        width:WiDTH,
        paddingLeft: 15,
    }



})


export default BrandCategoryPage;
