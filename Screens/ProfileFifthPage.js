
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
    Slider
} from 'react-native';
import { TextInput, DefaultTheme } from "react-native-paper"
import Ionicons from "react-native-vector-icons/Feather"
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { color } from 'react-native-reanimated';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const ProfileFifthtPage = ({ navigation, route }) => {


    const [value1, setvalue1] = useState(20)
    const [value2, setvalue2] = useState(50)
    const [paymode, setpaymode] = useState(null)
    const [disable, setdisable] = useState(true)

    const select = async (item) => {
        setpaymode(item)
        setdisable(false)
    }


    const submit = () => {
        navigation.navigate("ProfileSixthPage", {
            name: route.params.name,
            age: route.params.age,
            email: route.params.email,
            city: route.params.city,
            category: route.params.category,
            youtubedata:route.params.youtubedata,
            instadata: route.params.instadata,
            paymode: paymode,
            minrange:value1,
            maxrange:value2
        })
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
                    <Text style={{ alignSelf: "center", fontSize: 38, fontWeight: "bold", color: "#404852" }} >Please select given</Text>
                    <Text style={{ alignSelf: "flex-start", fontSize: 38, fontWeight: "bold", color: "#404852" }} >Options</Text>
                </View>


                <View style={{ flexWrap: "wrap", width: "100%", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, position: "absolute", top: 200 }} >
                    <TouchableOpacity activeOpacity={1} onPress={() => select("barter")} style={{
                        height: 55, width: "40%", backgroundColor: paymode == "barter" ? "#1e87fd" : "white"
                        , alignItems: "center", flexDirection: "row", justifyContent: "center",
                        borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, margin: 10,
                    }} >
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: paymode == "barter" ? "white" : "#1e87fd" }} >Barter</Text>
                        {paymode == "barter" ?
                            <Ionicons style={{ position: "absolute", right: 15 }} name={'check'} color={"white"} size={20} />
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
                            <Ionicons style={{ position: "absolute", right: 15 }} name={'check'} color={"white"} size={20} />
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
                            <Ionicons style={{ position: "absolute", right: 15 }} name={'check'} color={"white"} size={20} />
                            : null
                        }
                    </TouchableOpacity>

                </View>

                <View style={{ height: 2, width: "60%", backgroundColor: "#f2f2f2" }} >

                </View>


                <View style={{ width: "90%", position: "absolute", top: 400 }} >
                    <Text style={{ alignSelf: "flex-start", fontSize: 28, fontWeight: "bold", color: "#404852" }} >Expecting Range</Text>
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
                                values={[value1,value2]}
                                onValuesChange={([value1,value2])=>{setvalue1(value1),setvalue2(value2)}}
                              
                                allowOverlap={false}
                               sliderLength={WiDTH-220}
                               selectedStyle={{backgroundColor:"#1e87fd"}}
                               markerStyle={{backgroundColor:"#1e87fd"}}
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
                    borderColor: "#1e87fd", borderWidth: 1, borderRadius: 50, position: "absolute", top: HEIGHT - 85
                }} >
                    <View style={{ height: 52, width: 52, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "white", left: 0, position: "absolute" }} >
                        <Ionicons name={"arrow-right"} color={"black"} size={25} />
                    </View>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: "bold", color: "white" }} >Finish</Text>
                </TouchableOpacity>


                <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "100", color: "#1e87fd", position: "absolute", bottom: 140, left: 25 }} >Note : You Can Also Change Your Range Later Too. </Text>



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


export default ProfileFifthtPage;
