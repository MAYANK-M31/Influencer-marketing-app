
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
    Image, FlatList, ImageBackground, ActivityIndicator
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import axios from "axios"
import { sub } from 'react-native-reanimated';

var abbreviate = require('number-abbreviate')


const images = [
    "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
    "https://static.toiimg.com/photo/72975551.cms",
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThTgEcopn3OPT-NJzQhonAm317Js0Ye_M6hw&usqp=CAU",
    "https://m.economictimes.com/thumb/msid-68721417,width-1200,height-900,resizemode-4,imgsize-1016106/nature1_gettyimages.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR44cv1ylNive73e-Xx2N0WvetvMmaGoT3s-w&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyYiivRzt1u3Hh1PxNFIC7t6z2_E_ewPQLcw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTnu0iNiJXo9v63aomTvoWRA1iXHed93-B2LA&usqp=CAU"
]

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
var abbreviate = require('number-abbreviate')

const Gallery = ({ route, navigation }) => {
    const [instadata, setinstadata] = useState([])

    useEffect(() => {
        setinstadata(JSON.parse(route.params.image))


    }, [])




    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"white"} size={28} name={"x"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }} >Photos</Text>
                    </View>
                    <View style={style.chat} >
                        {/* <Ionicons color={"#404852"} size={28} name={"message-circle"} /> */}
                    </View>
                </View>

                <ScrollView style={{ backgroundColor: "black", paddingTop: HEIGHT / 8 }} horizontal={true} pagingEnabled={true} decelerationRate={'fast'} scrollEventThrottle={16} snapToInterval={WiDTH}  >
                    <View style={{ width: WiDTH, height: 450 }} >
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: route.params.uri }} />
                    </View>
                    {instadata.map((item) =>

                        item.media_url == route.params.uri ?
                            null
                            :

                            <View style={{ width: WiDTH, height: 450 }} >
                                <Image style={{ width: "100%", height: "100%" }} source={{ uri: item.media_url }} />
                            </View>


                    )}

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
        backgroundColor: "black",
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


export default Gallery;
