import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import ExploreData from './ExploreData';
import UserHoldings from './UserHoldings';
const BottomTabView = () => {
    const Tab = createMaterialTopTabNavigator();
    const Explore = () => {
        return (
            <ExploreData />
        );
    };
    const Holdings = () => {
        return (
            // <ScrollView showsVerticalScrollIndicator={false}>
            //     <View
            //         style={{
            //             flexWrap: 'wrap',
            //             flexDirection: 'row',
            //             flex: 1,
            //         }}
            //     >
            //         <Text>Holdings Screen</Text>
            //     </View>
            // </ScrollView>
            <UserHoldings/>
        );
    };
    const Positions = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <Text>Positions Screen</Text>
                </View>
            </ScrollView>
        );
    };
    const Orders = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <Text>Orders Screen</Text>
                </View>
            </ScrollView>
        );
    };
    const Watchlist = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <Text style={styles.NameText}>Watchlist Screen</Text>
                </View>
            </ScrollView>
        );
    };
    return (
        <Tab.Navigator
            screenOptions={() => ({
                
                tabBarIndicatorStyle: {
                    backgroundColor: '#000',
                },
                tabBarLabelStyle:{color:'#000',fontSize:14,fontWeight:'500'},
                tabBarItemStyle: { borderWidth: 1, borderRadius: 10, margin: 10, borderColor:'#000' },
                tabBarStyle: {
                    width: '100%',
                    // height:'90%',
                    backgroundColor: '#fff',
                    paddingHorizontal:10
                },
                tabBarScrollEnabled: true,
                // tabBarIndicator:false
            })}
        >
            <Tab.Screen name="Explore" component={Explore} />
            <Tab.Screen name="Holdings" component={Holdings} />
            <Tab.Screen name="Positions" component={Positions} />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Watchlist" component={Watchlist} />
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    extraInfo: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
        margin: 10,
    },
    info: {
        width: Dimensions.get("screen").width / 2.4,
        height: Dimensions.get('screen').height / 5,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
    },
    products: {
        width: Dimensions.get("screen").width / 5,
        height: Dimensions.get('screen').height / 10,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
    },
    infoText: {
        textAlign: "center",
        fontSize: 18,
    },
    smallIcon: {
        height: 50,
        width: 50,
        borderRadius: 40,
    },
    NameText:{
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    }
});
export default BottomTabView;