
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
    AsyncStorage
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import firestore from "@react-native-firebase/firestore"
import { MyContext } from './AppStartStack';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height


const EditBudget = ({ navigation,route }) => {

    const {state,dispatch} = useContext(MyContext)
    const {minrange,maxrange} = state;

    const [value1, setvalue1] = useState(minrange)
    const [value2, setvalue2] = useState(maxrange)


    const save = () => {
        if (value1 == undefined || value2 == undefined) {
            ToastAndroid.show("Please choose range", ToastAndroid.SHORT)
        } else {

            const func = async () => {
           
                const docid = await AsyncStorage.getItem("DocId")
                const ref = await firestore().collection("influencer").doc(docid)
                ref.update({
                    minrange:value1,
                    maxrange:value2
                }).then(async()=>{
                    ToastAndroid.show("Updated",ToastAndroid.SHORT)
                    navigation.goBack()
                    dispatch({type:"ADD_MINRANGE",payload:value1})
                    dispatch({type:"ADD_MAXRANGE",payload:value2})
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
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852" }} >Edit Location</Text>
                    </View>
                    <TouchableOpacity onPress={() => { save() }} style={style.chat} >
                        <View style={{ width: 50, height: 30, backgroundColor: "#007bff", right: 10, justifyContent: "center", alignItems: "center", borderRadius: 5, paddingBottom: 2 }} >
                            <Text style={{ color: "white", fontWeight: "100" }} >Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>

        
                <View style={{ minHeight: 100, width: "95%", backgroundColor: "#f0f2f5", alignSelf: "center", borderRadius: 10, marginTop: 10, paddingTop: 15, paddingBottom: 20 }} >

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#404852", alignSelf: "flex-start", marginBottom: 5 }} >Expecting Range</Text>
                    </View>

                   
                <View style={{ width: "95%",marginBottom:30,alignSelf:"center" }} >
                 
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


export default EditBudget;
