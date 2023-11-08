import { Button, Dimensions, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
// import { DatePicker } from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({ onPress }) => {
    // useEffect(()=>{
    //   Orientation.lockToPortrait
    // }, [])
    const navigation = useNavigation();
    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatToDDMMYYYY = (date) => {
        // Format date as DD/MM/YYYY
        if (date && date.length >= 8) {
            const year = date.slice(0, 4);
            const month = date.slice(4, 6);
            const day = date.slice(6, 8);
            return `${day}/${month}/${year}`;
        }
        return date;
    };


    const handleSignUp = () => {
        if (name !== '') {
            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .set({ phonenumber: auth().currentUser.phoneNumber, pid: auth().currentUser.uid, name: name,holdings:{},balance:0 })
                // .then(() => { onPress() })
                .then(() => navigation.navigate("HomePage"))
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
                            style={{ width: 100, height: 100, marginVertical: 40 }}
                        />
                        {/* <View style={styles.TextButton}
                        >
                            <FontAwesome name="user" size={20} color="black" />
                            <TextInput
                                placeholder='Enter your name'
                                onChangeText={(val) => setname(val)}
                                value={name}
                                style={{ fontWeight: 'bold',fontSize:16,color:'#000000' }}
                            />
                        </View> */}

                        <View style={styles.InputContainer}>
                            <View style={styles.IconContainer}>
                                <FontAwesome name="user" size={20} color="#d0efff" />
                            </View>
                            <TextInput
                                placeholder='Enter your name'
                                onChangeText={(val) => setname(val)}
                                value={name}
                                style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}
                            />
                        </View>


                        <View style={styles.TextButton}>

                            <Entypo name="mail" size={20} color="black" />
                            <TextInput
                                placeholder='Enter your Email'
                                onChangeText={(val) => setEmail(val)}
                                value={email}
                                style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}

                            />
                        </View>


                        <View style={styles.TextButton}>

                            <AntDesign name="calendar" size={20} color="black" />
                            <TextInput
                                placeholder='DD/MM/YYYY'
                                onChangeText={(val) => setDateOfBirth(val)}
                                // value={formatToDDMMYYYY(dateOfBirth)}/
                                value={dateOfBirth}
                                style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}
                            />
                        </View>



                        <TouchableOpacity onPress={() => handleSignUp()}
                            style={{ borderRadius: 10, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, paddingHorizontal: 20, width: '70%', backgroundColor: '#d0efff' }}
                        >

                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#000000' }}
                            >Sign Up</Text>
                        </TouchableOpacity>

                    </View>
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    InputFieldsContainer: {
        width: '100%',
        marginTop: 35,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
    InputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        height: 45,
        backgroundColor: '#d0efff',
        width: '80%',
        borderRadius: 7,
        overflow: 'hidden'
    },
    IconContainer: {
        height: '100%',
        aspectRatio: 1 / 1,
        backgroundColor: '#1167b1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        resizeMode: 'contain',
        height: windowHeight / 2,
        width: windowWidth,
    },
    img1: {
        resizeMode: 'contain',
        height: windowHeight / 9,
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
    TextButton: { borderRadius: 10, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, paddingHorizontal: 20, width: '70%', backgroundColor: '#d0efff' }
})
