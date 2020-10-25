
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
    Image, FlatList, ImageBackground, ActivityIndicator,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import Icons from "react-native-vector-icons/FontAwesome5"
import { Modal } from "react-native-paper"

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

const ProfileBackground = ({ route, navigation }) => {
    const [image, setimage] = useState(route.params.image)
    const [visible, setvisible] = useState(false)




    return (
        <>
            <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"white"} size={28} name={"chevron-left"} />
                    </TouchableOpacity>
                    <View style={style.heading} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }} >Profile Photo</Text>
                    </View>
                    <TouchableOpacity onPress={() => { setvisible(true) }} style={style.chat} >
                        <Ionicons color={"white"} size={22} name={"edit-2"} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ backgroundColor: "black", paddingTop: HEIGHT / 8 }} horizontal={true} pagingEnabled={true} decelerationRate={'fast'} scrollEventThrottle={16} snapToInterval={WiDTH}  >
                    <View style={{ width: WiDTH, height: 450 }} >
                        <Image style={{ width: "100%", height: "100%" }} source={{ uri: image }} />
                    </View>

                </ScrollView>


            </SafeAreaView>

            
            <Modal visible={visible} onDismiss={()=>setvisible(false)}>
                <View style={{ width: WiDTH, height: HEIGHT }}>
                    <TouchableOpacity onPress={()=>setvisible(false)} style={{ width: WiDTH, height: HEIGHT*3/4}}>

                    </TouchableOpacity>
                    <View style={{ width: WiDTH, height: HEIGHT / 4, backgroundColor: "white", position: "absolute", bottom: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                        <View style={{ width: "100%", height: "35%", justifyContent: "center" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2a3659", marginLeft: 20 }} >Profile Photo</Text>
                        </View>
                        <View style={{ width: "100%", height: "55%", justifyContent: "flex-start", flexDirection: "row" }}>
                            <View >
                                <View style={{ height: 45, width: 45, backgroundColor: "#e7164c", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={18} color={"white"} name={"trash"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Remove</Text>
                                    <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text>
                                </View>
                            </View>

                            <View >
                                <View style={{ height: 45, width: 45, backgroundColor: "#00ca95", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"image"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Gallery</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </View>

                            <View >
                                <View style={{ height: 45, width: 45, backgroundColor: "#4285f4", borderRadius: 50, justifyContent: "center", alignItems: "center", marginLeft: 30 }}>
                                    <Icons size={20} color={"white"} name={"camera"} />
                                </View>

                                <View style={{ marginLeft: 25, height: 45, width: 60, alignItems: "center", marginTop: 5 }}>
                                    <Text style={{ fontSize: 14, color: "grey" }}>Camera</Text>
                                    {/* <Text style={{ fontSize: 14, color: "grey", top: -4 }}>photo</Text> */}
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
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


export default ProfileBackground;
