
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
    TextInput, ToastAndroid, AsyncStorage
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import {MyContext} from "../Screens/AppStartStack"


const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const EditAge = ({ navigation, route }) => {

    const {dispatch} = useContext(MyContext)
    const [value, setvalue] = useState(route.params.age)
    
   

    const save = () => {
        if (value < 5) {
            ToastAndroid.show("Age must be greater than 5 ", ToastAndroid.SHORT)
        } else {

            const Fetch = async () => {
           
                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)
                ref.update({
                    age:value
                }).then(async()=>{
                    ToastAndroid.show("Updated",ToastAndroid.SHORT)
                    navigation.goBack()
                    // dispatch({type:"ADD_AGE",payload:value})
                    // await AsyncStorage.setItem("editage",value)
                })
                
              
                  

            }
              Fetch()


            // navigation.goBack()
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
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Edit Age</Text>
                    </View>
                    <TouchableOpacity onPress={() => { save() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Age</Text>
                    </View>

                    <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 }} >
                        <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center" }} >
                            <Ionicons name={"user"} size={25} color={"#007bff"} />
                        </View>
                        <View style={{ width: "85%", height: "100%" }} >
                            <TextInput value={value} onChangeText={(text) => { setvalue(text) }} maxLength={2} keyboardType={"decimal-pad"} style={{ width: "100%", height: "100%" }} placeholder={"What'your Age"} />
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


export default EditAge;
