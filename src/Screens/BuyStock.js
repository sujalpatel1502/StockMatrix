import {StyleSheet, Text, View,TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue,set,push } from "@react-native-firebase/database";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const BuyStock = props => {
  const db = getDatabase();
  const navigation = useNavigation();
  const [blank, setBlank] = useState('')
  const[qty,setQty]=useState(1)
  const[stockNames,setStockNames]=useState([]);
  const[stockQty,setstockQty]=useState([]);
  const [stockData, setStockData] = useState({});
  const {nam, price} = props.route.params;
  console.log(nam);
  const [Buyq, setBuyq] = useState(0);
  const sendRequest = () => {
    console.log('hiii');
  };
  
  // const roomCollection = firestore().collection('Users').doc(auth().currentUser.uid);
  const roomCollection =  firestore().collection('Users').doc(auth().currentUser.uid)
      


  console.log("userrrrrrrrr",auth().currentUser.uid);
  const id=auth().currentUser.uid;
  const stockRef = ref(db, `stocks/${id}`);
  useEffect(() => {
    const unsubscribe = onValue(stockRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Extract names from the data, filtering out undefined entries
        const stockNames = Object.values(data)
          .filter(stock => stock && stock.name)
          .map(stock => stock.name);
        
        // Log the stock names
        console.log("Stock Names:", stockNames);
       

      }
    });
  
    // Return a cleanup function to stop listening when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(()=>{
    const starCountRef = ref(db, 'stocks/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("ad",data);
      // updateStarCount(postElement, data);
    });
  },[])

  function writeUserData() {
    // const db = getDatabase();
    // const stockRef = ref(db, `stocks/${id}`);

    // // Generate a new unique key for the entry
    // // const newStockRef = push(stockRef);
    // const newStockRef = push(stockRef);


    // // Set the data at the unique key
    // const price=1000;
    // set(newStockRef, {
    //   name: nam,
    //   qty: qty,
    //   price:price,
    // });
roomCollection.get().then((doc)=>{
  console.log("inside buy:::::", doc.data(), Object.keys(doc.data().holdings).length == 0);
  let data = doc.data()
  let bal=data.balance;
  if(bal>=qty*price){
    if(Object.keys(data.holdings).length == 0){
      console.log("ifff", nam, price, qty);
        roomCollection.update({holdings: { [`${nam}`]: {name: nam, price: price, quantity: qty}}, balance:parseInt(bal)-parseInt(price*qty)})
        }
      else{
        if(data.holdings[nam] != undefined){
          console.log("=====================>",data.holdings[nam]);
          const holding_quantity = data.holdings[nam].quantity
          const holding_price = data.holdings[nam].price 
          const new_quantity = qty
          const avg_price = ((holding_price*holding_quantity) + (price*new_quantity))/(holding_quantity+new_quantity)
    
          roomCollection.update({holdings: {...data.holdings, [`${nam}`]: {name: nam, price: avg_price, quantity: holding_quantity+new_quantity}}, balance:parseInt(bal)-parseInt(price*qty)})
        }
        else{
          roomCollection.update({holdings: {...data.holdings, [`${nam}`]: {name: nam, price: price, quantity: qty}}, balance:parseInt(bal)-parseInt(price*qty)})
        }
      }
      setTimeout(()=>{
        navigation.navigate('HomePage')
      }, 1000)
  }
  else{
    Alert.alert("not enough funds");
    
  }

 
})

// if(data.holdings!=null && data.holdings[nam]==0){}

  }
  function sellStock() {
    // Check if the stock with the given name (nam) exists in the stockData
    if (stockData && stockData[nam]) {
      const { qty, price } = stockData[nam];
      console.log(`Selling ${nam}, Qty: ${qty}, Price: ${price}`);
      // Add your logic for selling the stock here
    } else {
      console.log(`Stock ${nam} not found in your portfolio.`);
    }
  }
  
  return (
    <View>
      <View style={{flexDirection: 'row', margin: 15}}>
        <View>
          <FontAwesome name="arrow-left" size={25} color="black"  onPress={() => {
        navigation.goBack();
      }}/>
        </View>
        <View>
          <Text style={{fontSize: 20, marginLeft: 15}}>{nam}</Text>
          <Text style={{marginLeft: 15}}>{price}</Text>
        </View>
      </View>

      <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',marginHorizontal:10,marginVertical:10}}>
        <Text style={{fontSize:18,color:'#000'}}>Qty</Text>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        
        <TouchableOpacity onPress={()=>setQty(qty+1)}><Text  style={{fontSize:25,color:'#000'}}>+</Text></TouchableOpacity>
        <View style={{borderWidth:1,width:100,height:40,borderRadius:5,margin:10}}>
        <TextInput
  onChangeText={(val) => val ? setQty(parseInt(val)) : setQty(0)}
  value={qty.toString()} // Convert it to a string when displaying it in the TextInput
  keyboardType="numeric" 
/>
        </View>
        <TouchableOpacity><Text  style={{fontSize:25,color:'#000'}}>-</Text></TouchableOpacity>

        </View>

      </View>
      <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',marginHorizontal:10}}>
        <Text style={{fontSize:18,color:'#000'}}>Price</Text>
    
        <View style={{borderWidth:1,width:100,height:40,borderRadius:5,marginRight:20, alignItems:'center', justifyContent:'center'}}>
        {/* <TextInput
          // placeholder="Enter your Email"
          onChangeText={val => setBlank(val)}
          value={blank}
        /> */}
        <Text>At Market</Text>
      
        </View>

      </View>

    

      {/* <TouchableOpacity
        style={{justifyContent: 'center', alignSelf: 'center'}}
        onPress={() => setBuyq(Buyq + 1)}>
        <Text>+</Text>
      </TouchableOpacity>
      <Text style={{alignSelf: 'center'}}>{Buyq}</Text>
      <TouchableOpacity
        style={{justifyContent: 'center', alignSelf: 'center'}}
        onPress={() => (Buyq > 0 ? setBuyq(Buyq - 1) : null)}>
        <Text>-</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{justifyContent: 'center', alignSelf: 'center'}}
        onPress={() => sendRequest()}>
        <Text>Buy</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={sellStock}>
      <Text>
        selll
      </Text>
      </TouchableOpacity>
      
      
      <View style={{height:'60%',justifyContent:'center',alignItems:'center'}}/>
      <View style={{borderBottomWidth:1}}/>
      <View  style={{height:'15%',justifyContent:'center',alignItems:'center', bottom: 10}}>
      <TouchableOpacity onPress ={()=>{writeUserData()}}style={{height:50,backgroundColor:'green',width:'90%',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
        <Text style={{textAlign:'center'}}>BUY</Text>
      </TouchableOpacity>
      </View>
      
      </View>
  );
};

export default BuyStock;

const styles = StyleSheet.create({});

// u0X53kWjiAXSM0fT13htKtksBvl1
// -Ngm2u7LW4eQXsicdCf7
// name
// :
// "ACC.NS"
// qty
// :
// 4
// -Ngm325HrzcjOhkfgEzh
// name
// :
// "HCLTECH.NS"
// qty
// :
// 1
// -Ngm4vJrWuno1Zs9mapq
// name
// :
// "TCS.NS"
// qty
// :
// 5

