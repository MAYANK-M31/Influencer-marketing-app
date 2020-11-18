
import React, { useEffect, useState, useContext } from 'react';
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
    Image, ToastAndroid, ActivityIndicator, Switch, TextInput
} from 'react-native';
import Ionicons from "react-native-vector-icons/Feather"
import { TouchableRipple } from 'react-native-paper';
import { MyContext } from './AppStartStack';
import { FlatList } from 'react-native-gesture-handler';
import firestore from "@react-native-firebase/firestore"




const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height






const BrandSearch = ({ navigation, route }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setloading] = useState(null)
    const [campaignposts, setcampaignposts] = useState([])

  

    var array = []
    useEffect(() => {
        setloading(true)
        const func = async () => {




            const ref = await firestore().collection("brandpost")

            ref.get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        array.push(doc.data())
                    });
                    setcampaignposts(array)
                    setloading(false)
                    setloading(false)

                    // console.log(array[1].instadata.data[0].username)
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                    setloading(false)
                });

        }
        func()



    }, [])

    const postedOn = (item) => {
        var date = item.split(" ")[2]
        var currentDate = new Date()
        var currentDate = currentDate.toLocaleString().split(" ")[2]
        var time = currentDate - date
        var type = "day ago"
        if (time == 0) {
            var date = item.split(" ")[4]
            var currentDate = new Date()
            var currentDate = currentDate.toLocaleString().split(" ")[3]
            var time = currentDate.split(":")[0] - date.split(":")[0]
            var type = "hour ago"
            if (time == 0) {
                var date = item.split(" ")[4]
                var currentDate = new Date()
                var currentDate = currentDate.toLocaleString().split(" ")[3]
                var time = currentDate.split(":")[1] - date.split(":")[1]
                var type = "min ago"
            }
        }
        return time + type


    }

    const apply = async (item) => {
        const Id = await AsyncStorage.getItem("uid")


        const ref = await firestore().collection("brandaccount")
        const ref2 = await firestore().collection("influencer")
        const mydocid = await AsyncStorage.getItem("DocId")
        const insidedata = { personId: Id,postId:item.postId, CreatedAt: new Date(), accepted: false }

        ref.where("uid", "==", item.uid).get().then((res)=>{
         if(res.docs[0].id){
            ref.doc(res.docs[0].id).update({
                requests: firestore.FieldValue.arrayUnion(insidedata)
            }).then(() => {
                ToastAndroid.show("Request Sent Succesfully", ToastAndroid.SHORT)
                ref2.doc(mydocid).update({
                    requestssent: firestore.FieldValue.arrayUnion(insidedata)
                }).then(() => {
                    ToastAndroid.show("Request Sent Succesfully", ToastAndroid.SHORT)
                })
            })
         }else{
            ToastAndroid.show("Failed To Send Request", ToastAndroid.SHORT)
         }
         
        })

       
        .catch(()=>{
            ToastAndroid.show("Failed To Send Request", ToastAndroid.SHORT)
        })

    }


    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>

                <View style={style.textinput} >
                    <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={{ height: "100%", width: 20, justifyContent: "center", }} >
                        <Ionicons name={"arrow-left"} size={22} color={"#404852"} style={{ left: 10 }} />
                    </TouchableOpacity>

                    <TextInput style={style.textinputtext}  placeholder={"Search Brand ,Campaign"} />
                </View>


                <ScrollView contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }} >


                    {campaignposts.length <= 0 ?
                        < Text style={{ alignSelf: "center", fontSize: 18, alignSelf: "center", fontWeight: "bold", color: "#404852", marginTop: HEIGHT / 2.5 }} >Fetching Data</Text>
                        :
                        <>
                            <FlatList
                                data={campaignposts}
                                contentContainerStyle={{ paddingBottom: 50 }}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => (

                                    <TouchableRipple onPress={() => { navigation.navigate("BrandDetail", { data: item }) }} rippleColor={"rgb(0,0,0,0.32)"} >
                                        <View style={style.card} >
                                            <View style={style.insidecard} >
                                                <View style={style.cardleft} >
                                                    <View style={{ borderRadius: 120 / 2, height: 100, width: 100, overflow: "hidden", elevation: 5, backgroundColor: "#cffcfa" }}>
                                                        <Image style={{ width: "100%", height: "100%", backgroundColor: "#e6fff6" }} source={{ uri: item.profileimage ? item.profileimage : "https://media-exp1.licdn.com/dms/image/C560BAQGgarC7a_EY3g/company-logo_200_200/0?e=2159024400&v=beta&t=-EXDJkxAruj-KdC-iQeRTtdn1M4TdxqL_TIDi4-plK8" }} />
                                                    </View>
                                                </View>
                                                <View style={style.cardright} >
                                                    <View style={{ height: "100%" }} >
                                                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }} >
                                                            <View style={{ width: "80%" }} >
                                                                <Text numberOfLines={1} style={style.name} >{item.campaigntitle}</Text>
                                                                <Text style={style.category} >{item.brandpostcategory}</Text>
                                                            </View>
                                                            {/* <Switch
                                                                trackColor={{ false: "#f0f2f5", true: "#2989ff" }}
                                                                thumbColor={isEnabled ? "white" : "white"}
                                                                ios_backgroundColor="#3e3e3e"
                                                                onValueChange={toggleSwitch}
                                                                value={isEnabled}
                                                                style={{ position: "absolute", right: 0 }}


                                                            /> */}
                                                            <Text style={{ position: "absolute", right: 5, fontSize: 10, color: "grey", top: 4 }}>{postedOn(item.createdAt)}</Text>
                                                        </View>


                                                        {
                                                            item.youtubesubs ?
                                                                <View style={{ width: "100%", height: 20, flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                                                    <Image style={{ width: 20, height: 20 }} source={require("../Icons/youtube.png")} />
                                                                    <Text style={{ fontSize: 14, marginLeft: 20, color: "#878ca0", left: -10, fontWeight: "bold" }} ><Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }} >{item.youtubesubs ? item.youtubesubs : null}</Text>Subs  |</Text>
                                                                    <View style={{ width: 60, height: 30, flexDirection: "row", justifyContent: "space-around", left: -5, alignItems: "center" }}>
                                                                        <Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }}>5m+</Text>
                                                                        <Ionicons name={"eye"} size={20} color={"gray"} />
                                                                    </View>
                                                                </View>
                                                                :
                                                                null
                                                        }

                                                        {item.instafollowers ?
                                                            <View style={{ width: "100%", height: 20, flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                                                <Image style={{ width: 20, height: 20 }} source={require("../Icons/instagram.png")} />
                                                                <Text style={{ fontSize: 14, marginLeft: 20, color: "#878ca0", left: -10, fontWeight: "bold" }} ><Text style={{ fontSize: 14, color: "#404852", fontWeight: "bold", textTransform: "uppercase" }} >{item.instafollowers ? item.instafollowers : null} </Text>Followers</Text>
                                                            </View>
                                                            :
                                                            null
                                                        }


                                                        <View style={{ width: "100%", height: 30, flexDirection: "row", alignItems: "center", marginTop: 3, position: "absolute", bottom: 2 }}>
                                                            <Text style={{ fontSize: 14, color: "#878ca0", fontWeight: "bold" }} >{item.campaignStartDate.split(" ")[2] + "th" + " " + item.campaignStartDate.split(" ")[1] + " " + item.campaignStartDate.split(" ")[3]} - {item.campaignEndDate.split(" ")[2] + "th" + " " + item.campaignEndDate.split(" ")[1] + " " + item.campaignEndDate.split(" ")[3]}</Text>
                                                        </View>

                                                    </View>

                                                </View>
                                            </View>

                                            <View style={style.buttondiv} >

                                                <TouchableRipple borderless={true} rippleColor={"rgb(0,0,0,0.32)"} style={style.button1} >
                                                    <View>
                                                        <Text style={style.button1text} >Save for review</Text>
                                                    </View>
                                                </TouchableRipple >

                                                <TouchableRipple borderless={true} onPress={() => { apply(item) }} rippleColor={"rgb(0,0,0,0.32)"} style={style.button2} >
                                                    <View  >
                                                        <Text style={style.button2text} >Apply</Text>
                                                    </View>
                                                </TouchableRipple >


                                            </View>

                                        </View>
                                    </TouchableRipple>


                                )}
                            />

                        </>
                    }




                </ScrollView>



            </SafeAreaView>
        </>

    )


}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",


    },
    header: {
        flexDirection: "row",
        width: WiDTH,
        height: 50,
        alignItems: "center",
        borderBottomColor: "#f0f2f5",
        borderBottomWidth: 0.2
    },
    heading: {
        top: 50,
        left: 15,
        position: "absolute",
    },
    card: {
        width: WiDTH,
        height: WiDTH / 1.8
    },
    textinput: {
        width: "90%",
        height: 45,
        elevation: 2,
        backgroundColor: "white",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    textinputtext: {
        color: "#878ca0",
        left: 18,
        fontSize: 16
    },
    insidecard: {
        width: WiDTH,
        height: "60%",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 0,
    },
    cardleft: {
        width: "30%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    cardright: {
        width: "70%",
        paddingLeft: 15,
        height: "100%",

    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#202946",
        textTransform: "capitalize"

    },
    category: {
        fontSize: 13,
        fontWeight: "100",
        color: "#878ca0",
        textTransform: "capitalize"
    },
    buttondiv: {
        width: "100%",
        height: "40%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    button1: {
        width: WiDTH / 2.5,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#de4229",
        borderWidth: 1.5,
        marginLeft: 10
    },
    button2: {
        width: WiDTH / 2.5,
        height: 45,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#409cff",
        borderWidth: 1.5,
        marginRight: 10
    },
    button1text: {
        fontSize: 16,
        color: "#de4229",
        fontWeight: 'bold'
    },
    button2text: {
        fontSize: 16,
        color: "#409cff",
        fontWeight: 'bold'
    }



})


export default BrandSearch;
