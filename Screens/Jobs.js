
import React, { useEffect, useState, useRef, useContext } from 'react';
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
import firestore from "@react-native-firebase/firestore"

import axios from "axios";
import { TouchableRipple } from 'react-native-paper';
import { MyContext } from './AppStartStack';
import Requests from './Requests';
import { ChatsHeader, Requestheader } from './ChatsHeader';
import Chats from './Chats';



const WiDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height



const Jobs = ({ navigation }) => {







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
            <ChatsHeader />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => { setscrollview(0) }} style={{ width: "50%", height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 8 }}>

            <Requestheader />
          </TouchableOpacity>
        </View>

        <Animated.ScrollView onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
          ref={scrollRef} contentContainerStyle={{ paddingTop: 10 }} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} horizontal={true} pagingEnabled={true} decelerationRate={"fast"} snapToInterval={WiDTH} style={{ flex: 1 }} >
          <Animated.View style={{ width: WiDTH, height: "100%" }} >

            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ paddingBottom: 65 }} >
            

           <Chats/>
              
            </ScrollView>










          </Animated.View>

          <Animated.View style={{ width: WiDTH, height: "100%" }} >

            <Requests />

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
