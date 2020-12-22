
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


const EditAbout = ({ navigation, route }) => {

    const {dispatch} = useContext(MyContext)
 
    const [value, setvalue] = useState(route.params.about)
    const [disable, setdisable] = useState(true)

    useEffect(()=>{
        if (about) {
            setvalue(about)
        }
    },[])


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
                    // dispatch({type:"ADD_ABOUT",payload:value})
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
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >About</Text>
                    </View>
                    <TouchableOpacity disabled={disable} onPress={() => { save() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: disable ? "#007bffCC" : "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ minHeight: 150, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 5, paddingBottom: 20 }} >

                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "#404852", alignSelf: "flex-end", marginRight: 15 }}>{value.length}/200</Text>

                    <View style={{ width: "95%", height: 150, alignSelf: "center", justifyContent: "flex-start", borderRadius: 10, backgroundColor: "white", marginTop: 5, alignItems: "flex-start", paddingHorizontal: 10 }} >


                        <TextInput style={{ width: "100%" }} multiline={true} maxLength={200} value={value} onChangeText={(text) => { setvalue(text) }} autoCapitalize={"words"} placeholder={"Write about yourself"} />

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


export default EditAbout;
