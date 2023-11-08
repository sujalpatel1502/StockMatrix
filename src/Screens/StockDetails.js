import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'react-native-axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PriceChart from './PriceChart';
import BottomTabView from './BottomGrow';
import BottomDetails from './BottomDetails';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StockDetails = (props) => {
    const { name } = props.route.params;
    console.log("nameeeeeeeeeee",name);
    const stockName = name.slice(0, -3);
    const navigation =useNavigation();
    console.log("============================>",stockName);
    const [stockPrice, setStockPrice] = useState(null);
    const [stockPricehigh, setStockPricehigh] = useState(null);
    const [stockPricelow, setStockPricelow] = useState(null);
    const [stockOpen, setstockOpen] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchdata()
    }, [])
    const options = {
        method: 'GET',
        // url: `https://telescope-stocks-options-price-charts.p.rapidapi.com/stocks/${name}`,
        url: `https://telescope-stocks-options-price-charts.p.rapidapi.com/price/${name}`,
        // params: {
        //     modules: 'assetProfile,summaryProfile,price'
        // },
        params: {
           
            interval: '1d'
          },
          headers: {
            'X-RapidAPI-Key': '65f30ee3e8msh34c6b056db5bf24p123ce7jsn456e522ebb3e',
            'X-RapidAPI-Host': 'telescope-stocks-options-price-charts.p.rapidapi.com'
          }
    };

//    const options = {
//   method: 'GET',
//   // this api also gives the data of the candles
//   url: 'https://stockseyes.p.rapidapi.com/latestQuote',
//   params: {
//     tradingSymbol: `${stockName}`
//   },
//   headers: {
//     'X-RapidAPI-Key': '0914adf34amsh6bd88d8ff411258p193309jsnd273f552f087',
//     'X-RapidAPI-Host': 'stockseyes.p.rapidapi.com'
//   }
// };



    const fetchdata = async () => {
//         try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
//     const result=response.data;
//     console.log("======>>>>>>",result.last_price);
//     setStockPrice(result.last_price)
// } catch (error) {
// 	console.error(error);
// }
        
        try {
            const response = await axios.request(options);
            console.log("respnse",response.data.chart.result[0].indicators.quote[0].high);
            // data[0]?.meta?.regularMarketPrice

            const result = response.data.chart.result[0];

             console.log(result)

            // var price = result.price.regularMarketPrice.raw;
            const p = 123.1234567
            console.log(p.toFixed(2));

            setStockPrice(result.meta.regularMarketPrice.toFixed(2))
            var stp = stockPrice
            // var pricehigh = result.price.regularMarketDayHigh.raw;
            const h = result.indicators.quote[0].high
            console.log(h[0]);
            setStockPricehigh(result.indicators.quote[0].high[0].toFixed(2))
            var stph = stockPricehigh
            // var pricelow = result.price.regularMarketDayLow.raw;
            setStockPricelow(result.indicators.quote[0].low[0].toFixed(2))
            var stpl = stockPricelow
            setstockOpen(result.indicators.quote[0].high[0].toFixed(2))
            var stpo = stockOpen
            console.log("======>",stockPrice);
            // console.log("=-=-=>",price);
            // console.log("------------->",pricehigh);
            // console.log("====>",pricelow);

        } catch (error) {
            console.error(error);
        }
    }

    
    
    
    
    const percentChange = ((stockPrice - stockOpen) / stockOpen) * 100;
    const handleBuyPress = () => {

        navigation.navigate("BuyStock",{nam:name, price: stockPrice})
        //console.log()

    };
    const handleSellPress = () => {

        navigation.navigate("SellStock",{nam:name})
        //console.log()

    };

    return (
        <View style={{ flex: 1,paddingHorizontal:'5%',paddingVertical:'5%', backgroundColor:'#ffff' }}>
            {/* <ScrollView> */}
            <View style={{}}>
            <AntDesign name={'arrowleft'} size={30} color={'#000'} onPress={() => {
            navigation.goBack();}} />
                <View style={{ flexDirection: "row", justifyContent: "space-between",alignItems:'center', marginTop:20 }}>
                    <Text style={styles.nameText}>{stockName}</Text>
                    <TouchableOpacity>
                        <FontAwesome name="bookmark-o" size={25} color="black" />
                    </TouchableOpacity>
                </View>

                {/* <View style={{marginVertical:0}}> */}
                    {/* <Text style={styles.DefaultText}>{name}</Text> */}
                    <View style={{justifyContent:'space-between',marginVertical:5}}>
                    <Text style={{ color: "black", fontSize: 26,fontWeight:480}}>₹ {stockPrice}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        {
                            stockPrice && stockOpen && (
                                stockPrice > stockOpen ? (
                                    <Text style={{ color: "green",fontSize:15 }}> + {(stockPrice - stockOpen).toFixed(2)}</Text>
                                ) : (
                                    <Text style={{ color: "red" ,fontSize:15}}> - {(stockOpen - stockPrice).toFixed(2)}</Text>
                                )
                            )
                        }
                        <Text style={{ color: stockPrice > stockOpen ? "green" : "red",marginHorizontal:10,fontSize:15 }}>({percentChange.toFixed(2)}%)</Text>
                    </View>
                    {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                        <Text style={{ color: "black",fontSize:16,fontWeight:'350'}}>Today's High : {stockPricehigh}</Text>
                    <Text style={{ color: "black",fontSize:16,fontWeight:'350'}}>Today's Low : {stockPricelow}</Text>
                    </View>
                    <Text style={{ color: "black",fontSize:16,fontWeight:'350'}}>Open : {stockOpen}</Text>
                 */}


            </View>
            <View style={{ height: '30%', width: '100%', marginTop:10 }}>
                <PriceChart name={name} />
            </View>

            {/* </ScrollView> */}
            <BottomDetails name={name} />
            <View style={styles.container}>
                <View style={{width:'45%' }}>
                    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "red", height: 40, justifyContent: "center", alignItems: "center" }}
                    //  onPress={ navigation.navigate("SellStock", { name:name })}
                    onPress={()=>handleSellPress()}
                    >
                        <Text style={{ textAlign: "center",color:'#fff',fontSize:20,fontWeight:'350' }}>SELL</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "45%" }}>
                    <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green", height: 40, justifyContent: "center", alignItems: "center" }}
                    // onPress={ navigation.navigate("BuyStock", { name:name })}
                    onPress={()=>handleBuyPress()}
                    >
                        <Text style={{ textAlign: "center",color:'#fff',fontSize:20,fontWeight:'350'  }}>BUY</Text>
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
        backgroundColor:'#ffff',
        bottom: 10,
        justifyContent:'space-between',
        width:'105%',
        paddingHorizontal:10,
        marginBottom: 10
    },
    nameText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
      },
      DefaultText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
      },
})