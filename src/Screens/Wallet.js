import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue,set,push } from "@react-native-firebase/database";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Wallet = () => {
  const navigation = useNavigation();
  const [blank, setBlank] = useState('');
  const [showTextInput, setShowTextInput] = useState(false); // State to control TextInput visibility
  const [balance, setBalance] = useState(0)
  const roomCollection =  firestore().collection('Users').doc(auth().currentUser.uid)
      
  useEffect(()=>{
    roomCollection.get().then((doc)=>{
      setBalance(doc.data().balance)
    })
  }, [])

  return (
    // <KeyboardAvoidingView>
    // <ScrollView>
    <View>
      <View style={{ margin: 20 }}>
        <FontAwesome
          name="arrow-left"
          size={25}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontSize: 20, marginLeft: 15 }}>Balance Available</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 20 }}>
          {balance}
        </Text>
      </View>
      {/* <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>{blank}</Text>
      </View> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        {!showTextInput ? ( // Conditionally render the TextInput
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: 'green',
              width: '90%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              console.log("Button pressed");
              setShowTextInput(true); // Show the TextInput
            }}
          >
            <Text style={{ textAlign: 'center',color:'#fff' }}>ADD MONEY</Text>
          </TouchableOpacity>
        ) : (
            
          <TextInput
            style={{
              height: 50,
              
              width: '90%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            placeholder="Enter amount"
            onChangeText={(val) => setBlank(val)}
            keyboardType="numeric"
          />
          
        )}
      </View>
      {showTextInput && <View style={{justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: 'green',
              width: '80%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              console.log("Button pressed");
              roomCollection.update({balance: parseInt(balance)+parseInt(blank)})
              setBalance(parseInt(balance)+parseInt(blank))
              setShowTextInput(false); // Show the TextInput
            }}
          >
            <Text style={{ textAlign: 'center',color:'#fff' }}>ADD</Text>
          </TouchableOpacity>
          </View>}
    </View>
    // </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Wallet;
