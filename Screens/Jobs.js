
import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Button, Animated, TouchableOpacity, Image
} from 'react-native';

import Ionicons from "react-native-vector-icons/Feather"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import axios from "axios";
import { TouchableRipple } from 'react-native-paper';

GoogleSignin.configure({
  webClientId: '808729452255-1eq8j4n13aprkh4hs9vg3paeh2c99jur',
  scopes: ["https://www.googleapis.com/auth/youtube.readonly"]
});

const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height



const Jobs = ({navigation}) => {

  const [scrollview, setscrollview] = useState(1)
  const [color, setcolor] = useState(true)
  const scrollRef = useRef();

  const func = () => {
    scrollRef.current?.scrollTo({ x: scrollview == 0 ? WiDTH : -WiDTH, animated: true })
  }

  func()

  const [scrollX] = useState(new Animated.Value(0))
  const [position] = useState(scrollX.interpolate({
    inputRange: [0, WiDTH - 20,],
    outputRange: [0, (WiDTH - 50) / 2],

  }))






  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <SafeAreaView style={style.container}>

        <View style={style.header} >
          <View style={style.back} >
            <Text style={style.headingtext} >Jobs</Text>
          </View>


        </View>
        {/* //#878ca0 */}

        <View style={{ width: WiDTH - 20, height: 50, backgroundColor: "#f0f2f5", alignSelf: "center", alignItems: "center", paddingVertical: 3, paddingHorizontal: 3, marginTop: 10, borderRadius: 10, flexDirection: "row", overflow: "hidden" }} >
          <Animated.View style={{ backgroundColor: "white", width: (WiDTH - 20) / 2, height: "100%", position: "absolute", borderRadius: 8, zIndex: -10, marginHorizontal: 3, transform: [{ translateX: position }] }} >

          </Animated.View>
          <TouchableOpacity activeOpacity={1} onPress={() => { setscrollview(1) }} style={{ width: "50%", height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
            <Text style={{ color: "#007bff", fontWeight: "bold", fontSize: 15 }} >Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => { setscrollview(0) }} style={{ width: "50%", height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
            <Text style={{ color: "#007bff", fontWeight: "bold", fontSize: 15 }} >Requests</Text>
          </TouchableOpacity>
        </View>

        <Animated.ScrollView onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
          ref={scrollRef} contentContainerStyle={{ paddingTop: 10 }} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} horizontal={true} pagingEnabled={true} decelerationRate={"fast"} snapToInterval={WiDTH} style={{ flex: 1 }} >
          <Animated.View style={{ width: WiDTH, height: "100%" }} >

            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ paddingBottom: 65 }} >
              <TouchableRipple  onPress={() => { navigation.navigate("Chat") }} rippleColor={"rgb(0,0,0,0.32)"}>
                <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                  <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15,top:-5, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                  </View>
                  <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500",top:-5, justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                    <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                      </View>
                      <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                    </View>
                  </View>
                </View>
              </TouchableRipple>

              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >Your request has been accepted Chat now</Text>
                  </View>
                </View>
              </View>

              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5" }} >
                  <View style={{ width: "100%", height: "100%", borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://lh3.googleusercontent.com/az2lMjtfWh7GOAQ0pQXm-sLoCNg_eGUXI5j5Fe9u0C6Ddk0J2Oe5XiL7rf3S-VVi_Yw" }} />
                  </View>
                  <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", position: "absolute", right: 2, bottom: 2, zIndex: 1, borderWidth: 1.5, borderColor: "white" }}>
                  </View>
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >KhataBook</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >You got a new message</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>

              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
                <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                  <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
                </View>
                <View style={{ width: WiDTH * 0.75, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                  <Text style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                      <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                    </View>
                    <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >How Are you</Text>
                  </View>
                </View>
              </View>

            </ScrollView>










          </Animated.View>

          <Animated.View style={{ width: WiDTH, height: "100%" }} >

            <View style={{ width: "100%", height: 65, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-around", marginTop: 10 }} >
              <View style={{ width: WiDTH * 0.15, height: WiDTH * 0.15, borderRadius: 100, backgroundColor: "#f0f2f5", overflow: "hidden" }} >
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: "data:image/png;base64,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" }} />
              </View>
              <View style={{ width: WiDTH * 0.50, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                <Text numberOfLines={1} style={{ fontWeight: "bold", color: "#2a3659", fontSize: 18, top: -5 }} >Dream 11</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <View style={{ width: 15, height: 15, borderRadius: 100, backgroundColor: "#007bff", justifyContent: "center", alignItems: "center", marginRight: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }} >1</Text>
                  </View> */}
                  <Text style={{ fontWeight: "100", color: "#a0b3c3", fontSize: 14 }} >Your request is sent</Text>
                </View>
              </View>
              <View style={{ width: WiDTH * 0.25, height: "100%", backgroundColor: "#f0f2f500", justifyContent: "center", alignSelf: "flex-end", borderBottomWidth: 0.6, borderBottomColor: "#f0f2f5" }} >
                <View style={{ width: 80, height: 30, backgroundColor: "white", borderWidth: 1, alignSelf: "center", borderColor: "#409cff", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                    <Text style={{ color: "#409cff" }}>Sent</Text>
                    <Ionicons size={15} color={"#409cff"} name={"check"} />
                  </View>
                </View>

              </View>
            </View>

          </Animated.View>

        </Animated.ScrollView>



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
    height: 50,
    width: WiDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },
  back: {
    height: "100%",
    width: WiDTH / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    height: "100%",
    width: WiDTH / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  chat: {
    height: "100%",
    width: WiDTH / 3.8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headingtext: {
    color: "#404852",
    fontSize: 22,
    fontWeight: "bold",
    left: 5

  },

  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"

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
    alignItems: "center"
  },
  textinputtext: {
    color: "#878ca0",
    left: 18,
    fontSize: 15
  },
  container2: {
    width: "100%",
    height: 400,
    backgroundColor: "white",
    marginTop: 20,
  },
  headingtext2: {
    color: "#404852",
    fontSize: 20,
    fontWeight: "bold",
    left: 20

  },
  catergory1: {
    width: WiDTH / 2.3,
    height: WiDTH / 3.5,
    backgroundColor: "#1de28d",
    marginLeft: 20,
    marginBottom: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"

  },
  catergory2: {
    width: WiDTH / 2.3,
    height: WiDTH / 3.5,
    backgroundColor: "#1e87fd",
    marginBottom: 15,
    marginLeft: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"

  },
  catergory3: {
    width: WiDTH / 2.3,
    height: WiDTH / 3.5,
    backgroundColor: "#cb67e4",
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"

  },
  catergory4: {
    width: WiDTH / 2.3,
    height: WiDTH / 3.5,
    backgroundColor: "#fe6b6f",
    marginLeft: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"

  },
  categorytext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },


})


export default Jobs;
