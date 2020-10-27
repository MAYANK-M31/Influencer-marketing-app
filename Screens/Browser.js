
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image, FlatList, ImageBackground
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Browser = ({ route, navigation }) => {
    const [loading, setloading] = useState(true)


    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ height: HEIGHT, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"#404852"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>

                    <View style={style.chat} >
                        {loading ? <ActivityIndicator color={"#007bff"} size={20} /> : null}
                    </View>


                </View>

                <View style={{ height: HEIGHT - 10 }}>
                    <WebView
                    
                        onLoadEnd={() => { setloading(false) }}
                        source={{ uri: route.params.link }} />
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


export default Browser;
