import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'react-native-axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PriceChart from './PriceChart';
import BottomTabView from './BottomGrow';
import BottomDetails from './BottomDetails';

const StockDetails = (props) => {
    const { name } = props.route.params;
    const [stockPrice, setStockPrice] = useState(null);
    const [stockPricehigh, setStockPricehigh] = useState(null);
    const [stockPricelow, setStockPricelow] = useState(null);
    const [stockOpen, setstockOpen] = useState(null)
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

            // console.log(price);
            // console.log(pricehigh);
            // console.log(pricelow);

        } catch (error) {
            console.error(error);
        }
    }
    const percentChange = ((stockPrice - stockOpen) / stockOpen) * 100;
    return (
        <View style={{ flex: 1 }}>
            {/* <ScrollView> */}
            <View style={{}}>
                <FontAwesome name="arrow-left" size={20} color="black" style={{ margin: 15 }} />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "black", left: 5 }}>Adani Total Gas</Text>
                    <TouchableOpacity>
                        <FontAwesome name="bookmark-o" size={25} color="black" style={{ margin: 5, right: 5 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 5 }}>
                    {/* <Text>StockDetails</Text> */}
                    {/* <Text>{name}</Text> */}
                    <Text style={{ color: "black", fontSize: 30 }}>Price:{stockPrice}</Text>
                    <View style={{ flexDirection: "row", margin: 5 }}>
                        {
                            stockPrice && stockOpen && (
                                stockPrice > stockOpen ? (
                                    <Text style={{ color: "green" }}>+{stockPrice - stockOpen}</Text>
                                ) : (
                                    <Text style={{ color: "red" }}>-{stockOpen - stockPrice}</Text>
                                )
                            )
                        }
                        <Text style={{ color: stockPrice > stockOpen ? "green" : "red", left: 5 }}>{percentChange.toFixed(2)}%</Text>
                        {/* <Text style={{ color: "black" }}>Today's High:{stockPricehigh}</Text>
                    <Text style={{ color: "black" }}>Today's Low:{stockPricelow}</Text>
                    <Text style={{ color: "black" }}>Open:{stockOpen}</Text> */}
                    </View>
                </View>


            </View>
            <View style={{ height: '30%', width: '100%' }}>
                <PriceChart name={name} />
            </View>

            {/* </ScrollView> */}
            <BottomDetails name={name} />
            <View style={styles.container}>
                <View style={{ width: "45%", margin: 7 }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 30, backgroundColor: "red", height: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center" }}>SELL</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "45%", margin: 7 }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 30, backgroundColor: "green", height: 40, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ textAlign: "center" }}>BUY</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
        //</ScrollView>
    )
}

export default StockDetails

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        position: 'absolute',
        bottom: 0,
        width: '100%',

        padding: 10,
    },
})