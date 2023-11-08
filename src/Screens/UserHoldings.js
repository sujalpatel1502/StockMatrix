import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserHoldings = () => {
  const roomCollection =  firestore().collection('Users').doc(auth().currentUser.uid)
  const navigation = useNavigation()
  const id=auth().currentUser.uid;

  const [holdings, setHoldings] = useState()
useEffect(() => {
  roomCollection.get().then((doc)=>{
    setHoldings(Object.keys(doc.data().holdings))
  })

  
}, [])

console.log(holdings);

  return (
    <View style={{ backgroundColor: '#fff',flex:1,paddingVertical:20 }}>
        {
            holdings?.map((stock)=>{
                return(
                    <View style={{borderRadius:10,flexDirection:'row',justifyContent:'space-between',borderBottomWidth:2,height:70,alignItems:'center',paddingHorizontal:20}}>
                        <Text style={{fontSize:20,fontWeight:'600',color:'#000'}}>{stock}</Text>
                        <TouchableOpacity
                        style={{borderWidth:1,backgroundColor:'green',height:30,justifyContent:'center',alignItems:'center',borderRadius:10,width:80}}
                        onPress={()=>{
                            console.log("--------------");
                            navigation.navigate("PLreport", { name: stock })       
                        }}>
                            <Text style={{fontWeight:'600',color:'#fff'}}>view details</Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        }
     
    </View>
  )
}

export default UserHoldings

const styles = StyleSheet.create({})