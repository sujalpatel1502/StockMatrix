// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// import auth from '@react-native-firebase/auth';
// const OtpAuth = () => {
//     const SendData=()=>{
//         auth()
//   .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
//   .then(() => {
//     console.log('User account created & signed in!');
//   })
//   .catch(error => {
//     if (error.code === 'auth/email-already-in-use') {
//       console.log('That email address is already in use!');
//     }

//     if (error.code === 'auth/invalid-email') {
//       console.log('That email address is invalid!');
//     }

//     console.error(error);
//   });
//     }
//   return (
//     <View>
//       <Text>OtpAuth</Text>
//      <TouchableOpacity onPress={()=>SendData()}>
//         <Text>
//             get
//         </Text>
//         </TouchableOpacity>

//     </View>
//   )
// }

// export default OtpAuth

// const styles = StyleSheet.create({})

import { Alert, Button, Dimensions, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import { useEffect } from 'react';
// import Orientation from 'react-native-orientation';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OtpAuth = ({ navigation }) => {
    // useEffect(()=>{
    //     Orientation.lockToPortrait
    // }, [])
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const signInWithPhoneNumber = async () => {
        console.log("-----------");
        try {
            const formattedPhoneNumber = "+91" + phoneNumber;
            console.log("before");
            const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
            console.log("after");
            setVerificationId(confirmation.verificationId);
            Alert.alert('Verification code has been sent to your phone.');

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to send verification code.');
        }
    };

    const confirmCode = async () => {

        try {
            const credential = auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await auth().signInWithCredential(credential);
            Alert.alert('Success', 'You have been successfully authenticated.');
            // firestore()
            //     .collection('Users')
            //     .doc(auth().currentUser.uid)
            //     .set({ phonenumber: phoneNumber, pid: auth().currentUser.uid })
            // Perform navigation or other actions upon successful authentication
            // const navigation = useNavigation();
            // navigation.navigate('SignUp');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Invalid verification code.');
        }
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#1167b1', '#187bcd', '#2a9df4', '#d0efff']}

                    style={styles.linearGradient}>
                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <Image
                        source={require('../../assets/Mat.png')}
                        style={{ width:100,height:100,marginVertical:40}}
                    />
                        <View style={{ borderRadius: 10, flexDirection: 'row', width: '60%', backgroundColor: '#d0efff',marginVertical:10}}>
                            <View style={{ width: 50, justifyContent: 'center', backgroundColor: '#2a9df4', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                <Text style={{ fontWeight: 'bold',fontSize:16,color:'#000000' }}
>+91</Text></View>
                            <TextInput
                                placeholder="Enter Your Phone Number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                style={{ fontWeight: 'bold',fontSize:16,color:'#000000' }}

                            />
                        </View>
                            <TouchableOpacity
                            style={{ borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '60%', backgroundColor: '#d0efff' }}
                                onPress={signInWithPhoneNumber}
                            >
                                <Text style={{ fontWeight: 'bold',fontSize:16,color:'#000000' }}>Send OTP</Text>
                            </TouchableOpacity>
                        <View style={{ borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '60%', backgroundColor: '#d0efff' }}>
                            <TextInput
                                placeholder="Enter Code"
                                value={verificationCode}
                                onChangeText={setVerificationCode}
                                style={{ fontWeight: 'bold',fontSize:16,color:'#000000' }}
                            />
                        </View>
                        <TouchableOpacity
                        style={{ borderRadius: 10, height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '60%', backgroundColor: '#d0efff' }}
                                onPress={confirmCode}
                            >
                                <Text style={{ fontWeight: 'bold',fontSize:16,color:'#000000' }}>Authenticate</Text>
                            </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default OtpAuth

const styles = StyleSheet.create({
    img: {
        resizeMode: 'contain',
        height: windowHeight / 2,
        width: windowWidth,
    },
    img1: {

        resizeMode: 'contain',
        height: windowHeight / 10,
        width: windowWidth,
    },
    linearGradient: {
        width: windowWidth,
        height: windowHeight
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    otpInput: {
        marginTop: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: 200,
        height: 40,
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 5,
    },
})

























