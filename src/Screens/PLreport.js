import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'react-native-axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PLreport = ({ route }) => {
  const roomCollection = firestore().collection('Users').doc(auth().currentUser.uid)
  const { name } = route.params

  const [stockPrice, setStockPrice] = useState(0)
  const [avgPrice, setAvgPrice] = useState(0)
  const [qty, setQty] = useState(0)


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
  const navigation = useNavigation()
  const sellStock = () => {
    navigation.navigate('SellStock', { name: name, stockPrice: stockPrice, qnty: qty, avgPrice : avgPrice,  })
  }



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
      // console.log("respnse",response.data.chart.result[0].indicators.quote[0].high);
      // data[0]?.meta?.regularMarketPrice

      const result = response.data.chart.result[0];

      console.log(result)

      setStockPrice(result.meta.regularMarketPrice)
      // setStockPrice(1600)


    } catch (error) {
      console.error(error);
    }
    roomCollection.get().then((doc) => {
      console.log(doc.data().price);
      setAvgPrice(doc.data().holdings[name].price)
      setQty(doc.data().holdings[name].quantity)
    })
  }

  return (
  
    <View style={styles.container}>
      <AntDesign name={'arrowleft'} size={30} color={'#000'} onPress={() => {
            navigation.goBack();}} />
      <View style={styles.containerContent}>
    <Text style={styles.nameText}>{name}</Text>
      </View>
    <View style={styles.stockInfoContainer}>
      <Text style={styles.stockPriceText}>CMP: {stockPrice}</Text>
      <View style={styles.stockChangeContainer}>
        <Text style={styles.stockChangePercentageText}>1.5% </Text>
        <View style={styles.arrowIcon}>
          <AntDesign name={'arrowup'} size={20} color={'green'} />
          <AntDesign name={'arrowdown'} size={20} color={'red'} />
        </View>
      </View>
    </View>
   <View style={styles.InnerContainer}>
    <View style={styles.avgPriceContainer}>
      <Text style={styles.avgPriceText}>YOUR AVG. PRICE : {avgPrice}</Text>
    </View>
    <View style={styles.qtyContainer}>
      <Text style={styles.qtyText}>QUANTITY : {qty}</Text>
    </View>
    </View>
   <View style={styles.InnerContainer}>
    <View style={styles.investmentContainer}>
      <Text style={styles.investmentText}>TOTAL INVESTMENT: {avgPrice * qty}</Text>
    </View>
    <View style={styles.returnContainer}>
      <Text style={styles.returnText}>TOTAL RETURN: {stockPrice * qty}</Text>
    </View>
    </View>
   <View style={styles.InnerContainer}>
    <View style={styles.profitContainer}>
      <Text style={styles.profitText}>Profit: {(stockPrice - avgPrice) * 20} INR</Text>
    </View>
    <View style={styles.netProfitContainer}>
      <Text style={styles.netProfitText}>Net Profit: {(100 * (stockPrice - avgPrice)) / avgPrice}</Text>
    </View>
    </View>
    <View style={styles.sellButtonContainer}>
      <TouchableOpacity onPress={sellStock} style={styles.sellButton}>
        <Text style={styles.sellButtonText}>SELL</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default PLreport

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '10%',
    paddingVertical: '10%',
  },
  containerContent:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'60%',
  },
  nameText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
  },
  stockInfoContainer: {
    borderRadius: 10,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    height: 70,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  stockPriceText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  stockChangeContainer: {
    flexDirection: 'row',
  },
  stockChangePercentageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  arrowIcon: {
    flexDirection: 'row',
  },
  avgPriceContainer: {
    borderWidth: 2,
    width: '45%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InnerContainer:{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avgPriceText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  qtyContainer: {
    borderWidth: 2,
    width: '45%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  investmentContainer: {
    borderWidth: 2,
    width: '45%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  investmentText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  returnContainer: {
    borderWidth: 2,
    width: '45%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  profitContainer: {
    borderWidth: 2,
    width: '45%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  netProfitContainer: {
    borderWidth: 2,
    width: '45%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  netProfitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  sellButtonContainer: {
    justifyContent: 'flex-end',
    marginVertical:5
  },
  sellButton: {
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    height: 70,
    alignItems: 'center',
  },
  sellButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});
