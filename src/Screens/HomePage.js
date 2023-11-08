import { StyleSheet, Text, TextInput, View, Image, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomTabView from './BottomGrow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignUp from '../Authentication/SignUp';

const Indices = [
    {
        id: 1,
        name: "NIFTY 50",
        num: 18900
    },
    {
        id: 2,
        name: "BANK NIFTY",
        num: 44300
    },
    {
        id: 3,
        name: "FINNIFTY",
        num: 19800
    },
    {
        id: 4,
        name: "SENSEX",
        num: 63900
    },
]

const HomePage = ({ navigation }) => {
    const [user, setUser] = useState(true)

useEffect(()=>{
    // auth().signOut()
    firestore().collection('Users').doc(auth().currentUser.uid).get().then((doc)=>{
        console.log("data--->", doc);
        if(doc._data == undefined){
            setUser(false)
        }
        else{
            setUser(true)
        }
    })
}, [])

    return (
        user?
        <>
            <View style={{ backgroundColor: '#fff',paddingHorizontal:10}}>
                <View style={{ borderRadius: 30, borderWidth: 1, margin: 10, padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image
                        source={require('../../assets/Mat.png')}
                        style={{ width: 30, height: 30, marginLeft: 5 }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="search" size={24} style={{ margin: 10 }} color="black" />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchContent')}
                        >
                            <Text style={{ color: "#000",fontSize:18,fontWeight:'600' }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Icon name="user" size={24} color="black" style={{ margin: 5 }} />
                    </TouchableOpacity>
                </View>
                {/* <BottomTabView/> */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={Indices}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ height: 65, borderWidth: 1, borderRadius: 10, width: 150, margin: 10, justifyContent: 'center', alignItems: 'center', borderColor: '#000' }}>
                                <Text style={{ textAlign: 'center', fontSize: 20, color: "black" }}>{item.name}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 20, color: "black" }}>{item.num}</Text>
                            </View>
                        )
                    }}
                />
            </View>
            <BottomTabView />
        </>
        :
        <SignUp/>
    )
}
export default HomePage
const styles = StyleSheet.create({})