import { StyleSheet, Text, View,TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const SellStock = (props) => {
  const roomCollection =  firestore().collection('Users').doc(auth().currentUser.uid)
    
  const navigation = useNavigation();
  const [blank, setBlank] = useState('')
  const[qty,setQty]=useState(0);
    const { name, stockPrice, qnty, avgPrice } = props.route.params;
    // console.log(nam);
    const[Buyq,setBuyq]=useState(0);
    const sendRequest=()=>{
        console.log("hiii");
    }

    const sell = () =>{
      if(qty <= qnty){
        console.log("good");
        
          roomCollection.get().then((doc)=>{
            const holding = doc.data().holdings 
            const bal = doc.data().balance
            if(qty < qnty){
              roomCollection.update({holdings: {...holding, [`${name}`]:{name: name, price: avgPrice, quantity: qnty-qty}}, balance:parseInt(bal)+parseInt(qty*stockPrice)})
            }
            else if(qty == qnty){
              delete holding[name]
              console.log(holding);
              roomCollection.update({holdings: {...holding}, balance:parseInt(bal)+parseInt(qty*stockPrice)})

            }
          })
        navigation.navigate('HomePage')
      }
      else{
        Alert.alert(`Please enter valid quntity, You have ${qnty} stocks only.`)
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
        <Text style={{fontSize: 20, marginLeft: 15}}>{name}</Text>
        <Text style={{marginLeft: 15}}>{stockPrice}</Text>
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
    
    <View style={{height:'60%',justifyContent:'center',alignItems:'center'}}/>
      <View style={{borderBottomWidth:1}}/>
      <View  style={{height:'15%',justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity style={{height:50,backgroundColor:'red',width:300,borderRadius:10,justifyContent:'center',alignItems:'center'}} onPress={()=>sell()}>
        <Text style={{textAlign:'center'}}>SELL</Text>
      </TouchableOpacity>
      </View>
      </View>
  )
}

export default SellStock

const styles = StyleSheet.create({})