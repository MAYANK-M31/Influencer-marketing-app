
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
    AsyncStorage,
    ToastAndroid
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore"
import { MyContext } from './AppStartStack';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const EditPayMode = ({ navigation,route }) => {

    const {state,dispatch} = useContext(MyContext)
    const {paymode} = state;


    const [type, settype] = useState(paymode)

    const select = (item) => {
        settype(item)
    }

    
    const save = () => {
        if (type == null) {
            ToastAndroid.show("Please Choose One option", ToastAndroid.SHORT)
        } else {

            const func = async () => {
           
                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)
                ref.update({
                    paymode:type
                }).then(async()=>{
                    ToastAndroid.show("Updated",ToastAndroid.SHORT)
                    dispatch({type:"ADD_PAYMODE",payload:type})
                    navigation.goBack()

                })
                
              
                  

            }
              func()


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
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Edit PayMode</Text>
                    </View>
                    <TouchableOpacity onPress={() => { save() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Choose Paymode</Text>
                    </View>

                    <TouchableOpacity activeOpacity={1} onPress={() => { select("pay") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "center", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 ,borderWidth: 2, borderColor: type == "pay" ? "#007bff" : "white" }} >
                        {
                            type == "pay" ?
                                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center", position: "absolute", right: 15 }} >
                                    <Ionicons name={"check"} size={25} color={"#007bff"} />
                                </View>
                                :
                                null
                        }
                        <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007bff", alignSelf: "flex-start" }} >Pay Only</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => { select("barter") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "center", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10, borderWidth: 2, borderColor: type == "barter" ? "#007bff" : "white" }} >
                        {
                            type == "barter" ?
                                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center", position: "absolute", right: 15 }} >
                                    <Ionicons name={"check"} size={25} color={"#007bff"} />
                                </View>
                                :
                                null
                        }
                        <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007bff", alignSelf: "flex-start" }} >Barter Only</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={() => { select("both") }} style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "center", height: 50, borderRadius: 10, backgroundColor: "white", marginTop: 10, alignItems: "center", paddingHorizontal: 10 , borderWidth: 2, borderColor: type == "both" ? "#007bff" : "white"}} >
                        {
                            type == "both" ?
                                <View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: "#e6f1ff", alignItems: "center", justifyContent: "center", position: "absolute", right: 15 }} >
                                    <Ionicons name={"check"} size={25} color={"#007bff"} />
                                </View>
                                :
                                null
                        }

                        <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007bff", alignSelf: "flex-start" }} >Any of Both</Text>
                        </View>
                    </TouchableOpacity>


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


export default EditPayMode;
