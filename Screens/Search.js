
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
    Image, Alert, BackHandler, TextInput
} from 'react-native';
import firestore from "@react-native-firebase/firestore"
import Ionicons from "react-native-vector-icons/Feather"
import Card from './Card';
import { TouchableRipple } from 'react-native-paper';

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Search = ({ navigation }) => {




    const [result, setresult] = useState([])

    var a = []
    useEffect(() => {
        const func = async () => {
            const ref = await firestore().collection("influencer")

            ref.get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        a.push(doc.data())
                    });


                    // console.log(a[1].instadata.data[0].username)

                    setresult(a)
                })
                .catch(function (error) {
                    // console.log("Error getting documents: ", error);
                });

        }
        func()



    }, [setresult])
    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={style.container}>

                <View style={style.textinput} >
                    <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={{ height: "100%", width: 20, justifyContent: "center", }} >
                        <Ionicons name={"arrow-left"} size={22} color={"#404852"} style={{ left: 10 }} />
                    </TouchableOpacity>

                    <TextInput style={style.textinputtext} placeholder={"Search Influencer"} />
                </View>

                <ScrollView scrollEventThrottle={16} contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }} >
                    {result.map((item) =>
                        <TouchableRipple rippleColor="rgb(0,0,0,0.32)" activeOpacity={0.9} onPress={() => navigation.navigate("Profilepage", { uid: item.uid,data:item ,name: item.name, category: item.category, age: item.age, image: item.image, city: item.city, budget: [item.minrange, item.maxrange], paymode: item.paymode, youtubedata: JSON.stringify(item.youtubedata), instadata: JSON.stringify(item.instadata) })} >
                            <Card  key={item.uid} profileimage={JSON.stringify(item.profileimage)} name={item.name} category={item.category} youtubedata={JSON.stringify(item.youtubedata)} instausername={JSON.stringify(item.instadata)} image={item.image} />
                        </TouchableRipple>

                    )}

                    {/* <Card name={"Nikhil Chinnapa"} category={"Singer"} subscribers={"800K"} views={"120M"} followers={"2.4M"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTq2hiMM4LY3J-nPX9QFO0URL2siUWeJP-t-A&usqp=CAU"} />
                    <Card name={"Sahil Khanna"} category={"Moto Vlogger"} subscribers={"300K"} views={"1M"} followers={"50K"} image={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"} />
                    <Card name={"Nikhil Chinnapa"} category={"Singer"} subscribers={"800K"} views={"120M"} followers={"2.4M"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTq2hiMM4LY3J-nPX9QFO0URL2siUWeJP-t-A&usqp=CAU"} />
                    <Card name={"Ranvir Chaudhary"} category={"Fitness"} subscribers={"120K"} views={"12M"} followers={"20K"} image={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"} />
                    <Card name={"Nikhil Chinnapa"} category={"Singer"} subscribers={"800K"} views={"120M"} followers={"2.4M"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTq2hiMM4LY3J-nPX9QFO0URL2siUWeJP-t-A&usqp=CAU"} /> */}
                </ScrollView>
            </SafeAreaView>
        </>

    )


}






const style = StyleSheet.create({
    header: {
        top: 0,
        height: 45,
        width: "100%",
        justifyContent: "center",
        backgroundColor: "white"
    },
    headingtext: {
        color: "#404852",
        fontSize: 22,
        fontWeight: "bold",
        left: 20

    },
    container: {
        height: HEIGHT,
        backgroundColor: "white",
    },
    header: {
        top: 0,
        height: 45,
        width: "100%",
        justifyContent: "center",
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
    card: {
        width: WiDTH,
        height: WiDTH / 2,
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

    },
    category: {
        fontSize: 13,
        fontWeight: "100",
        color: "#878ca0",
        marginBottom: 5
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


export default Search;
