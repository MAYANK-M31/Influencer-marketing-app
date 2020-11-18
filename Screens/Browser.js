
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
    Image, FlatList, ImageBackground
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Browser = ({ route, navigation }) => {
    const [loading, setloading] = useState(true)
    const [link, setlink] = useState(null)

    useEffect(() => {
        if (route.params.link) {
            setlink(route.params.link)
            console.log(route.params.link);
            
        } else {
            setlink(null)
        }
    }, [])

    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >

                <View style={style.header} >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={style.back} >
                        <Ionicons color={"#404852"} size={28} name={"arrow-left"} />
                    </TouchableOpacity>

                    <View style={style.chat} >
                        {loading ? <ActivityIndicator color={"#007bff"} size={20} /> : null}
                    </View>


                </View>

                <View style={{ flex: 1 }}>
                    {link ?
                        <WebView
                            onLoadEnd={() => { setloading(false) }}
                            source={{ uri: link }} />
                        :
                        null
                    }
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
