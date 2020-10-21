
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
    ToastAndroid,
    AsyncStorage,
    Picker,

} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import { TextInput, DefaultTheme } from "react-native-paper"

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const AddAchievements = ({ navigation, route }) => {

    const [value, setvalue] = useState("")
    const [disable, setdisable] = useState(true)
    const [category, setcategory] = useState("0")

    const theme = {
        ...DefaultTheme,
        roundness: 8,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1e87fd',
            accent: '#f1c40f',
            background: "white",
            underlineColor: "transparent"

        },
    };


    useEffect(() => {

        if (value.length >= 80) {
            setdisable(false)
        } else {
            setdisable(true)
        }
    }, [value.length])


    const save = () => {
        if (value.length <= 80) {
            ToastAndroid.show("Please write minimum 80 words", ToastAndroid.LONG)
        } else {

            const func = async () => {

                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)
                ref.update({
                    about: value.toLowerCase()
                }).then(async () => {
                    ToastAndroid.show("Updated", ToastAndroid.SHORT)
                    navigation.goBack()
                    await AsyncStorage.setItem("editabout", value)
                })




            }
            func()


        }
    }



    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                
                    <View style={style.header} >
                        <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                            <Ionicons style={{ marginRight: 10 }} color={"#404852"} size={30} name={"chevron-left"} />
                        </TouchableOpacity>
                        <View style={style.heading} >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Achievements</Text>
                        </View>
                        <TouchableOpacity disabled={disable} onPress={() => { save() }} style={style.chat} >
                            <View style={{ width: 50, height: 30, backgroundColor: disable ? "#007bffCC" : "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                                <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={{ width: "95%", marginTop: 40, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Title</Text>

                        <View style={{ width: "95%", height: 50, alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <TextInput label={"Title"}
                                placeholder={"Enter Company name"}
                                style={{ width: "100%", height: 50 }}
                                mode={"outlined"}
                                maxLength={200}
                                value={value}
                                onChangeText={(text) => { setvalue(text) }}
                                autoCapitalize={"words"}
                                theme={theme}
                            />
                        </View>
                    </View>




                    <View style={{ minHeight: 100, width: "95%", marginTop: 20, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Description (Optional)</Text>

                        <View style={{ width: "95%", minHeight: 50, alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <TextInput label={"Description"}
                                placeholder={"Enter Company name"}
                                style={{ width: "100%", minHeight: 50 }}
                                mode={"outlined"}
                                multiline={true}
                                maxLength={200}
                            
                                autoCapitalize={"words"}
                                theme={theme}
                            />
                        </View>

                    </View>

                    <View style={{ minHeight: 100, width: "95%", marginTop: 20, justifyContent: "center", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, paddingVertical: 10 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginLeft: 15, marginBottom: 10 }}>Category</Text>

                        <View style={{ width: "95%", height: 50, overflow: "hidden", alignSelf: "center", justifyContent: "center", borderRadius: 10, alignItems: "flex-start", paddingHorizontal: 10, marginBottom: 20 }} >
                            <View style={{ width: "100%", height: 50, backgroundColor: "white", borderColor: "#1e87fd", borderWidth: 2, borderRadius: 10, justifyContent: "center" }} >
                                <Picker selectedValue={category} onValueChange={(value) => { setcategory(value) }} itemStyle={{ fontWeight: "bold", fontSize: 30 }} mode={"dropdown"} style={{ width: "100%", height: 50 }} >
                                    <Picker.Item label=" Award & Honour" value="0" />
                                    <Picker.Item label=" Youtube Views" value="1" />
                                    <Picker.Item label=" Youtube Subscribers" value="2" />
                                    <Picker.Item label=" Instagram Followers" value="3" />
                                    <Picker.Item label=" Other" value="4" />
                                </Picker>
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


export default AddAchievements;
