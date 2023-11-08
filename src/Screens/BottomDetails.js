// import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Dimensions,Linking } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'react-native-axios';
import ExploreData from './ExploreData';
import News from './News';
import  cheerio  from 'cheerio';
const BottomDetails = (props) => {
    const name = props.name
    // const { name } = props.route.params;
    const [stockPrice, setStockPrice] = useState(null);
    const [stockPricehigh, setStockPricehigh] = useState(null);
    const [stockPricelow, setStockPricelow] = useState(null);
    const [stockOpen, setstockOpen] = useState(null)
    const [Description, setDescription] = useState(null)
    const [predictedPrice, setPredictedPrice] = useState(null);
    
    const[news,setnews]=useState([])
    const fetchData1 = async () => {
        try {
          const response = await axios.post('https://7fbb-2409-40c1-102d-a55c-7c9a-6889-6b12-4d65.ngrok-free.app/predict', {
            interval: '4hour',
            symbol: `${name}`,
          }).then((re) => {
            setPredictedPrice(re.data.predicted_price.toFixed(2));
          }).catch((re) => {
            console.log(re);
          })
    
          // Assuming your API returns a response like {"predicted_price": 123.45}
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchdata()
        fetchData1()
        fetchdata2()
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

    const options1 = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/TCS',
        headers: {
          'X-RapidAPI-Key': '0a39a33e88mshbe1c3b7bc670883p1b90d6jsnf672fff4c0f2',
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      };

      const fetchdata2=async()=>{
        try {
            const response = await axios.request(options1);
            console.log("newssssssssssssssssssssssssss",response.data.body);
            setnews(response.data.body)
        } catch (error) {
            console.error(error);
        }
      }


    const fetchdata = async () => {
        try {
            const response = await axios.request(options);

            const result = response.data.chart.result[0];

            console.log(result)

            // console.log(result)

            // var price = result.price.regularMarketPrice.raw;
            setStockPrice(result.meta.regularMarketPrice)
            var stp = stockPrice
            // var pricehigh = result.price.regularMarketDayHigh.raw;
            setStockPricehigh(result.indicators.quote[0].high[0].toFixed(2))
            var stph = stockPricehigh
            // var pricelow = result.price.regularMarketDayLow.raw;
            setStockPricelow(result.indicators.quote[0].low[0].toFixed(2))
            var stpl = stockPricelow
            setstockOpen(result.indicators.quote[0].high[0].toFixed(2))
            var stpo = stockOpen
            console.log("======>", stockPrice);
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
                        backgroundColor:'#ffff'
                    }}
                >
                    <Text>{Description}</Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between",marginVertical:10 }}>

                        <Text style={{ color: "black", fontSize: 15, fontWeight: '400' }}>Today's High : {stockPricehigh}</Text>
                        <Text style={{ color: "black", fontSize: 15, fontWeight: '400' }}>Today's Low : {stockPricelow}</Text>

                    </View>

                    <View style={{
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        marginVertical: 10,
                        shadowColor: '#000',
                        shadowOpacity:1,
                        shadowRadius: 30,
                        elevation: 5,
                        backgroundColor: '#fff',
                    }}>
                        <Text style={{
                            fontSize: 24,
                            color:'#000',
                            // textShadowColor: 'red',
                            textShadowOffset: { width: 0, height: 0 },
                            textShadowRadius: 10,
                        }}>PREDICTED PRICE {predictedPrice}</Text>
                    </View>


                </View>
            </ScrollView>
        );
    };
    const News = () => {
        const removeHtmlTags = (html) => {
            const $ = cheerio.load(html);
            return $.text();
          };
          const handleLinkPress = (link) => {
            Linking.openURL(link);
          };
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        // flexWrap: 'wrap',
                        //  flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    {/* <News /> */}
                    {/* {
                        news.map((item)=>{
                            return(
                               <Text>{item.description}</Text> 
                            )
                        })
                    } */}
                    {news.map((item, index) => (
            
            <View  key={index} style={{borderRadius:1,borderBottomWidth:2,borderColor:'#D3D3D3',backgroundColor:'#fff',height:70,justifyContent:'center'}}>

                <TouchableOpacity onPress={()=>handleLinkPress(item.link)}>
              <Text style={{fontWeight:'bold',color:'#000',marginVertical:2}}>{item.title}</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
                <Text>Link: {item.link}</Text>
              </TouchableOpacity> */}
              <Text>{item.pubDate}</Text>
            </View>
          ))}
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
    console.log("ogggggggggnewssssssssss",news);

    return (
        <Tab.Navigator
            screenOptions={() => ({
                tabBarIndicatorStyle: {
                    backgroundColor: '#000'
                },
                tabBarItemStyle: { borderWidth: 1, borderRadius: 10, margin: 10, borderColor: '#000' },
                tabBarStyle: {
                    width: '100%',
                    // height:'90%',
                    backgroundColor: '#fff'
                },
                tabBarScrollEnabled: true,
                // tabBarIndicator:false
            })}
        >
            <Tab.Screen name="Overview" component={Overview}
            options={{
                tabBarLabel: 'Overview',
                tabBarLabelStyle: {
                  fontSize: 16,
                },
               }} />
            <Tab.Screen name="News" component={News} />
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