// import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'react-native-axios';
import ExploreData from './ExploreData';
import News from './News';
const BottomDetails = (props) => {
    const name = props.name
    // const { name } = props.route.params;
    const [stockPrice, setStockPrice] = useState(null);
    const [stockPricehigh, setStockPricehigh] = useState(null);
    const [stockPricelow, setStockPricelow] = useState(null);
    const [stockOpen, setstockOpen] = useState(null)
    const [Description, setDescription] = useState(null)
    useEffect(() => {
        fetchdata()
    }, [])
    const options = {
        method: 'GET',
        url: `https://telescope-stocks-options-price-charts.p.rapidapi.com/stocks/${name}`,
        params: {
            modules: 'assetProfile,summaryProfile,price'
        },
        headers: {
            'X-RapidAPI-Key': '65f30ee3e8msh34c6b056db5bf24p123ce7jsn456e522ebb3e',
            'X-RapidAPI-Host': 'telescope-stocks-options-price-charts.p.rapidapi.com'
        }
    };



    const fetchdata = async () => {
        try {
            const response = await axios.request(options);

            const result = response.data.quoteSummary.result[0];

            // console.log(result)

            // var price = result.price.regularMarketPrice.raw;
            setStockPrice(result.price.regularMarketPrice.raw)
            var stp = stockPrice
            // var pricehigh = result.price.regularMarketDayHigh.raw;
            setStockPricehigh(result.price.regularMarketDayHigh.raw)
            var stph = stockPricehigh
            // var pricelow = result.price.regularMarketDayLow.raw;
            setStockPricelow(result.price.regularMarketDayLow.raw)
            var stpl = stockPricelow
            setstockOpen(result.price.regularMarketOpen.raw)
            var stpo = stockOpen
            var str = result.assetProfile.longBusinessSummary
            var s = str.split('.').slice(0, 2).join(".")
            console.log(s);
            setDescription(s)

            // console.log(price);
            // console.log(pricehigh);
            // console.log(pricelow);

        } catch (error) {
            console.error(error);
        }
    }
    const percentChange = ((stockPrice - stockOpen) / stockOpen) * 100;
    const Tab = createMaterialTopTabNavigator();

    const Overview = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{


                        flex: 1,
                    }}
                >

                    <View style={{}}>
                        <Text>{Description}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <Text style={{ color: "black" }}>Today's High:{stockPricehigh}</Text>
                        <Text style={{ color: "black", right: 5 }}>Today's Low:{stockPricelow}</Text>

                    </View>




                </View>
            </ScrollView>
        );
    };
    const News1 = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        // flexWrap: 'wrap',
                        //  flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <News />
                </View>
            </ScrollView>
        );
    };
    const Events = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <Text>Events Screen</Text>
                </View>
            </ScrollView>
        );
    };

    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarIndicatorStyle: {
                    backgroundColor: '#F0F8FF'
                },
                tabBarItemStyle: { borderWidth: 1, borderRadius: 30, margin: 10, borderColor: '#D3D3D3' },
                tabBarStyle: {
                    width: '100%',
                    // height:'90%',
                    backgroundColor: '#F0F8FF'
                },
                tabBarScrollEnabled: true,
                // tabBarIndicator:false
            })}
        >
            <Tab.Screen name="Overview" component={Overview} />
            <Tab.Screen name="News1" component={News1} />
            <Tab.Screen name="Events" component={Events} />
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
});
export default BottomDetails;