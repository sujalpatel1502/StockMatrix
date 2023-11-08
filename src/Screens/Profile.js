import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = ({navigation}) => {
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [balance, setBalance] = useState(0)
    const [ name, setName] = useState('')
  const roomCollection =  firestore().collection('Users').doc(auth().currentUser.uid)

    const fetchData = async () => {
        try {
          const response = await axios.post('https://7fbb-2409-40c1-102d-a55c-7c9a-6889-6b12-4d65.ngrok-free.app/predict', {
            interval: '4hour',
            symbol: 'IOB.NS',
          }).then((re) => {
            setPredictedPrice(re.data.predicted_price);
          }).catch((re) => {
            console.log(re);
          })
    
          // Assuming your API returns a response like {"predicted_price": 123.45}
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
        roomCollection.get().then((doc)=>{
            setBalance(doc.data().balance)
            setName(doc.data().name)
        })
      }, []);
    return (
        <View style={{paddingHorizontal:'5%',paddingVertical:'5%'}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AntDesign name={'arrowleft'} size={30} color={'#000'} onPress={() => {
            navigation.goBack();}} />
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign name="setting" size={25} color="black" style={{ margin: 5 }} />
                    <FontAwesome name="bell" size={25} color="black" style={{ margin: 5 }} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical:10,paddingHorizontal:10}}>
                <FontAwesome name="user" size={30} color="black"  />
                <Text style={{ fontSize: 25,fontWeight:'350',color:'#000' }}>{name}</Text>
                {/* <Text style={{ fontWeight:'350',color:'#000' }}>Predicted Price: {predictedPrice}</Text> */}
                <AntDesign name="right" size={20} color="black" style={{margin: 5}} />
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',marginVertical:10 }}>
                    <FontAwesome name="gift" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20,fontSize: 18,fontWeight:'350',color:'#000' }}>Refer</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical:10}} onPress={()=>navigation.navigate('Wallet')}>
                    <AntDesign name="wallet" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 ,fontSize: 18,fontWeight:'350',color:'#000' }}>₹{balance}</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical:10 }}>
                    <FontAwesome name="sticky-note" size={30} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20,fontSize: 18,fontWeight:'350',color:'#000'  }}>All Orders</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',marginVertical:10 }}>
                    <FontAwesome name="bank" size={25} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 ,fontSize: 18,fontWeight:'350',color:'#000' }}>Bank details</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical:10 }}>
                    <MaterialIcons name="support-agent" size={28} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 ,fontSize: 18,fontWeight:'350',color:'#000' }}>Customer support</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',marginVertical:10}}>
                    <MaterialIcons name="report" size={25} color="black" style={{ margin: 5 }} />
                    <Text style={{ marginLeft: 20 ,fontSize: 18,fontWeight:'350',color:'#000' }}>Reports</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Profile
const styles = StyleSheet.create({})