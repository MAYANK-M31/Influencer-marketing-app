import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { color } from 'react-native-reanimated';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'white' }]}
    />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'white' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };


const Tabviews = () => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Instagram' },
        { key: 'second', title: 'YouTube' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const renderTabBar = (props) => {
        return <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#404852' }}
            tabStyle={{
                backgroundColor: 'white', marginBottom: 2
            }}
            indicatorContainerStyle={{ backgroundColor: "white" }}
            labelStyle={{ color: "#404852", fontWeight: "bold" }}

          


        />
    }

    return (
        <View style={{ marginTop: 25 }} >
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={{ backgroundColor: '#333333' }}

            />
        </View>

    );
}

const styles = StyleSheet.create({
    scene: {
        width: "100%",
        height: 500
    },
});

export default Tabviews;